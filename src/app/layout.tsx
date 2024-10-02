import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notSansJp.className} h-screen`}>{children}</body>
    </html>
  );
}
