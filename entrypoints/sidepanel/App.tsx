import { Button } from "@/components/ui/button";
import ExtMessage, { MessageType } from "../types";

function App() {
  const [isNotAmazonProductPage, setIsNotAmazonProductPage] = useState(false);
  const [currentAsin, setCurrentAsin] = useState("");

  const handleShowReviews = async () => {
    const currentTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    // if the current tab url is not an amazon product page then return;
    if (
      !currentTab[0].url?.includes("www.amazon.com/") ||
      isNotAmazonProductPage
    )
      return;
    await browser.runtime.sendMessage({
      messageType: MessageType.SHOW_UI,
    });
  };

  useEffect(() => {
    const getCurrentTabUrl = async () => {
      const currentTab = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      setIsNotAmazonProductPage(
        !currentTab[0].url?.includes("www.amazon.com/")
      );
      setCurrentAsin(currentTab[0].url?.split("/dp/")[1]?.split("/")[0] || "");
    };
    const handleMessage = async (
      message: ExtMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      console.log(message);
      if (message.messageType == MessageType.TAB_CHANGE) {
        const tabUrl = message.data.url;
        console.log("tabUrl: ", tabUrl);
        const asin = tabUrl.split("/dp/")[1]?.split("/")[0] || "";
        setCurrentAsin(asin);
        setIsNotAmazonProductPage(!tabUrl.includes("www.amazon.com/"));
      } else if (message.messageType === MessageType.URL_CHANGE) {
        const url = message.data.url;
        console.log("url: ", url);
        const asin = url.split("/dp/")[1]?.split("/")[0] || "";
        setCurrentAsin(asin);
        setIsNotAmazonProductPage(!url.includes("www.amazon.com/"));
      }
      return true;
    };
    browser.runtime.onMessage.addListener(handleMessage);

    getCurrentTabUrl();

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="h-full min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Amazon reviews</h1>
      {currentAsin && <p>Current ASIN: {currentAsin}</p>}
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
        suscipit! Voluptates laborum, eius esse voluptate nisi assumenda tempore
        autem quaerat aspernatur! Sint magni aut nobis tempora alias eius vel
        totam!
      </p>
      <div className="flex flex-col gap-4 nmt-10">
        <Button
          className="cursor-pointer"
          onClick={handleShowReviews}
          disabled={isNotAmazonProductPage}
        >
          Show reviews
        </Button>
        <Button disabled></Button>
        <Button disabled></Button>
        <Button disabled></Button>
      </div>
    </div>
  );
}

export default App;
