import { StarField } from "@components/atoms/StarField";
import { ChatWrapper } from "@components/features/chat/ChatWrapper";
import { MainPage } from "./pages/MainPage";

export default function App() {
  return (
    <>
      <StarField />
      <MainPage />
      <ChatWrapper />
    </>
  );
}
