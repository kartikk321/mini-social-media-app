import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function Comments({ postId }) {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", postId, "comments"),
      (snap) => {
        setList(snap.docs.map(doc => doc.data()));
      }
    );
    return () => unsub();
  }, [postId]);

  const send = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), { text });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={send}>Comment</button>

      {list.map((c, i) => <p key={i}>{c.text}</p>)}
    </div>
  );
}

export default Comments;