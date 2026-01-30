import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);
    toast({
      title: "Successfully subscribed",
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto">
        <div
          ref={sectionRef}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-12 animate-on-scroll",
            sectionVisible && "is-visible"
          )}
        >
          {/* Left content */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-background/60 mb-4 block font-mono">
              Newsletter
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1]">
              Stay in the<br />
              <span className="italic">loop</span>
            </h2>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <div className="w-full">
              <p className="text-background/70 mb-6">
                Get weekly recommendations, new arrivals, and exclusive offers delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="group min-w-[140px]"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Done
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-background/50 mt-4">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
