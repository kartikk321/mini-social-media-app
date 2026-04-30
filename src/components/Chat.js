import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function Chat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "chats", chatId, "messages"),
      (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      }
    );
    return () => unsub();
  }, [chatId]);

  const send = async () => {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: msg,
      sender: auth.currentUser.uid,
      createdAt: new Date()
    });
    setMsg("");
  };

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}>{m.text}</p>
      ))}

      <input onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default Chat;