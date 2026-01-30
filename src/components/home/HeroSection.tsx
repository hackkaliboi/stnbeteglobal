import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center bg-background pt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Content - Offset to the left */}
          <div
            ref={leftRef}
            className={cn(
              "lg:col-span-5 lg:col-start-1 animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
              Independent Bookstore
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground leading-[0.95] tracking-tight mb-8">
              Stories
              <br />
              That
              <br />
              <span className="font-medium italic">Inspire</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/books">
                <Button size="lg" className="min-w-[160px] group">
                  Browse
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Description offset */}
          <div
            ref={rightRef}
            className={cn(
              "lg:col-span-4 lg:col-start-8 lg:mt-32 animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <div className="border-l border-border pl-6">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Curated books for curious minds. Explore our collection of bestsellers,
                new releases, and timeless classics.
              </p>
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <span className="block text-2xl font-light text-foreground">500+</span>
                  <span className="text-muted-foreground">Titles</span>
                </div>
                <div>
                  <span className="block text-2xl font-light text-foreground">12</span>
                  <span className="text-muted-foreground">Categories</span>
                </div>
                <div>
                  <span className="block text-2xl font-light text-foreground">2k+</span>
                  <span className="text-muted-foreground">Readers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="hidden lg:block lg:col-span-1 lg:col-start-12 self-end pb-16">
            <div className="w-px h-32 bg-border mx-auto" />
            <span className="block text-xs text-muted-foreground mt-4 writing-mode-vertical transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
