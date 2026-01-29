import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.isNew && (
            <Badge variant="secondary" className="text-xs font-normal">New</Badge>
          )}
          {book.isBestseller && (
            <Badge variant="outline" className="bg-background/90 text-xs font-normal">Bestseller</Badge>
          )}
        </div>

        {/* Quick Add - appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            className="w-full"
            disabled={!book.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {book.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>

        {/* Out of Stock Overlay */}
        {!book.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {book.category}
        </p>
        <Link to={`/books/${book.id}`}>
          <h3 className="font-medium text-foreground hover:text-muted-foreground transition-colors line-clamp-1">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="text-foreground font-medium pt-1">
          ${book.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
