import { useState } from "react";
import type { Post } from "../data/mockData";
import { BookmarkIcon, CommentIcon, HeartIcon, MoreIcon, ShareIcon } from "./Icons";

type Props = { post: Post };

function formatLikes(n: number) {
  return n.toLocaleString();
}

export function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__user">
          <span className="post__avatarRing">
            <img src={post.avatar} alt="" width={32} height={32} className="post__avatar" />
          </span>
          <div className="post__meta">
            <span className="post__username">{post.username}</span>
            {post.location ? <span className="post__location">{post.location}</span> : null}
          </div>
        </div>
        <button type="button" className="iconBtn" aria-label="Post options">
          <MoreIcon />
        </button>
      </header>
      <div className="post__media">
        <img src={post.image} alt="" loading="lazy" />
      </div>
      <div className="post__toolbar">
        <div className="post__toolbarLeft">
          <button
            type="button"
            className={`iconBtn ${liked ? "iconBtn--accent" : ""}`}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
            onClick={() => setLiked((v) => !v)}
          >
            <HeartIcon filled={liked} />
          </button>
          <button type="button" className="iconBtn" aria-label="Comment">
            <CommentIcon />
          </button>
          <button type="button" className="iconBtn" aria-label="Share">
            <ShareIcon />
          </button>
        </div>
        <button
          type="button"
          className={`iconBtn ${saved ? "iconBtn--accent" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? "Remove save" : "Save"}
          onClick={() => setSaved((v) => !v)}
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>
      <div className="post__body">
        <p className="post__likes">{formatLikes(post.likes + (liked ? 1 : 0))} likes</p>
        <p className="post__caption">
          <strong>{post.username}</strong> {post.caption}
        </p>
        <button type="button" className="post__commentsLink">
          {post.commentsPreview}
        </button>
        <time className="post__time">{post.timeAgo}</time>
      </div>
    </article>
  );
}
