import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getPageContent } from "@/lib/cms";

const HeroSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();
  const [heroContent, setHeroContent] = useState({
    title: "Rebuilding Society\nThrough Multifaceted Wisdom",
    subtitle: "Leadership Development • Mentorship • Life-transforming Resources • Consultancy",
    cta_text: "Browse Resources",
    cta_link: "/books",
    secondary_cta_text: "Our Story",
    secondary_cta_link: "/about",
    image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    stats_titles: "500+",
    stats_categories: "4",
    stats_readers: "2k+"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageData = await getPageContent('/');
        if (pageData && pageData.content && pageData.content.hero) {
          setHeroContent(prev => ({ ...prev, ...pageData.content.hero }));
        }
      } catch (error) {
        console.error("Failed to load hero content:", error);
      }
    };
    fetchContent();
  }, []);

  // Helper to process newlines in title for existing design
  const renderTitle = (title: string) => {
    if (!title.includes('\n')) return title;
    const parts = title.split('\n');
    return (
      <>
        {parts[0]}
        <br />
        {parts[1]}
        {parts[2] && <br />}
        {parts[2] && <span className="font-medium italic text-blue-600 dark:text-blue-400">{parts[2]}</span>}
      </>
    );
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-background via-blue-50 to-blue-100 dark:from-background dark:via-blue-950/50 dark:to-blue-900/30 pt-20 lg:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout - Centered */}
        <div className="lg:hidden text-center py-12 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
          <div className="opacity-100 space-y-6">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
              Independent Bookstore
            </span>

            <h1 className="text-4xl md:text-5xl font-light text-foreground leading-[0.95] tracking-tight">
              {/* Simple render for mobile or dynamic title logic if needed */}
              {heroContent.title.replace('\n', ' ')}
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
              {heroContent.subtitle}
            </p>

            {/* Mobile Book Image */}
            <div className="relative mx-auto w-64 h-80">
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl transform rotate-3"
                style={{ borderRadius: '30px 0 30px 0' }}
              />
              <div
                className="relative bg-white dark:bg-gray-800 shadow-xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                style={{ borderRadius: '30px 0 30px 0' }}
              >
                <img
                  src={heroContent.image_url}
                  alt="Featured Book"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-sm mb-1">Featured Collection</h3>
                  <p className="text-xs opacity-90">New arrivals weekly</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-20">
              <Link to={heroContent.cta_link}>
                <Button size="lg" className="min-w-[160px] group">
                  {heroContent.cta_text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to={heroContent.secondary_cta_link}>
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  {heroContent.secondary_cta_text}
                </Button>
              </Link>
            </div>

            {/* Mobile Stats */}
            <div className="flex items-center justify-center gap-8 text-sm relative z-20">
              <div className="text-center">
                <span className="block text-2xl font-light text-foreground">{heroContent.stats_titles}</span>
                <span className="text-muted-foreground">Titles</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-light text-foreground">{heroContent.stats_categories}</span>
                <span className="text-muted-foreground">Categories</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-light text-foreground">{heroContent.stats_readers}</span>
                <span className="text-muted-foreground">Readers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(100vh-4rem)] py-8 lg:py-0">
          {/* Left Content - Offset to the left */}
          <div
            ref={leftRef}
            className={cn(
              "col-span-5 col-start-1 animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
              Independent Bookstore
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground leading-[0.95] tracking-tight mb-8">
              {renderTitle(heroContent.title)}
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={heroContent.cta_link}>
                <Button size="lg" className="min-w-[160px] group">
                  {heroContent.cta_text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to={heroContent.secondary_cta_link}>
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  {heroContent.secondary_cta_text}
                </Button>
              </Link>
            </div>
          </div>

          {/* Center - Book Image */}
          <div className="col-span-3 col-start-6 flex justify-center">
            <div
              ref={rightRef}
              className={cn(
                "relative animate-on-scroll-up",
                rightVisible && "is-visible"
              )}
            >
              <div className="relative w-64 h-80">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl transform rotate-6"
                  style={{ borderRadius: '40px 0 40px 0' }}
                />
                <div
                  className="relative bg-white dark:bg-gray-800 shadow-xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                  style={{ borderRadius: '40px 0 40px 0' }}
                >
                  <img
                    src={heroContent.image_url}
                    alt="Featured Book"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="font-semibold text-lg mb-2">Featured Collection</h3>
                    <p className="text-sm opacity-90">Discover new arrivals and bestsellers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Description offset */}
          <div
            className={cn(
              "col-span-3 col-start-10 mt-32 animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <div className="border-l border-border pl-6">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {heroContent.subtitle}
              </p>
              <div className="flex flex-col gap-4 text-sm">
                <div>
                  <span className="block text-2xl font-light text-foreground">{heroContent.stats_titles}</span>
                  <span className="text-muted-foreground">Titles</span>
                </div>
                <div>
                  <span className="block text-2xl font-light text-foreground">{heroContent.stats_categories}</span>
                  <span className="text-muted-foreground">Categories</span>
                </div>
                <div>
                  <span className="block text-2xl font-light text-foreground">{heroContent.stats_readers}</span>
                  <span className="text-muted-foreground">Readers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="col-span-1 col-start-12 self-end pb-16">
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
