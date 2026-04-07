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
  openGraph: {
    title: "StartupMedia — Stories That Inspire Builders",
    description:
      "Real startup stories from real founders. Journeys, failures, and breakthroughs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
