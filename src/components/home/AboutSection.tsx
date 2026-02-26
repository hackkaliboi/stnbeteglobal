import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AUTHOR_IMAGE = "/images/author.jpg";

const AboutSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Author portrait ── */}
          <div
            ref={leftRef}
            className={cn(
              "flex justify-center lg:justify-end animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <div className="relative w-72 h-96 lg:w-80 lg:h-[500px] shrink-0">
              {/* Decorative offset frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600 rounded-3xl opacity-25" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-muted shadow-2xl">
                {!imgError ? (
                  <img
                    src={AUTHOR_IMAGE}
                    alt="Saturday T. Nbete"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 gap-3">
                    <span className="text-7xl font-light text-white tracking-widest select-none">
                      STN
                    </span>
                    <span className="text-blue-200 text-xs font-mono uppercase tracking-widest">
                      Author
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Bio text ── */}
          <div
            ref={rightRef}
            className={cn(
              "space-y-6 animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
              About the Author
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05] tracking-tight">
              Saturday T.<br />
              <span className="italic">Nbete</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-border pl-5">
              Founder of STNBETE Global and a passionate advocate for
              leadership development and societal transformation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              With over 15 years of experience in mentorship, consultancy,
              and publishing, Saturday has dedicated his life to equipping
              individuals with the wisdom and tools they need to excel —
              in business, in leadership, and in life.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-8 border-t border-border">
              <div>
                <span className="text-3xl font-light text-foreground block">500+</span>
                <span className="text-sm text-muted-foreground">Resources published</span>
              </div>
              <div>
                <span className="text-3xl font-light text-foreground block">15+</span>
                <span className="text-sm text-muted-foreground">Years of impact</span>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group pt-2"
            >
              Read full story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
