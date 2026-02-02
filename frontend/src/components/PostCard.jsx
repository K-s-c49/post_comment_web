export default function PostCard({ post, onOpenComments, onDelete, canDelete }) {
  return (
    <div className="card">
      <div className="cardImageWrap">
        <img src={post.imageUrl} alt={post.caption} className="cardImage" loading="lazy" />
      </div>
      <div className="cardBody">
        <div className="cardCaption">{post.caption}</div>

        <div className="cardActions">
          <button className="btn btnGhost" type="button" onClick={() => onOpenComments(post)}>
            Comments ({post.comments?.length ?? 0})
          </button>
          {canDelete ? (
            <button className="btn btnDanger" type="button" onClick={() => onDelete(post._id)}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
