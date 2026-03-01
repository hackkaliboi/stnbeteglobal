import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const AUTHOR_IMAGE = "/stnbete.jpeg";

const AboutSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

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
                <img
                  src={AUTHOR_IMAGE}
                  alt="Saturday T. Nbete"
                  className="w-full h-full object-cover object-top"
                />
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
              S. T. Nbete is an international conference speaker, author, and leadership mentor recognised for his insightful teaching and passion for personal and organisational growth. He is the Executive Director of STNBETEBOOKS & RESOURCES, which provides mentorship and consultancy to leaders and institutions across diverse fields.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              With a background in theology and leadership, Dr. Nbete has earned degrees up to the doctoral level in New Testament Studies. He has also served in various leadership and advisory roles that span education, faith communities, and organisational development. 
              An accomplished writer, he has authored several bestselling books that inspire transformation, renewal, and effective leadership.
              He is married to Baridole, a professional accountant, and together with their family, they live in Port Harcourt, Nigeria

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
