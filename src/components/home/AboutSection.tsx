import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left - Large typography */}
          <div
            ref={leftRef}
            className={cn(
              "lg:col-span-5 animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block font-mono">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
              More than<br />
              just a<br />
              <span className="italic">bookstore</span>
            </h2>
          </div>

          {/* Right - Content offset */}
          <div
            ref={rightRef}
            className={cn(
              "lg:col-span-5 lg:col-start-8 lg:pt-24 animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded with a passion for literature, BookHaven is a sanctuary for book lovers. 
                We believe in the power of stories to transform minds and connect hearts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our carefully curated collection spans genres and generations, from contemporary 
                bestsellers to timeless classics. Every book on our shelves is chosen with care.
              </p>
              
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-3xl font-light text-foreground block">10+</span>
                    <span className="text-sm text-muted-foreground">Years of service</span>
                  </div>
                  <div>
                    <span className="text-3xl font-light text-foreground block">50k+</span>
                    <span className="text-sm text-muted-foreground">Books sold</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/about" 
                className="inline-flex items-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group pt-4"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
