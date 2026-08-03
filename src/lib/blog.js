/**
 * Blog utility — reads .mdx files from content/blog/ and extracts
 * frontmatter metadata using gray-matter. Used by blog listing page
 * and generateStaticParams for SSG.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get all blog post slugs (for generateStaticParams).
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all posts, sorted by date (newest first).
 */
export function getAllPosts() {
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      readTime: data.readTime || "",
      featured: data.featured || false,
      author: data.author || "",
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
