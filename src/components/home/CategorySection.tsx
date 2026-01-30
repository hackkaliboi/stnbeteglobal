import { Link } from "react-router-dom";
import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Fiction", count: 245, size: "large" },
  { name: "Non-Fiction", count: 189, size: "small" },
  { name: "Romance", count: 156, size: "small" },
  { name: "Adventure", count: 98, size: "medium" },
  { name: "Self-Help", count: 134, size: "medium" },
  { name: "Classics", count: 87, size: "small" },
];

const CategorySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useMultipleScrollAnimation(categories.length);

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-2">
            <span
              ref={headerRef}
              className={cn(
                "text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono animate-on-scroll",
                headerVisible && "is-visible"
              )}
            >
              Explore
            </span>
          </div>
          <div
            className={cn(
              "lg:col-span-6 animate-on-scroll-left",
              headerVisible && "is-visible"
            )}
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Browse by<br />Category
            </h2>
          </div>
        </div>

        {/* Asymmetric Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => {
            const colSpan = category.size === "large" ? "md:col-span-2 md:row-span-2" :
              category.size === "medium" ? "md:col-span-2" : "md:col-span-2";
            const height = category.size === "large" ? "h-48 md:h-full" :
              category.size === "medium" ? "h-32 md:h-40" : "h-28 md:h-32";

            return (
              <div
                key={category.name}
                ref={setRef(index)}
                className={cn(
                  colSpan,
                  "animate-on-scroll-scale",
                  `stagger-${index + 1}`,
                  visibleItems[index] && "is-visible"
                )}
              >
                <Link
                  to={`/books?category=${category.name.toLowerCase()}`}
                  className={cn(
                    "group flex flex-col justify-between p-5 border border-border bg-background",
                    "hover:bg-foreground transition-all duration-300",
                    height
                  )}
                >
                  <span className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors font-mono">
                    {category.count} books
                  </span>
                  <h3 className="text-lg md:text-xl font-light text-foreground group-hover:text-background transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
