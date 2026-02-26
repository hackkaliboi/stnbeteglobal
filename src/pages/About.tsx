import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPageContent } from "@/lib/cms";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const defaultContent = {
  hero: {
    title: "About STNBETE Global",
    subtitle:
      "We are on a mission to rebuild society through multifaceted wisdom — connecting people with resources that inspire, educate, and transform.",
  },
  mission: {
    title: "Our Mission",
    description:
      "STNBETE Global is a platform rooted in leadership development, mentorship, and life-transforming resources. We believe the right knowledge, placed in the right hands, can change communities and reshape destinies.",
    stats: {
      readers: "2k+",
      books: "500+",
      years: "15",
    },
  },
};

const AUTHOR_IMAGE = "/images/author.jpg"; // drop your photo at public/images/author.jpg

const galleryImages = [
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.46 (1).jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.46 (2).jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.46 (3).jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.46.jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.47 (1).jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.47 (2).jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.47.jpeg",
  "/stn-images/WhatsApp Image 2026-02-26 at 10.29.48.jpeg"
];

const About = () => {
  const [content, setContent] = useState<any>(defaultContent);
  const [authorImgError, setAuthorImgError] = useState(false);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: authorRef, isVisible: authorVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageData = await getPageContent("/about");
        if (pageData?.content) {
          setContent((prev: any) => ({ ...prev, ...pageData.content }));
        }
      } catch (error) {
        console.error("Failed to load about content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-background via-blue-50 to-blue-100 dark:from-background dark:via-blue-950/50 dark:to-blue-900/30 pt-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-16">

            {/* Left — text */}
            <div
              ref={heroRef}
              className={cn("animate-on-scroll-left", heroVisible && "is-visible")}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-6">
                <BookOpen className="h-3.5 w-3.5" />
                Our Story
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-[0.95] tracking-tight mb-8">
                {content.hero.title}
              </h1>

              <p className="text-muted-foreground text-xl max-w-xl leading-relaxed font-light mb-10">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Leadership Development
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Mentorship
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Consultancy
                </div>
              </div>
            </div>

            {/* Right — portrait */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-96 lg:w-[360px] lg:h-[500px] shrink-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600 rounded-3xl opacity-25" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-muted shadow-2xl">
                  {!authorImgError ? (
                    <img
                      src={AUTHOR_IMAGE}
                      alt="Saturday T. Nbete"
                      className="w-full h-full object-cover object-top"
                      onError={() => setAuthorImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 gap-4">
                      <span className="text-7xl font-light text-white tracking-widest select-none">STN</span>
                      <span className="text-blue-200 text-xs font-mono uppercase tracking-widest">Saturday T. Nbete</span>
                    </div>
                  )}
                  {/* Name overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                    <p className="text-white font-medium text-sm">Saturday T. Nbete</p>
                    <p className="text-white/70 text-xs">Founder & Executive Director</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* ── Meet the Author ── */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={authorRef}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center animate-on-scroll-up",
              authorVisible && "is-visible"
            )}
          >
            {/* Portrait */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-96 lg:w-80 lg:h-[480px] shrink-0">
                {/* Decorative offset frame */}
                <div className="absolute -inset-3 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600 rounded-3xl opacity-30" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-muted shadow-2xl">
                  {!authorImgError ? (
                    <img
                      src={AUTHOR_IMAGE}
                      alt="Saturday T. Nbete"
                      className="w-full h-full object-cover object-top"
                      onError={() => setAuthorImgError(true)}
                    />
                  ) : (
                    /* Initials fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900">
                      <span className="text-7xl font-light text-white tracking-wider select-none">
                        STN
                      </span>
                      <span className="text-blue-200 text-sm mt-3 font-mono uppercase tracking-widest">
                        Author
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
                About the Author
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight tracking-tight">
                Saturday T. Nbete
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed border-l-2 border-border pl-5">
                Founder of STNBETE Global and a passionate advocate for
                leadership development and societal transformation.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                With over 15 years of experience in mentorship, consultancy,
                and publishing, Saturday has dedicated his life to equipping
                individuals with the wisdom and tools they need to excel —
                in business, in leadership, and in life.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                His works span leadership principles, personal development,
                and faith-based growth — each crafted to challenge readers
                to rise above mediocrity and fulfil their God-given potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Gallery ── */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-4">
              Gallery
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-tight">
              Dr. Saturday T. Nbete in Action
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className={cn(
                  "relative group overflow-hidden rounded-2xl bg-muted aspect-[3/4]",
                  index === 0 && "md:col-span-2 md:row-span-2 aspect-[3/4] md:aspect-auto", // Make first one larger
                  index === 4 && "md:col-span-2 aspect-[3/4] md:aspect-[3/2]" // Make 5th one wide
                )}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={src}
                  alt={`Dr. Nbete Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border border-border rounded-2xl p-10 md:p-14">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
                Browse Our Resources
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/books">
                <Button size="lg" className="min-w-[160px] group">
                  View Books
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
