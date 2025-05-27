import { troChoiNhomVuiNhonKhac } from './5-tro-choi-nhom-vui-nhon-khac';
import { cauHoiThatHayThachHaiHuocNhat } from './10-cau-hoi-that-hay-thach-hai-huoc-nhat';
import { cachToChucTiecSinhNhat } from './cach-to-chuc-tiec-sinh-nhat-voi-that-hay-thach';
import { thatHayThachChoTreEm } from './that-hay-thach-cho-tre-em';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  cauHoiThatHayThachHaiHuocNhat,
  cachToChucTiecSinhNhat,
  troChoiNhomVuiNhonKhac,
  thatHayThachChoTreEm,
];

// Utility functions cho blog posts
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentPostId: number, limit = 2): BlogPost[] {
  return blogPosts.filter((post) => post.id !== currentPostId).slice(0, limit);
}
