import { Merriweather, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import config from "@/lib/config";

const serif = Merriweather({
  variable: "--font-serif",
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono", // Updated to match tailwind config expectation of standard naming if desired, or keep as is. Tailwind config has var(--font-mono).
  subsets: ["latin"],
});

export const metadata = {
  title: config.site.title,
  description: config.site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
