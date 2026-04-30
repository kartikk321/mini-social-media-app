import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Signup</h2>

      <input className="border p-2 mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button className="bg-green-500 text-white px-4 py-2" onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;