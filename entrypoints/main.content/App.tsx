import { useEffect, useState } from "react";
import ExtMessage, { MessageType } from "@/entrypoints/types";
import reviewsData from "../../constants/reviews.json";

export default function App() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleMessage = async (
      message: ExtMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      console.log("Content script received message: ", message);
      if (message.messageType === MessageType.SHOW_UI) {
        console.log("show ui");
        setShowDialog(true);
      }
      return true;
    };
    browser.runtime.onMessage.addListener(handleMessage);

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <ReviewInsightsModal
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      reviews={reviewsData.reviews}
    />
  );
}
