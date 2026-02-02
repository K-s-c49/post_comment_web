import { useEffect, useMemo, useState } from 'react';
import { api, getToken } from './lib/api';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';
import CommentModal from './components/CommentModal';
import AuthBar from './components/AuthBar';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [token, setToken] = useState(getToken());

  const postCount = posts.length;
  const subtitle = useMemo(() => {
    if (loading) return 'Loading posts…';
    return `${postCount} post${postCount === 1 ? '' : 's'}`;
  }, [loading, postCount]);

  async function refresh() {
    try {
      setLoading(true);
      setError('');
      const data = await api.listPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function onAuthChange() {
    setToken(getToken());
    refresh();
  }

  async function onCreatePost(payload) {
    try {
      setError('');
      const created = await api.createPost(payload);
      setPosts((prev) => [created, ...prev]);
    } catch (e) {
      setError(e.message || 'Failed to create post');
    }
  }

  async function onDeletePost(postId) {
    try {
      setError('');
      await api.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      if (selectedPost?._id === postId) {
        setCommentsOpen(false);
        setSelectedPost(null);
      }
    } catch (e) {
      setError(e.message || 'Failed to delete post');
    }
  }

  function onOpenComments(post) {
    setSelectedPost(post);
    setCommentsOpen(true);
  }

  function onCloseComments() {
    setCommentsOpen(false);
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="h1">Post & Comment Manager</h1>
          <p className="subtitle">{subtitle}</p>
        </div>

        <button className="btn btnGhost" type="button" onClick={refresh}>
          Refresh
        </button>
      </div>

      {error ? <div className="alert">{error}</div> : null}

      <AuthBar onAuthChange={onAuthChange} />

      {token ? <PostForm onCreate={onCreatePost} /> : null}

      <div className="grid">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onOpenComments={onOpenComments}
            onDelete={onDeletePost}
            canDelete={Boolean(token)}
          />
        ))}
      </div>

      <CommentModal post={selectedPost} open={commentsOpen} onClose={onCloseComments} />
    </div>
  );
}
