import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background border-b border-border">
      {/* Content */}
      <div className="container mx-auto px-4 py-24">
        <div
          ref={contentRef}
          className={cn(
            "max-w-3xl mx-auto text-center animate-on-scroll",
            contentVisible && "is-visible"
          )}
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Independent Bookstore
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 leading-[1.1] tracking-tight">
            Stories That
            <br />
            <span className="font-medium">Inspire</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
            Curated books for curious minds. Explore our collection of bestsellers, new releases, and timeless classics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button size="lg" className="min-w-[180px] group">
                Browse Books
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="min-w-[180px]">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
