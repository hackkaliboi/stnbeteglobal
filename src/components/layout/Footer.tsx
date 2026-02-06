import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSiteSettings } from "@/lib/cms";

const Footer = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAllSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load footer settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const currentYear = new Date().getFullYear();
  const siteName = settings.site_name || "stnbeteglobal";
  const siteDescription = settings.site_description || "Curated books for curious minds. Discover your next favorite read from our collection of bestsellers and timeless classics.";
  const contactEmail = settings.contact_email || "hello@stnbeteglobal.com";
  const footerText = settings.footer_text || `© ${currentYear} ${siteName}`;

  return (
    <footer className="bg-brand-navy border-t border-brand-navy text-white">
      <div className="container mx-auto py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand - Large */}
          <div className="lg:col-span-4">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white">
              STNBETE
            </Link>
            <p className="text-gray-300 mt-4 max-w-sm leading-relaxed">
              Rebuilding Society Through Multifaceted Wisdom.
              Leadership Development, Mentorship, and Life-transforming Resources.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social Links */}
              <a href="#" className="text-white hover:text-brand-purple transition-colors" title="Facebook">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-brand-purple transition-colors" title="YouTube">
                YouTube
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-mono">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/books" className="text-sm text-gray-300 hover:text-white transition-colors">
                Books
              </Link>
              <Link to="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-mono">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Email</span>
                <div className="flex flex-col gap-1">
                  <a href="mailto:stnbete@yahoo.com" className="hover:text-white transition-colors">stnbete@yahoo.com</a>
                  <a href="mailto:satnbete@gmail.com" className="hover:text-white transition-colors">satnbete@gmail.com</a>
                </div>
              </div>
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Phone</span>
                <a href="tel:+2347034546060" className="hover:text-white transition-colors">
                  +234 703 454 6060
                </a>
              </div>
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Website</span>
                <a href="https://www.stnbeteglobal.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  www.stnbeteglobal.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-mono">
            © {currentYear} STNBETE Global. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
