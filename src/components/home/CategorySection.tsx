import { Link } from "react-router-dom";
import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Fiction", count: 245 },
  { name: "Non-Fiction", count: 189 },
  { name: "Romance", count: 156 },
  { name: "Adventure", count: 98 },
  { name: "Self-Help", count: 134 },
  { name: "Classics", count: 87 },
];

const CategorySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useMultipleScrollAnimation(categories.length);

  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 animate-on-scroll",
            headerVisible && "is-visible"
          )}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Browse Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              ref={setRef(index)}
              className={cn(
                "animate-on-scroll-scale",
                `stagger-${index + 1}`,
                visibleItems[index] && "is-visible"
              )}
            >
              <Link
                to={`/books?category=${category.name.toLowerCase()}`}
                className="group block p-6 border border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 text-center"
              >
                <h3 className="font-medium text-foreground group-hover:text-background transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors">
                  {category.count} books
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
