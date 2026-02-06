
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSiteSetting } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteName, setSiteName] = useState("STNBETE");
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch site name
  useEffect(() => {
    getSiteSetting("site_name").then((name) => {
      if (name) setSiteName(name);
    });
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isMenuOpen
            ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
            : "bg-background/80 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-navy z-50 relative hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="hidden sm:block text-brand-navy dark:text-white">{siteName}</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full relative",
                    location.pathname === link.href
                      ? "text-foreground bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-secondary"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-secondary relative"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>

              <div className="w-px h-6 bg-border mx-2" />

              <ThemeToggle />

              <div className="w-px h-6 bg-border mx-2" />

              {user ? (
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm" className="rounded-full px-4 ml-2">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>

              <button
                className="p-2 text-foreground hover:bg-secondary rounded-full transition-colors z-50 relative"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-xl overflow-hidden">
            <nav className="flex flex-col p-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center py-3 px-4 text-base font-medium transition-colors rounded-xl",
                      location.pathname === link.href
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" aria-label="Cart">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <ThemeToggle />
                </div>

                <div className="flex items-center gap-2">
                  {user ? (
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="secondary" className="rounded-full gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="rounded-full gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

            </nav>
          </div>
        </div>
      )}


    </>
  );
};

export default Header;