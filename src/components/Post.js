import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Comments from "./Comments";

export default function Post({ post }) {
  const like = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      likes: post.likes + 1
    });
  };

  return (
    <div className="bg-white rounded-xl shadow mb-4">
      
      <div className="p-3 font-semibold">{post.userId}</div>

      {post.image && (
        <img src={post.image} className="w-full object-cover max-h-96" />
      )}

      <div className="p-3">
        <div className="flex gap-4 text-xl mb-2">
          <button onClick={like}>❤️</button>
          <button>💬</button>
        </div>

        <p className="text-sm">{post.likes} likes</p>
        <p><b>{post.userId}</b> {post.content}</p>
      </div>

      <Comments postId={post.id} />
    </div>
  );
}