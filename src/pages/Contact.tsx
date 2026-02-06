import MainLayout from "@/components/layout/MainLayout";
import ContactSection from "@/components/home/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Mail, Phone, MapPin, Facebook, Youtube, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { getPageContent } from "@/lib/cms";

// Default content fallback
const defaultContent = {
  hero: {
    title: "Contact Us",
    subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
  },
  contact_info: {
    email_1: "stnbete@yahoo.com",
    email_2: "satnbete@gmail.com",
    phone: "+2347034546060",
    website: "www.stnbeteglobal.com",
    facebook: "Saturday Tormaaa Nbete",
    youtube: "Saturday T. Nbete",
    hours: "Mon-Fri 9AM-6PM"
  }
};

const Contact = () => {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageData = await getPageContent('/contact');
        if (pageData && pageData.content) {
          setContent((prev: any) => ({ ...prev, ...pageData.content }));
        }
      } catch (error) {
        console.error("Failed to load contact content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-background via-brand-ivory to-white dark:from-background dark:via-gray-900/50 dark:to-gray-900/30 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
                {content.hero?.label || "Get In Touch"}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight mb-6">
                {content.hero.title}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                  <span>{content.hero?.badge_1 || "Quick Response"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                  <span>{content.hero?.badge_2 || "Expert Support"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                  <span>{content.hero?.badge_3 || "Book Consultations"}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 border border-brand-navy/10 shadow-lg">
                <h3 className="text-xl font-medium text-brand-navy dark:text-white mb-6">
                  {content.contact_info?.header || "Reach Out"}
                </h3>
                <div className="space-y-6">
                  {/* Digital Channels */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Digital Attributes</h4>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center mt-1">
                        <Mail className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {content.contact_info?.email_label || "Email"}
                        </div>
                        <a href={`mailto:${content.contact_info.email_1}`} className="block text-brand-navy font-medium hover:underline">{content.contact_info.email_1}</a>
                        <a href={`mailto:${content.contact_info.email_2}`} className="block text-brand-navy font-medium hover:underline">{content.contact_info.email_2}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center mt-1">
                        <Globe className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {content.contact_info?.website_label || "Website"}
                        </div>
                        <a href={`https://${content.contact_info.website}`} target="_blank" rel="noreferrer" className="text-brand-navy font-medium hover:underline">
                          {content.contact_info.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Social Media</h4>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center">
                        <Facebook className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Facebook</div>
                        <span className="text-brand-navy font-medium">{content.contact_info.facebook_handle || content.contact_info.facebook}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center">
                        <Youtube className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">YouTube</div>
                        <span className="text-brand-navy font-medium">{content.contact_info.youtube_handle || content.contact_info.youtube}</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone & Hours */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center">
                        <Phone className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {content.contact_info?.phone_label || "Phone"}
                        </div>
                        <a href={`tel:${content.contact_info.phone}`} className="text-brand-navy font-medium hover:underline">{content.contact_info.phone}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center">
                        <Clock className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {content.contact_info?.hours_label || "Hours"}
                        </div>
                        <div className="text-brand-navy font-medium">{content.contact_info.hours}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-brand-ivory/30 border-brand-navy/10">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-navy/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-brand-navy mb-2">
                      {content.booking?.title || "Book a Consultation or Speaking Engagement"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {content.booking?.description || "Interested in booking the author for a speaking engagement, book signing, or literary consultation? Fill out the contact form below with your request details."}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{content.booking?.response_time || "Typical response time: 24-48 hours"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Map Placeholder */}
      <section className="h-64 md:h-96 bg-muted relative grayscale">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground font-medium">Headquarters</p>
            <p className="text-sm text-muted-foreground mt-1">
              Serving Global Clients
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
export default Contact;
