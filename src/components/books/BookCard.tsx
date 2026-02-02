import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  description?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  selarUrl?: string | null;
  isbn?: string | null;
  pages?: number;
  publisher?: string;
  publicationYear?: number | null;
  format?: string;
  dimensions?: string;
  weight?: string;
  language?: string;
  edition?: string;
  rating?: number;
  reviewCount?: number;
}

interface BookCardProps {
  book: Book;
  variant?: "default" | "featured" | "compact" | "horizontal";
}

const BookCard = ({ book, variant = "default" }: BookCardProps) => {
  if (variant === "featured") {
    return (
      <div className="group relative h-full min-h-[500px] bg-secondary overflow-hidden" style={{ borderRadius: '50px 0 50px 0' }}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {book.isNew && (
            <Badge variant="secondary" className="text-xs font-normal">New</Badge>
          )}
          {book.isBestseller && (
            <Badge variant="outline" className="bg-background/90 text-xs font-normal">Bestseller</Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block font-mono">
            {book.category}
          </span>
          <Link to={`/books/${book.id}`}>
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2 group-hover:translate-x-2 transition-transform duration-300 hover:text-muted-foreground">
              {book.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mb-4">{book.author}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-light text-foreground">${book.price.toFixed(2)}</span>
            <a href={book.selarUrl || `https://selar.co/stnbeteglobal/${book.title.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" disabled={!book.inStock}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {book.inStock ? "Buy Now" : "Out of Stock"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="group flex gap-4 p-4 border border-border hover:bg-secondary/50 transition-colors duration-300 h-full" style={{ borderRadius: '50px 0 50px 0' }}>
        <div className="w-20 h-28 bg-secondary flex-shrink-0 overflow-hidden" style={{ borderRadius: '25px 0 25px 0' }}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">
                {book.category}
              </span>
              {book.isBestseller && (
                <Badge variant="outline" className="text-[9px] py-0 px-1">Bestseller</Badge>
              )}
            </div>
            <Link to={`/books/${book.id}`}>
              <h3 className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors line-clamp-2">
                {book.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-foreground">${book.price.toFixed(2)}</span>
            <a href={book.selarUrl || `https://selar.co/stnbeteglobal/${book.title.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="group flex flex-col sm:flex-row gap-6 p-6 border border-border hover:bg-secondary/50 transition-colors duration-300" style={{ borderRadius: '50px 0 50px 0' }}>
        <div className="w-full sm:w-32 h-48 sm:h-44 bg-secondary flex-shrink-0 overflow-hidden" style={{ borderRadius: '25px 0 25px 0' }}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                {book.category}
              </span>
              {book.isNew && (
                <Badge variant="secondary" className="text-[9px] py-0">New</Badge>
              )}
            </div>
            <Link to={`/books/${book.id}`}>
              <h3 className="text-xl font-light text-foreground group-hover:translate-x-1 transition-transform duration-300 hover:text-muted-foreground">
                {book.title}
              </h3>
            </Link>
            <p className="text-muted-foreground mt-1">{book.author}</p>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              A compelling story that captures the essence of human experience and takes readers on an unforgettable journey.
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-light text-foreground">${book.price.toFixed(2)}</span>
            <a href={book.selarUrl || `https://selar.co/stnbeteglobal/${book.title.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" disabled={!book.inStock}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {book.inStock ? "Buy Now" : "Out of Stock"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group relative">
      <Link to={`/books/${book.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4" style={{ borderRadius: '50px 0 50px 0' }}>
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

          {/* Out of Stock Overlay */}
          {!book.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center" style={{ borderRadius: '50px 0 50px 0' }}>
              <span className="text-sm text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Quick Buy - appears on hover */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href={book.selarUrl || `https://selar.co/stnbeteglobal/${book.title.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer">
          <Button
            size="sm"
            className="w-full"
            disabled={!book.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {book.inStock ? "Buy Now" : "Out of Stock"}
          </Button>
        </a>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
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
