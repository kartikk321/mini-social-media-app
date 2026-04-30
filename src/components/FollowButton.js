import { db, auth } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState } from "react";

export default function FollowButton({ targetUser }) {
  const [following, setFollowing] = useState(false);

  const follow = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      following: arrayUnion(targetUser)
    });

    await updateDoc(doc(db, "users", targetUser), {
      followers: arrayUnion(auth.currentUser.uid)
    });

    setFollowing(true);
  };

  const unfollow = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      following: arrayRemove(targetUser)
    });

    await updateDoc(doc(db, "users", targetUser), {
      followers: arrayRemove(auth.currentUser.uid)
    });

    setFollowing(false);
  };

  return following ? (
    <button onClick={unfollow} className="bg-gray-300 px-3 py-1 rounded">
      Following
    </button>
  ) : (
    <button onClick={follow} className="bg-blue-500 text-white px-3 py-1 rounded">
      Follow
    </button>
  );
}