import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import AboutSection from "@/components/home/AboutSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import WhatsAppButton from "@/components/home/WhatsAppButton";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedBooks />
      <AboutSection />
      <NewsletterSection />
      <ContactSection />
      <WhatsAppButton />
    </MainLayout>
  );
};

export default Index;
