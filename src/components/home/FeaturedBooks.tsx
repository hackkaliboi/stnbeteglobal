import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBooks } from "@/hooks/useBooks";
import { cn } from "@/lib/utils";
import BookCard from "@/components/books/BookCard";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const FeaturedBooks = () => {
  const { books, loading } = useBooks();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  // Get featured books (bestsellers and new books)
  const featuredBooks = books
    .filter(book => book.is_bestseller || book.is_new)
    .slice(0, 4);

  const { setRef, visibleItems } = useMultipleScrollAnimation(featuredBooks.length);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading featured books...</span>
          </div>
        </div>
      </section>
    );
  }

  if (featuredBooks.length === 0) {
    return null; // Don't show section if no featured books
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
                  ...featuredBooks[0],
                  coverImage: featuredBooks[0].cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
                  isNew: featuredBooks[0].is_new,
                  isBestseller: featuredBooks[0].is_bestseller,
                  inStock: featuredBooks[0].in_stock,
                  selarUrl: featuredBooks[0].selar_url,
                  isbn: featuredBooks[0].isbn,
                  pages: featuredBooks[0].pages,
                  publisher: featuredBooks[0].publisher,
                  publicationYear: featuredBooks[0].publication_year,
                  format: featuredBooks[0].format,
                  dimensions: featuredBooks[0].dimensions,
                  weight: featuredBooks[0].weight,
                  language: featuredBooks[0].language,
                  edition: featuredBooks[0].edition,
                  rating: featuredBooks[0].rating,
                  reviewCount: featuredBooks[0].review_count
                }}
                variant="featured"
              />
            </div>
          )}

          {/* Stacked smaller books */}
          {featuredBooks[1] && (
            <div
              ref={setRef(1)}
              className={cn(
                "md:col-span-5 animate-on-scroll stagger-1",
                visibleItems[1] && "is-visible"
              )}
            >
              <BookCard
                book={{
                  ...featuredBooks[1],
                  coverImage: featuredBooks[1].cover_image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
                  isNew: featuredBooks[1].is_new,
                  isBestseller: featuredBooks[1].is_bestseller,
                  inStock: featuredBooks[1].in_stock,
                  selarUrl: featuredBooks[1].selar_url,
                  isbn: featuredBooks[1].isbn,
                  pages: featuredBooks[1].pages,
                  publisher: featuredBooks[1].publisher,
                  publicationYear: featuredBooks[1].publication_year,
                  format: featuredBooks[1].format,
                  dimensions: featuredBooks[1].dimensions,
                  weight: featuredBooks[1].weight,
                  language: featuredBooks[1].language,
                  edition: featuredBooks[1].edition,
                  rating: featuredBooks[1].rating,
                  reviewCount: featuredBooks[1].review_count
                }}
                variant="compact"
              />
            </div>
          )}

          {featuredBooks[2] && (
            <div
              ref={setRef(2)}
              className={cn(
                "md:col-span-5 animate-on-scroll stagger-2",
                visibleItems[2] && "is-visible"
              )}
            >
              <BookCard
                book={{
                  ...featuredBooks[2],
                  coverImage: featuredBooks[2].cover_image || "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
                  isNew: featuredBooks[2].is_new,
                  isBestseller: featuredBooks[2].is_bestseller,
                  inStock: featuredBooks[2].in_stock,
                  selarUrl: featuredBooks[2].selar_url,
                  isbn: featuredBooks[2].isbn,
                  pages: featuredBooks[2].pages,
                  publisher: featuredBooks[2].publisher,
                  publicationYear: featuredBooks[2].publication_year,
                  format: featuredBooks[2].format,
                  dimensions: featuredBooks[2].dimensions,
                  weight: featuredBooks[2].weight,
                  language: featuredBooks[2].language,
                  edition: featuredBooks[2].edition,
                  rating: featuredBooks[2].rating,
                  reviewCount: featuredBooks[2].review_count
                }}
                variant="compact"
              />
            </div>
          )}
        </div>

        {/* Bottom row - offset */}
        {featuredBooks[3] && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            <div className="hidden md:block md:col-span-3" />
            <div
              ref={setRef(3)}
              className={cn(
                "md:col-span-6 animate-on-scroll stagger-3",
                visibleItems[3] && "is-visible"
              )}
            >
              <BookCard
                book={{
                  ...featuredBooks[3],
                  coverImage: featuredBooks[3].cover_image || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
                  isNew: featuredBooks[3].is_new,
                  isBestseller: featuredBooks[3].is_bestseller,
                  inStock: featuredBooks[3].in_stock,
                  selarUrl: featuredBooks[3].selar_url,
                  isbn: featuredBooks[3].isbn,
                  pages: featuredBooks[3].pages,
                  publisher: featuredBooks[3].publisher,
                  publicationYear: featuredBooks[3].publication_year,
                  format: featuredBooks[3].format,
                  dimensions: featuredBooks[3].dimensions,
                  weight: featuredBooks[3].weight,
                  language: featuredBooks[3].language,
                  edition: featuredBooks[3].edition,
                  rating: featuredBooks[3].rating,
                  reviewCount: featuredBooks[3].review_count
                }}
                variant="horizontal"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
