import ExtMessage, { MessageFrom, MessageType } from "./types";

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
        console.log(tabs[0]);
        await browser.tabs.sendMessage(tabs[0].id!, message);
      }
      return true;
    }
  );
});
