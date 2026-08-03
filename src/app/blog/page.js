import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import siteConfig from "@/data/siteConfig";

export const metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: siteConfig.blogTagline,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const hasPosts = posts.length > 0;

  return (
    <div className="blog-page">
      <div className="blog-page__content">
        <h1 className="blog-page__title">Writing &amp; Thoughts</h1>
        <p className="blog-page__subtitle">{siteConfig.blogTagline}</p>

        {hasPosts ? (
          <div className="blog-list">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-list__card"
              >
                <div className="blog-list__card-body">
                  <h2 className="blog-list__card-title">{post.title}</h2>
                  <p className="blog-list__card-desc">{post.description}</p>

                  <div className="blog-list__card-meta">
                    {post.date && (
                      <span className="blog-list__meta-item">
                        <Calendar size={13} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="blog-list__meta-item">
                        <Clock size={13} />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-list__card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-list__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="blog-list__card-arrow">
                  <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="blog__coming-soon">
            <span className="blog__badge">Coming Soon</span>
            <p className="blog__teaser">{siteConfig.blogTagline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
