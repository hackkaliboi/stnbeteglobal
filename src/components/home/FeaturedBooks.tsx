import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBooks } from "@/hooks/useBooks";
import { cn } from "@/lib/utils";
import BookCard from "@/components/books/BookCard";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const FeaturedBooks = () => {
  const { data: books = [], isLoading: loading } = useBooks();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  // Get featured books - show up to 8 for a fuller display
  const featuredBooks = books
    .filter(book => book.is_featured)
    .slice(0, 8);

  const { setRef, visibleItems } = useMultipleScrollAnimation(featuredBooks.length);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-background flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </section>
    );
  }

  if (featuredBooks.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Header Section */}
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

        {/* Full Grid Layout - Matching Books Page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredBooks.map((book, i) => (
            <div
              key={book.id}
              ref={setRef(i)}
              className={cn(
                "animate-on-scroll",
                visibleItems[i] && "is-visible"
              )}
            >
              <BookCard
                book={{
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  coverImage: book.cover_image || "/placeholder.svg",
                  selarUrl: book.selar_url,
                  isFeatured: book.is_featured
                }}
                variant="default"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
