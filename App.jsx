import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './BlogCard.css';

export default function BlogCard({ blog }) {
  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true });

  return (
    <article className="blog-card animate-in">
      {blog.coverImage && (
        <Link to={`/blog/${blog._id}`} className="blog-card-image-wrap">
          <img src={blog.coverImage} alt={blog.title} className="blog-card-image" />
        </Link>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="badge">{blog.category}</span>
          <span className="blog-read-time">⏱ {blog.readTime} min read</span>
        </div>

        <Link to={`/blog/${blog._id}`} className="blog-card-title-link">
          <h2 className="blog-card-title">{blog.title}</h2>
        </Link>

        <p className="blog-card-excerpt">{blog.excerpt}</p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-card-tags">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-chip">#{tag}</span>
            ))}
          </div>
        )}

        <div className="blog-card-footer">
          <Link to={`/profile/${blog.author?._id}`} className="author-info">
            <div className="author-avatar">
              {blog.author?.avatar ? (
                <img src={blog.author.avatar} alt={blog.author.username} />
              ) : (
                <span>{blog.author?.username?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <span className="author-name">{blog.author?.username}</span>
          </Link>

          <div className="blog-card-stats">
            <span className="stat">❤️ {blog.likes?.length || 0}</span>
            <span className="stat">👁 {blog.views || 0}</span>
            <span className="stat time">{timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
