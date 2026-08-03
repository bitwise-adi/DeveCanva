import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getAllPostSlugs } from "@/lib/blog";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import siteConfig from "@/data/siteConfig";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Read frontmatter for a given slug (server-side only).
 */
function getPostMeta(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).data;
}

/**
 * Dynamic metadata for SEO — each blog post gets its own title/description.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  return {
    title: `${meta.title} — ${siteConfig.name}`,
    description: meta.description || siteConfig.blogTagline,
  };
}

/**
 * Pre-render all known blog slugs at build time.
 */
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

/**
 * Blog post page — dynamically imports the MDX file and renders it
 * inside a styled article layout with header metadata.
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  const { default: Post } = await import(`@content/blog/${slug}.mdx`);

  return (
    <div className="blog-post">
      <div className="blog-post__container">
        <Link href="/blog" className="blog-post__back">
          <ArrowLeft size={16} />
          All articles
        </Link>

        <header className="blog-post__header">
          <h1 className="blog-post__title">{meta.title}</h1>

          <div className="blog-post__meta">
            {meta.date && (
              <span className="blog-post__meta-item">
                <Calendar size={14} />
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {meta.readTime && (
              <span className="blog-post__meta-item">
                <Clock size={14} />
                {meta.readTime}
              </span>
            )}
          </div>

          {meta.tags && meta.tags.length > 0 && (
            <div className="blog-post__tags">
              {meta.tags.map((tag) => (
                <span key={tag} className="blog-post__tag">
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="blog-post__content prose">
          <Post />
        </article>
      </div>
    </div>
  );
}
