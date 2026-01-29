import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Integrate with backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 md:py-32 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Info */}
          <div
            ref={leftRef}
            className={cn(
              "animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Have questions or want to book a consultation? We'd love to hear from you.
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Address</span>
                <p className="text-foreground mt-1">123 Book Street, Reading City, RC 12345</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Email</span>
                <p className="text-foreground mt-1">hello@bookhaven.com</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Phone</span>
                <p className="text-foreground mt-1">+1 (234) 567-8900</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Hours</span>
                <p className="text-foreground mt-1">Mon – Sat: 9AM – 8PM</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            ref={rightRef}
            className={cn(
              "animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-12 border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="h-12 border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-wider">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={5}
                  className="border-border resize-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 group" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
