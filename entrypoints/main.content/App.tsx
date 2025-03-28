import { useEffect, useState } from "react";
import ExtMessage, { MessageType } from "@/entrypoints/types";
import { scrapeAmazonProduct } from "@/lib/scraper/scrape-product-by-url";
import { extractASIN, extractMarketplaceId } from "@/lib/utils";
import { ProductDetails } from "@/components/product-details";

export default function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [asin, setAsin] = useState("");
  const [marketplaceId, setMarketplaceId] = useState("");

  const fetchProduct = useCallback(async () => {
    const url = window.location.href;
    const prod = await scrapeAmazonProduct(url);
    setProduct(prod);
  }, []);

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

    fetchProduct();

    const asin = extractASIN();
    const marketplaceId = extractMarketplaceId();
    setMarketplaceId(marketplaceId || "");
    setAsin(asin || "");

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <ProductDetails
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      product={product}
      asin={asin}
      marketplaceId={marketplaceId}
    />
  );
}
