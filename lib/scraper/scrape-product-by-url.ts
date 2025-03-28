import { DetailedProduct, Review } from "@/entrypoints/types";
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrapes an Amazon product page to extract detailed product data.
 *
 * @param url - The URL of the Amazon product page.
 * @returns A Promise that resolves to a DetailedProduct object or null if scraping fails.
 */
export async function scrapeAmazonProduct(
  url: string
): Promise<DetailedProduct | null> {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    // Basic product details
    const title = $("#productTitle").text().trim();
    const price = $(".a-price .a-offscreen").first().text().trim();
    const rating = $(".a-icon-alt").first().text().trim();
    const totalReviews = $("#acrCustomerReviewText").text().trim();

    // Extract images (from primary image and thumbnails)
    const images: string[] = [];
    $("#imgTagWrapperId img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) images.push(src);
    });
    $("div#altImages img").each((_, el) => {
      const src = $(el).attr("src");
      if (src && !images.includes(src)) images.push(src);
    });

    // Extract description (try different selectors as it might vary)
    let description = $("#productDescription").text().trim();
    if (!description) {
      description = $(
        "div.a-expander-content.a-expander-partial-collapse-content"
      )
        .text()
        .trim();
    }

    // Extract bullet points
    const bulletPoints: string[] = [];
    $(
      "#feature-bullets ul.a-unordered-list.a-vertical li:not(.aok-hidden)"
    ).each((_, el) => {
      const point = $(el).find("span").text().trim();
      if (point) bulletPoints.push(point);
    });

    // Extract specifications (try both common sections)
    const specifications: { [key: string]: string } = {};
    $("#productDetails_techSpec_section_1 tr").each((_, el) => {
      const key = $(el).find("th").text().trim();
      const value = $(el).find("td").text().trim();
      if (key && value) specifications[key] = value;
    });
    $("#productDetails_detailBullets_sections1 tr").each((_, el) => {
      const key = $(el).find("th").text().trim();
      const value = $(el).find("td").text().trim();
      if (key && value) specifications[key] = value;
    });

    // Extract availability info
    const availability = $("#availability span").first().text().trim();

    // Extract offers/promotions (if available)
    const offers: string[] = [];
    $("div#tmmSwatches span").each((_, el) => {
      const offer = $(el).text().trim();
      if (offer && !offers.includes(offer)) offers.push(offer);
    });
    const promo = $("#priceBlockPromotionMessage_feature_div").text().trim();
    if (promo) offers.push(promo);

    // Extract reviews
    const reviews: Review[] = [];
    $(".review").each((_, el) => {
      const reviewTitle = $(el).find(".review-title span").text().trim();
      const reviewContent = $(el)
        .find(".review-text-content span")
        .text()
        .trim();
      const ratingText = $(el).find(".review-rating").text().trim();
      const reviewRating = parseFloat(ratingText.split(" ")[0]);
      const reviewAuthor = $(el).find(".a-profile-name").text().trim();
      const reviewDate = $(el).find(".review-date").text().trim();

      reviews.push({
        title: reviewTitle,
        content: reviewContent,
        rating: reviewRating,
        author: reviewAuthor,
        date: reviewDate,
      });
    });

    return {
      title,
      price,
      rating,
      totalReviews,
      images,
      description,
      bulletPoints,
      specifications,
      availability,
      offers,
      reviews,
    };
  } catch (error) {
    console.error("Error scraping product details:", error);
    return null;
  }
}
