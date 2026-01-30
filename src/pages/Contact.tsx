import MainLayout from "@/components/layout/MainLayout";
import ContactSection from "@/components/home/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const Contact = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <div className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      Book a Consultation or Speaking Engagement
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in booking the author for a speaking engagement, book signing,
                      or literary consultation? Fill out the contact form below with your request
                      details and we'll get back to you within 48 hours.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Typical response time: 24-48 hours</span>
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
      <section className="h-64 md:h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Map Integration Coming Soon</p>
            <p className="text-sm text-muted-foreground mt-2">
              123 Book Street, Reading City, RC 12345
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
