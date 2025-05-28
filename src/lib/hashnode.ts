import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://gql.hashnode.com';
const HASHNODE_HOST = 'truth-or-dare-game.hashnode.dev';

export const client = new GraphQLClient(endpoint, {});

// TypeScript interfaces
interface HashnodeTag {
  name: string;
  slug: string;
}

interface HashnodeAuthor {
  name: string;
  profilePicture: string;
  bio?: {
    text: string;
  };
}

interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  tags: HashnodeTag[];
  author: HashnodeAuthor;
  readTimeInMinutes: number;
  content?: {
    html: string;
  };
  seo?: {
    title: string;
    description: string;
  };
}

interface HashnodePostsResponse {
  publication: {
    posts: {
      edges: Array<{
        node: HashnodePost;
      }>;
    };
  };
}

interface HashnodePostResponse {
  publication: {
    post: HashnodePost | null;
  };
}

// Get all published posts
export const GET_POSTS = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      id
      title
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            tags {
              name
              slug
            }
            author {
              name
              profilePicture
            }
            readTimeInMinutes
          }
        }
      }
    }
  }
`;

// Get single post by slug
export const GET_POST = `
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        content {
          html
        }
        brief
        slug
        publishedAt
        coverImage {
          url
        }
        tags {
          name
          slug
        }
        author {
          name
          profilePicture
          bio {
            text
          }
        }
        readTimeInMinutes
        seo {
          title
          description
        }
      }
    }
  }
`;

export async function getAllPosts() {
  try {
    const data = await client.request<HashnodePostsResponse>(GET_POSTS, {
      host: HASHNODE_HOST,
      first: 20,
    });
    return data.publication.posts.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      excerpt: node.brief,
      slug: node.slug,
      date: node.publishedAt,
      category: node.tags[0]?.name || 'Uncategorized',
      tags: node.tags.map((tag) => tag.name),
      image: node.coverImage?.url,
      author: node.author.name,
      readTime: `${node.readTimeInMinutes} phút đọc`,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const data = await client.request<HashnodePostResponse>(GET_POST, {
      host: HASHNODE_HOST,
      slug,
    });

    const post = data.publication.post;
    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      content: post.content?.html || '',
      excerpt: post.brief,
      slug: post.slug,
      date: post.publishedAt,
      category: post.tags[0]?.name || 'Uncategorized',
      tags: post.tags.map((tag) => tag.name),
      image: post.coverImage?.url,
      author: post.author.name,
      authorImage: post.author.profilePicture,
      authorBio: post.author.bio?.text,
      readTime: `${post.readTimeInMinutes} phút đọc`,
      seo: post.seo,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
