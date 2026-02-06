import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBooks } from "@/hooks/useBooks";
import { cn } from "@/lib/utils";
import BookCard from "@/components/books/BookCard";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const FeaturedBooks = () => {
  const { data: books = [], isLoading: loading } = useBooks();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  // Get featured books
  const featuredBooks = books
    .filter(book => book.is_featured)
    .slice(0, 4);

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
          {featuredBooks[0] && (
            <div
              ref={setRef(0)}
              className={cn(
                "md:col-span-7 md:row-span-2 animate-on-scroll",
                visibleItems[0] && "is-visible"
              )}
            >
              <BookCard
                book={{
                  id: featuredBooks[0].id,
                  title: featuredBooks[0].title,
                  author: featuredBooks[0].author,
                  coverImage: featuredBooks[0].cover_image || "/placeholder.svg",
                  selarUrl: featuredBooks[0].selar_url,
                  isFeatured: featuredBooks[0].is_featured
                }}
                variant="featured"
              />
            </div>
          )}

          {/* Stacked smaller books */}
          {featuredBooks.slice(1).length > 0 && (
            <div className="md:col-span-5 md:row-span-2 flex flex-col gap-6">
              {featuredBooks.slice(1).map((book, i) => (
                <div
                  key={book.id}
                  ref={setRef(i + 1)}
                  className={cn(
                    "flex-1 animate-on-scroll",
                    visibleItems[i + 1] && "is-visible"
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
                    variant="horizontal"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
