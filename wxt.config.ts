import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["sidePanel"],
    name: "WXT + React Side Panel Example",
    browser_action: {
      default_title: "Click to open side panel",
      default_popup: "popup.html",
    },
  },
});
