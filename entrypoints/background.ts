import ExtMessage, { MessageFrom, MessageType } from "./types";

const CHROME_STORE_URL = "https://chromewebstore.google.com/";
const CHROME_EXTENSIONS_URL = "chrome://extensions/";
const CHROME_NEW_TAB_URL = "chrome://newtab/";

const isValidUrl = (url: string) => {
  return (
    !url.includes(CHROME_EXTENSIONS_URL) &&
    !url.includes(CHROME_STORE_URL) &&
    !url.includes(CHROME_NEW_TAB_URL)
  );
};
const isAmazonUrl = (url: string) => url.startsWith("https://www.amazon.com/");

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  // open side panel
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error));

  // listen for show ui
  browser.runtime.onMessage.addListener(
    async (
      message: ExtMessage,
      sender,
      sendResponse: (message: any) => void
    ) => {
      if (message.messageType === MessageType.SHOW_UI) {
        console.log("background: ", message);
        let tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        await browser.tabs.sendMessage(tabs[0].id!, message);
      }
      return true;
    }
  );

  // Listen for tab changes
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await browser.tabs.get(activeInfo.tabId);
    if (tab.url) {
      const url = tab.url;
      if (!isValidUrl(url)) return;
      // send the message to the Side Panel or Popup as well
      browser.runtime.sendMessage({
        messageType: MessageType.TAB_CHANGE,
        data: { url },
      });
      if (!isAmazonUrl(url)) return;
      // send the message to the content script if it is an amazon product page
      console.log("tab change: ", url);
      browser.tabs.sendMessage(activeInfo.tabId, {
        messageType: MessageType.TAB_CHANGE,
        data: { url },
      });
    }
  });

  // listen for url changes
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      const url = changeInfo.url;
      if (!isValidUrl(url)) return;
      // send the message to the Side Panel or Popup as well
      browser.runtime.sendMessage({
        messageType: MessageType.TAB_CHANGE,
        data: { url },
      });
      if (!isAmazonUrl(url)) return;
      // send the message to the content script if it is an amazon product page
      console.log("url change: ", url);
      browser.tabs.sendMessage(tabId, {
        messageType: MessageType.URL_CHANGE,
        data: { url },
      });
    }
  });
});
