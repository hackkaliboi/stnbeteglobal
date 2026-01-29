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
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Integrate with backend
    setIsSubmitted(true);
    toast({
      title: "Successfully subscribed",
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={cn(
            "max-w-xl mx-auto text-center animate-on-scroll",
            isVisible && "is-visible"
          )}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-background/60 mb-3 block">
            Newsletter
          </span>
          
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Stay Updated
          </h2>
          
          <p className="text-background/70 mb-8">
            Subscribe for new releases, author interviews, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
              required
            />
            <Button 
              type="submit" 
              size="lg" 
              variant="secondary"
              className="min-w-[140px] group"
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
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
