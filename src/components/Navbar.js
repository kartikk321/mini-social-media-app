import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b bg-white sticky top-0 z-50">
      <h1 className="text-xl font-bold">MiniSocial</h1>

      <div className="flex gap-5 text-xl">
        <Link to="/home">🏠</Link>
        <Link to="/chat">💬</Link>
        <Link to="/notifications">🔔</Link>
        <Link to="/profile">👤</Link>
      </div>

      <button onClick={() => auth.signOut()} className="text-sm">Logout</button>
    </div>
  );
}