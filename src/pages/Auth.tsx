import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const Auth = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (user) {
            const from = (location.state as any)?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    return (
        <MainLayout>
            <div className="container mx-auto flex items-center justify-center min-h-[60vh] py-10">
                <div className="w-full max-w-md">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">Please sign in to continue accessing your account.</p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full"
                        >
                            Sign In / Sign Up
                        </Button>
                    </div>
                </div>
            </div>
            <AuthModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </MainLayout>
    );
};

export default Auth;
