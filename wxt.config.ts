import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["sidePanel"],
    name: "Amazon Product Insights",
    browser_action: {
      default_title: "Click to open side panel",
    },
  },
  runner: {
    startUrls: [
      "https://www.amazon.com/Owala-FreeSip-Insulated-Stainless-BPA-Free/dp/B0BZYCJK89/ref=dp_fod_d_sccl_1/146-1046232-7458521?pd_rd_w=uDKRw&content-id=amzn1.sym.9cf17164-13e4-4652-96f9-f76b8f33fec0&pf_rd_p=9cf17164-13e4-4652-96f9-f76b8f33fec0&pf_rd_r=J9M5DD493AN45MMFAV6X&pd_rd_wg=2do9N&pd_rd_r=fc63c76c-633a-4ff3-b406-33d037868c76&pd_rd_i=B0BZYCJK89&th=1",
    ],
  },
});
