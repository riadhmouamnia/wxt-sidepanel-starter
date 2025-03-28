export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error));
});
