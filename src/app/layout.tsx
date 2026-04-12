import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "StartupMedia — Stories That Inspire Builders",
    template: "%s | StartupMedia",
  },
  description:
    "StartupMedia is where startup journeys, failures, and breakthroughs come to life. Real stories from real founders.",
  keywords: ["startup", "stories", "founder", "entrepreneurship", "tech"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "StartupMedia — Stories That Inspire Builders",
    description:
      "Real startup stories from real founders. Journeys, failures, and breakthroughs.",
    type: "website",
  },
};

import CustomCursor from "@/components/CustomCursor";
import SearchModal from "@/components/SearchModal";
import SmoothScrolling from "@/components/SmoothScrolling";
import WelcomeSplash from "@/components/WelcomeSplash";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <WelcomeSplash />
        <CustomCursor />
        <SearchModal />
        <SmoothScrolling>
          <div className="app-reveal">
            <NavBar />
            <main>{children}</main>
            <Footer />
          </div>
        </SmoothScrolling>
      </body>
    </html>
  );
}
