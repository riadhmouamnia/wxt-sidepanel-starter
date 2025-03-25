import { Button } from "@/components/ui/button";
import { Review } from "@/entrypoints/types";
import { X } from "lucide-react";

interface ReviewInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
}
export const ReviewInsightsModal: React.FC<ReviewInsightsModalProps> = ({
  isOpen,
  onClose,
  reviews,
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
        <h2 className="text-lg font-semibold mb-4">Review Insights</h2>
        <div className="space-y-4">
          {reviews?.map((review: Review, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{review.title}</h3>
                <p className="text-gray-600">{review.comment}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
