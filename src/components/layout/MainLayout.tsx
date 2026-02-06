import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

import ChatButton from "../common/ChatButton";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default MainLayout;
