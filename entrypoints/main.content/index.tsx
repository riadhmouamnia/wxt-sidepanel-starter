import ReactDOM from "react-dom/client";
import "@/assets/globals.css";
import App from "./App";

export default defineContentScript({
  matches: ["*://*.amazon.com/*"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "amazon-reviews-extension",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        // Don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        container.append(wrapper);
        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount();
  },
});
