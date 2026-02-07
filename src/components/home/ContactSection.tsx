import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, MapPin, Mail, Phone, Clock } from "lucide-react";
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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border" id="contact">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Header & Info */}
          <div
            ref={leftRef}
            className={cn(
              "lg:col-span-5 animate-on-scroll-left",
              leftVisible && "is-visible"
            )}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block font-mono">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground leading-[1.1] mb-8">
              Let's<br />
              <span className="italic">connect</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-mono">Location</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  www.stnbeteglobal.com
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-mono">Hours</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mon–Fri: 9am–8pm<br />
                  Sat–Sun: 10am–6pm
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground mb-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-mono">Email</span>
                </div>
                <a
                  href="mailto:hello@stnbeteglobal.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@stnbeteglobal.com
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground mb-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-mono">Phone</span>
                </div>
                <a
                  href="tel:+2347034546060"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +234 703 454 6060
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            ref={rightRef}
            className={cn(
              "lg:col-span-5 lg:col-start-8 animate-on-scroll-right",
              rightVisible && "is-visible"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider font-mono">Name</Label>
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
                <Label htmlFor="email" className="text-xs uppercase tracking-wider font-mono">Email</Label>
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
                <Label htmlFor="message" className="text-xs uppercase tracking-wider font-mono">Message</Label>
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
