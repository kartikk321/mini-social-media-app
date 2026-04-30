import FollowButton from "../components/FollowButton";

export default function Profile() {
  const targetUser = "someUserId"; // replace dynamically later

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Profile</h2>

      <FollowButton targetUser={targetUser} />
    </div>
  );
}