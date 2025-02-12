import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Suspense } from "react";
import Loader from "./components/loader/Loader";
import ReduxProvider from "@/shared/providers/ReduxProvider";
import { ThemeProvider } from "./components/theme-provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carmix - Experience Automotive Excellence",
  description:
    "Discover the finest selection of luxury, performance, and eco-friendly vehicles at Carmix.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
            <ReduxProvider>
              <Header />
              <Suspense fallback={<Loader />}>
                <main>{children}</main>
              </Suspense>
              <Footer />
            </ReduxProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
