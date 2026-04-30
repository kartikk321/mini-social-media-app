import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function ChatUI({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "chats", chatId, "messages"),
      (snap) => {
        setMessages(snap.docs.map(doc => doc.data()));
      }
    );
    return () => unsub();
  }, [chatId]);

  const send = async () => {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      sender: auth.currentUser.uid,
      createdAt: new Date()
    });
    setText("");
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex-1 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              m.sender === auth.currentUser.uid
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={send} className="ml-2 bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}