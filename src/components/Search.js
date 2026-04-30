import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Search() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const snap = await getDocs(collection(db, "posts"));

    const filtered = snap.docs
      .map(doc => doc.data())
      .filter(p => p.content.toLowerCase().includes(text.toLowerCase()));

    setResults(filtered);
  };

  return (
    <div>
      <input placeholder="Search..." onChange={e => setText(e.target.value)} />
      <button onClick={search}>Search</button>

      {results.map((r, i) => (
        <p key={i}>{r.content}</p>
      ))}
    </div>
  );
}

export default Search;