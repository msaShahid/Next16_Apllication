import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Onest } from 'next/font/google';
import "./globals.css";
import AuthBootstrap from "@/components/AuthBootstrap";

const onest = Onest({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Gen AI",
  description: "Gen AI by Shahid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-gray-100 dark:bg-dark-secondary min-h-screen flex flex-col ${onest.className}`}>
        <AuthBootstrap>
          <ThemeProvider disableTransitionOnChange>

            <div className="isolate flex flex-col flex-1">
              {children}
            </div>

          </ThemeProvider>
        </AuthBootstrap>
      </body>
    </html>
  );
}
