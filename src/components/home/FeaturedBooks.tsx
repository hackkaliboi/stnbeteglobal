import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard, { Book } from "@/components/books/BookCard";
import { ArrowRight } from "lucide-react";

// Sample featured books data
const featuredBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Creative Writing",
    author: "Sarah Mitchell",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Writing",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "2",
    title: "Journey Through Time",
    author: "Michael Chen",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Fiction",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "3",
    title: "Mindful Living",
    author: "Emma Thompson",
    price: 16.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Self-Help",
    isNew: true,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "4",
    title: "The Silent Observer",
    author: "James Wilson",
    price: 21.99,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    category: "Mystery",
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
];

const FeaturedBooks = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Books
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Handpicked selections from our collection that we think you'll love.
            </p>
          </div>
          <Link to="/books" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
