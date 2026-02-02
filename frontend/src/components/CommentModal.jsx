import { useEffect, useMemo, useState } from 'react';
import { api, getToken } from '../lib/api';

export default function CommentModal({ post, open, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const postId = post?._id;
  const token = getToken();

  const title = useMemo(() => {
    const c = post?.caption || '';
    return c.length > 60 ? `${c.slice(0, 60)}…` : c;
  }, [post]);

  useEffect(() => {
    if (!open || !postId) return;

    let cancelled = false;
    setLoading(true);
    setError('');

    api
      .listComments(postId)
      .then((data) => {
        if (cancelled) return;
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || 'Failed to load comments');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, postId]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!postId) return;

    if (!token) {
      setError('Please login to add comments');
      return;
    }

    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      setError('');
      const created = await api.createComment(postId, { text: trimmed });
      setComments((prev) => [created, ...prev]);
      setText('');
    } catch (e2) {
      setError(e2.message || 'Failed to add comment');
    }
  }

  async function onDelete(commentId) {
    if (!postId) return;
    if (!token) {
      setError('Please login to delete comments');
      return;
    }
    try {
      setError('');
      await api.deleteComment(postId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (e) {
      setError(e.message || 'Failed to delete comment');
    }
  }

  if (!open) return null;

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Comments">
      <div className="modal">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">Comments</div>
            <div className="modalSubtitle">{title || 'Post'}</div>
          </div>
          <button className="btn btnGhost" onClick={onClose} type="button">
            Close
          </button>
        </div>

        {error ? <div className="alert">{error}</div> : null}

        <form className="commentForm" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Write a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>

        <div className="commentList">
          {loading ? <div className="muted">Loading…</div> : null}
          {!loading && comments.length === 0 ? <div className="muted">No comments yet.</div> : null}

          {comments.map((c) => (
            <div key={c._id} className="commentItem">
              <div className="commentText">{c.text}</div>
              <div className="commentMeta">
                <span className="muted">{new Date(c.createdAt).toLocaleString()}</span>
                <button className="btn btnDanger btnSmall" type="button" onClick={() => onDelete(c._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
