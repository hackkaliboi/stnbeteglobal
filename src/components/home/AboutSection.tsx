import { useScrollAnimation, useMultipleScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const stats = [
  { value: "10K+", label: "Books" },
  { value: "50K+", label: "Readers" },
  { value: "15+", label: "Years" },
];

const AboutSection = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useMultipleScrollAnimation(stats.length);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            ref={contentRef}
            className={cn(
              "animate-on-scroll-left",
              contentVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              More Than a Bookstore
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a passion for literature, we've been connecting 
                readers with their perfect books for over 15 years.
              </p>
              <p>
                Our carefully curated collection spans genres—from timeless 
                classics to contemporary bestsellers. Whether you seek adventure, 
                wisdom, or mystery, you'll find it here.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                ref={setRef(index)}
                className={cn(
                  "text-center animate-on-scroll-scale",
                  `stagger-${index + 1}`,
                  visibleItems[index] && "is-visible"
                )}
              >
                <div className="text-4xl md:text-5xl font-light text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
