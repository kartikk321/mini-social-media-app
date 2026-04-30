import { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const createPost = async () => {
    if (!text) return;

    await addDoc(collection(db, "posts"), {
      content: text,
      likes: 0,
      userId: user.uid
    });

    setText("");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-md mx-auto p-4">
        
        <div className="bg-white p-3 rounded-xl shadow mb-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="What's on your mind?"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button onClick={createPost} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
            Post
          </button>
        </div>

        {posts.map(p => <Post key={p.id} post={p} />)}
      </div>
    </div>
  );
}