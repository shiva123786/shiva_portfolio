import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Kethavath Shiva — AI & Data Science Engineer",
  description:
    "Portfolio of Kethavath Shiva, an AI & Data Science engineer building machine learning, generative AI, computer vision, and full-stack systems.",
  keywords: ["Kethavath Shiva", "AI Engineer", "Machine Learning", "Data Science", "Full Stack", "Portfolio"],
  openGraph: {
    title: "Kethavath Shiva — AI & Data Science Engineer",
    description: "Machine learning, generative AI, computer vision, and full-stack engineering projects.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
