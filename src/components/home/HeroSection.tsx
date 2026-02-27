import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getPageContent } from "@/lib/cms";
import { useTheme } from "next-themes";

import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();

  const [heroContent, setHeroContent] = useState({
    title: "Rebuilding Society\nThrough Multifaceted Wisdom",
    cta_text: "Browse Resources",
    cta_link: "/books",
    secondary_cta_text: "Our Story",
    secondary_cta_link: "/about",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageData = await getPageContent("/");
        if (pageData?.content?.hero) {
          setHeroContent((prev) => ({ ...prev, ...pageData.content.hero }));
        }
      } catch (error) {
        console.error("Failed to load hero content:", error);
      }
    };
    fetchContent();
  }, []);

  const renderTitle = (title: string) =>
    title.split("\n").map((part, i) => (
      <span key={i} className="block">
        {part}
      </span>
    ));

  // Match the header convention: logo-dark for dark theme, logo-light for light theme
  const watermarkLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blue-50 to-blue-100 dark:from-background dark:via-blue-950/50 dark:to-blue-900/30 pt-20 overflow-hidden">

      {/* Watermark logo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src={watermarkLogo}
          alt=""
          className="w-[90vw] max-w-5xl object-contain opacity-[0.20] dark:opacity-[0.16] select-none"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center text-center gap-10 animate-on-scroll-up",
            isVisible && "is-visible"
          )}
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight">
            {renderTitle(heroContent.title)}
          </h1>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <Link to="/leadership" className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Leadership
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/development" className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Development
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Mentorship
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/life-transforming-resources" className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Life-transforming Resources
            </Link>
          </div>

          {/* CTAs */}
          <div className="flex flex-col justify-center">
            <Link to={heroContent.secondary_cta_link}>
              <Button size="lg" variant="outline" className="min-w-[160px]">
                {heroContent.secondary_cta_text}
              </Button>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="flex flex-col items-center gap-2 mt-8 opacity-40">
            <div className="w-px h-12 bg-foreground" />
            <span className="text-xs uppercase tracking-widest text-foreground font-mono">
              scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
