export interface CompetitorData {
  title: string;
  description: string;
  price: string;
  image_url: string;
  image_size: number;
  category: string;
}
const BASE_URL = "https://dev.ai.hilalsoftware.tools";

export async function getOptimizeListing({
  competitorData,
  token,
  asin,
  marketplaceId,
}: {
  competitorData?: CompetitorData;
  token: string;
  asin: string;
  marketplaceId: string;
}): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/listing/optimize?product_asin=${asin}&marketplace_id=${marketplaceId}'`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: competitorData
          ? JSON.stringify({ competitor_data: competitorData })
          : null,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
