import ChatUI from "../components/ChatUI";
import Navbar from "../components/Navbar";

export default function ChatPage() {
  const chatId = "globalChat"; // simple demo

  return (
    <div>
      <Navbar />
      <ChatUI chatId={chatId} />
    </div>
  );
}