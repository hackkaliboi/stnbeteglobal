import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import BookCard, { Book } from "@/components/books/BookCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Editorial Header - Asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div
            ref={headerRef}
            className={cn(
              "lg:col-span-6 animate-on-scroll-left",
              headerVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block font-mono">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
              New &<br />Noteworthy
            </h2>
          </div>
          <div
            className={cn(
              "lg:col-span-4 lg:col-start-9 flex items-end animate-on-scroll-right",
              headerVisible && "is-visible"
            )}
          >
            <div>
              <p className="text-muted-foreground mb-4">
                Handpicked selections from our editors. Updated weekly with fresh finds.
              </p>
              <Link
                to="/books"
                className="inline-flex items-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group"
              >
                View all books
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Editorial Grid - Varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large featured book */}
          <div
            ref={setRef(0)}
            className={cn(
              "md:col-span-7 md:row-span-2 animate-on-scroll",
              visibleItems[0] && "is-visible"
            )}
          >
            <BookCard book={featuredBooks[0]} variant="featured" />
          </div>

          {/* Stacked smaller books */}
          <div
            ref={setRef(1)}
            className={cn(
              "md:col-span-5 animate-on-scroll stagger-1",
              visibleItems[1] && "is-visible"
            )}
          >
            <BookCard book={featuredBooks[1]} variant="compact" />
          </div>

          <div
            ref={setRef(2)}
            className={cn(
              "md:col-span-5 animate-on-scroll stagger-2",
              visibleItems[2] && "is-visible"
            )}
          >
            <BookCard book={featuredBooks[2]} variant="compact" />
          </div>
        </div>

        {/* Bottom row - offset */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          <div className="hidden md:block md:col-span-3" />
          <div
            ref={setRef(3)}
            className={cn(
              "md:col-span-6 animate-on-scroll stagger-3",
              visibleItems[3] && "is-visible"
            )}
          >
            <BookCard book={featuredBooks[3]} variant="horizontal" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
