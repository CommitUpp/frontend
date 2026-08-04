import type { Metadata } from "next";
import Header from "./components/Header/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { WatchTogetherProvider } from "@/contexts/WatchTogetherContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheater",
  description: "映画をみんなで楽しむためのサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          <WatchTogetherProvider>
            {children}
          </WatchTogetherProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
