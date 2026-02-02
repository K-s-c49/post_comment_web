import { useState } from 'react';

export default function PostForm({ onCreate }) {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    const img = imageUrl.trim();
    const cap = caption.trim();

    if (!img || !cap) return;

    onCreate({ imageUrl: img, caption: cap });
    setImageUrl('');
    setCaption('');
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="input"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        maxLength={2000}
      />
      <input
        className="input"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        maxLength={500}
      />
      <button className="btn" type="submit">
        Add Post
      </button>
    </form>
  );
}
