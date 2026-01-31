import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
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
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-lg font-medium tracking-tight text-foreground z-50 relative"
            >
              stnbeteglobal
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors relative",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-foreground" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cart">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Link to="/admin">
                <Button variant="outline" size="sm" className="ml-2 text-xs font-mono">
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-md transition-colors z-50 relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="flex flex-col p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "py-4 text-lg transition-colors border-b border-border/20 last:border-b-0",
                    location.pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-border/20">
                <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Cart">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="text-sm font-mono">
                    Admin
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;