import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

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
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {book.isBestseller && (
            <Badge variant="secondary">Bestseller</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full shadow-md">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Out of Stock Overlay */}
        {!book.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {book.category}
          </p>
          <Link to={`/books/${book.id}`}>
            <h3 className="font-serif font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${book.price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            disabled={!book.inStock}
            className="shadow-sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
