// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { X } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// interface Review {
//   title: string;
//   content: string;
//   rating: number;
//   author: string;
//   date: string;
// }

// interface Product {
//   title: string;
//   price: string;
//   rating: string;
//   totalReviews: string;
//   reviews: Review[];
// }

// interface ProductDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   product: Product;
// }

// export const ReviewInsightsModal: React.FC<ProductDetailsModalProps> = ({
//   isOpen,
//   onClose,
//   product,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-[999999999] bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-background rounded-lg shadow-lg max-w-5xl w-full p-6 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <Button
//           onClick={onClose}
//           variant="outline"
//           size="icon"
//           className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//         >
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </Button>
//         <h2 className="text-lg font-semibold mb-4">Product Details</h2>
//         {!product ? (
//           <div className="space-y-4">
//             <Skeleton className="h-6 w-3/4" />
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-1/3" />
//             <Skeleton className="h-6 w-full mt-4" />
//             <Skeleton className="h-4 w-5/6" />
//           </div>
//         ) : (
//           <>
//             <div className="mb-4">
//               <h3 className="text-xl font-bold">{product.title}</h3>
//               <p className="text-gray-600">Price: {product.price}</p>
//               <p className="text-gray-600">
//                 Rating: {product.rating} ({product.totalReviews} reviews)
//               </p>
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Reviews</h3>
//             <ScrollArea className="h-72 p-4">
//               <div className="space-y-4">
//                 {product.reviews?.map((review: Review, index: number) => (
//                   <div
//                     key={index}
//                     className="p-4 border rounded-lg shadow-sm flex flex-col"
//                   >
//                     <h3 className="font-semibold">{review.title}</h3>
//                     <p className="text-gray-600">{review.content}</p>
//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-sm text-gray-500">
//                         By {review.author} on {review.date}
//                       </span>
//                       <span className="text-yellow-500">
//                         {"⭐".repeat(review.rating)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";

interface Review {
  title: string;
  content: string;
  rating: number;
  author: string;
  date: string;
}

interface QandA {
  question: string;
  answer: string;
}

interface RelatedProduct {
  title: string;
  url: string;
  image: string;
  price: string;
}

interface Product {
  title: string;
  price: string;
  rating: string;
  totalReviews: string;
  images: string[];
  description: string;
  bulletPoints: string[];
  specifications: { [key: string]: string };
  availability: string;
  offers: string[];
  reviews: Review[];
  qas?: QandA[];
  relatedProducts?: RelatedProduct[];
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  asin?: string;
  marketplaceId?: string;
}

export const ProductDetails: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  asin,
  marketplaceId,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999999999] bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg shadow-lg max-w-5xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        <p className="mb-4">
          ASIN: {asin} Marketplace ID: {marketplaceId}
        </p>
        {!product ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
              <TabsTrigger value="related">Related Products</TabsTrigger>
            </TabsList>
            {/* Overview Tab */}
            <TabsContent value="overview">
              <ScrollArea className="h-72 p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{product.title}</h3>

                    <p className="text-gray-600">Price: {product.price}</p>
                    <p className="text-gray-600">
                      Rating: {product.rating} ({product.totalReviews} reviews)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Description</h4>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                  {product.bulletPoints.length > 0 && (
                    <div>
                      <h4 className="font-semibold">Key Features</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.bulletPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            {/* Specifications Tab */}
            <TabsContent value="specifications">
              <ScrollArea className="h-72 p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                      {Object.entries(product.specifications).map(
                        ([key, value], idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="font-medium">{key}</span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Availability</h4>
                    <p className="text-gray-700">{product.availability}</p>
                  </div>
                  {product.offers.length > 0 && (
                    <div>
                      <h4 className="font-semibold">Offers & Promotions</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.offers.map((offer, idx) => (
                          <li key={idx}>{offer}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <ScrollArea className="h-72 p-4">
                <div className="space-y-4">
                  {product.reviews.map((review: Review, index: number) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg shadow-sm flex flex-col"
                    >
                      <h3 className="font-semibold">{review.title}</h3>
                      <p className="text-gray-600">{review.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          By {review.author} on {review.date}
                        </span>
                        <span className="text-yellow-500">
                          {"⭐".repeat(review.rating)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            {/* Q&A Tab */}
            <TabsContent value="qa">
              <ScrollArea className="h-72 p-4">
                {product.qas && product.qas.length > 0 ? (
                  <div className="space-y-4">
                    {product.qas.map((qa, index: number) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg shadow-sm"
                      >
                        <h4 className="font-semibold">Q: {qa.question}</h4>
                        <p>A: {qa.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No Q&amp;A available.</p>
                )}
              </ScrollArea>
            </TabsContent>
            {/* Related Products Tab */}
            <TabsContent value="related">
              <ScrollArea className="h-72 p-4">
                {product.relatedProducts &&
                product.relatedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {product.relatedProducts.map((rp, index: number) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg shadow-sm flex flex-col items-center"
                      >
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-20 h-20 object-contain mb-2"
                        />
                        <h4 className="font-semibold">{rp.title}</h4>
                        <p className="text-gray-600">{rp.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No related products available.
                  </p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};
