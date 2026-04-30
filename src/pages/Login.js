import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl mb-4">Login</h2>

      <input className="border p-2 mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button className="bg-blue-500 text-white px-4 py-2" onClick={login}>Login</button>

      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;