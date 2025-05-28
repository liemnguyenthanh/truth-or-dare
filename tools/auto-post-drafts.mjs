#!/usr/bin/env node

import { GraphQLClient } from 'graphql-request';
import fs from 'fs';
import path from 'path';

// Hashnode configuration
const HASHNODE_HOST = 'truth-or-dare-game.hashnode.dev';
const HASHNODE_TOKEN = process.env.NEXT_PUBLIC_HASHNODE_TOKEN

const client = new GraphQLClient('https://gql.hashnode.com', {
  headers: {
    Authorization: HASHNODE_TOKEN,
  },
});

// GraphQL queries
const GET_PUBLICATION = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
    }
  }
`;

const PUBLISH_POST = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        id
        title
        slug
        url
        publishedAt
        tags {
          name
        }
      }
    }
  }
`;

// Scan content-drafts folder for all .md files
function scanDraftsFolder() {
  const draftsPath = 'content-drafts';
  
  if (!fs.existsSync(draftsPath)) {
    console.log(`❌ Folder ${draftsPath} không tồn tại!`);
    return [];
  }

  const files = fs.readdirSync(draftsPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(draftsPath, file));

  console.log(`📁 Tìm thấy ${files.length} file markdown trong content-drafts:`);
  files.forEach(file => console.log(`   📄 ${file}`));
  
  return files;
}

// Extract title from markdown content
function extractTitleFromMarkdown(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  return 'Untitled Article';
}

// Extract tags from content (look for keywords or use default)
function extractTagsFromContent(content, filename) {
  // Try to find tags in content
  const tagMatches = content.match(/\*\*Từ khóa[^:]*:\*\*\s*([^\n]+)/i);
  if (tagMatches) {
    const tags = tagMatches[1]
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => {
        // Clean up tag: remove special characters, limit length
        return tag
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
          .replace(/\s+/g, '-')     // Replace spaces with hyphens
          .substring(0, 30)         // Limit to 30 characters
          .replace(/-+$/, '');      // Remove trailing hyphens
      })
      .filter(tag => tag.length > 2) // Only keep tags with at least 3 characters
      .slice(0, 5); // Limit to 5 tags max
    
    if (tags.length > 0) {
      return tags;
    }
  }

  // Generate tags from filename
  const baseName = path.basename(filename, '.md');
  const defaultTags = ['blog', 'vietnamese-content'];
  
  if (baseName.includes('tet')) defaultTags.push('tet', 'traditional-games');
  if (baseName.includes('game')) defaultTags.push('games', 'entertainment');
  if (baseName.includes('party')) defaultTags.push('party', 'social-activities');
  if (baseName.includes('truth') || baseName.includes('dare')) defaultTags.push('truth-or-dare', 'party-games');
  if (baseName.includes('18')) defaultTags.push('adult-games');
  
  return defaultTags.slice(0, 5); // Limit to 5 tags
}

// Generate subtitle from content
function generateSubtitle(content) {
  const lines = content.split('\n');
  
  // Look for first paragraph after title
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    
    if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
      return line.trim().substring(0, 150) + (line.length > 150 ? '...' : '');
    }
  }
  
  return 'Bài viết thú vị và bổ ích cho bạn đọc';
}

// Read and process markdown file
function processMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const title = extractTitleFromMarkdown(content);
    const subtitle = generateSubtitle(content);
    const tags = extractTagsFromContent(content, filePath);
    
    return {
      file: filePath,
      title,
      subtitle,
      tags,
      content
    };
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Get publication ID
async function getPublicationId() {
  try {
    const data = await client.request(GET_PUBLICATION, { host: HASHNODE_HOST });
    return data.publication.id;
  } catch (error) {
    console.error('❌ Error getting publication:', error.message);
    return null;
  }
}

// Publish a single article
async function publishArticle(article, publicationId) {
  console.log(`\n📝 Publishing: ${article.title}`);
  console.log(`   📄 File: ${article.file}`);
  console.log(`   🏷️  Tags: ${article.tags.join(', ')}`);

  try {
    const input = {
      title: article.title,
      subtitle: article.subtitle,
      contentMarkdown: article.content,
      tags: article.tags.map(tag => ({ slug: tag, name: tag })),
      publicationId: publicationId
    };

    const result = await client.request(PUBLISH_POST, { input });
    
    if (result.publishPost.post) {
      const post = result.publishPost.post;
      console.log(`✅ Published successfully!`);
      console.log(`   🔗 URL: ${post.url}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error publishing "${article.title}":`, error.message);
    return false;
  }
  
  return false;
}

// Main function - auto post all drafts
async function autoPostDrafts() {
  console.log('🚀 Auto-posting all markdown files from content-drafts folder...\n');
  
  // Scan for markdown files
  const markdownFiles = scanDraftsFolder();
  
  if (markdownFiles.length === 0) {
    console.log('📭 Không có file markdown nào trong content-drafts folder.');
    return;
  }

  // Get publication ID
  const publicationId = await getPublicationId();
  if (!publicationId) {
    console.log('❌ Could not get publication ID. Exiting.');
    return;
  }

  let successCount = 0;
  let failCount = 0;

  // Process and post each file
  for (let i = 0; i < markdownFiles.length; i++) {
    const filePath = markdownFiles[i];
    
    // Process markdown file
    const article = processMarkdownFile(filePath);
    if (!article) {
      failCount++;
      continue;
    }

    // Add delay between posts (except first one)
    if (i > 0) {
      console.log(`⏳ Waiting 5 seconds before next post...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    const success = await publishArticle(article, publicationId);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Final report
  console.log('\n🎉 Auto-posting completed!');
  console.log(`✅ Successfully posted: ${successCount} articles`);
  console.log(`❌ Failed: ${failCount} articles`);
  console.log(`📊 Total processed: ${markdownFiles.length} files`);
  
  if (successCount > 0) {
    console.log('\n💡 Tip: Bạn có thể xóa các file đã post thành công và thêm bài mới vào content-drafts/');
  }
}

// Run the auto-poster
autoPostDrafts().catch(console.error); 