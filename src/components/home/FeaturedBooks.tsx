import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard, { Book } from "@/components/books/BookCard";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

// Sample featured books data
const featuredBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Creative Writing",
    author: "Sarah Mitchell",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Writing",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "2",
    title: "Journey Through Time",
    author: "Michael Chen",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Fiction",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "3",
    title: "Mindful Living",
    author: "Emma Thompson",
    price: 16.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Self-Help",
    isNew: true,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "4",
    title: "The Silent Observer",
    author: "James Wilson",
    price: 21.99,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    category: "Mystery",
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
];

const FeaturedBooks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useMultipleScrollAnimation(featuredBooks.length);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "flex flex-col md:flex-row md:items-end justify-between mb-16 animate-on-scroll",
            headerVisible && "is-visible"
          )}
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Featured Books
            </h2>
          </div>
          <Link to="/books" className="mt-6 md:mt-0">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book, index) => (
            <div
              key={book.id}
              ref={setRef(index)}
              className={cn(
                "animate-on-scroll",
                `stagger-${index + 1}`,
                visibleItems[index] && "is-visible"
              )}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
