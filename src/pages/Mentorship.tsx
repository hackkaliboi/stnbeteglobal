import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Mentorship = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">Mentorship</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Content coming soon.
                </p>
            </div>
        </MainLayout>
    );
};

export default Mentorship;
