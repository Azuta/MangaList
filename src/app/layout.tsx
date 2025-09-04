import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/media/Style/mediaStyle.css";
import RootProviders from "@/components/container/RootProvider";
import { MediaProvider } from "@/context/mediaContext";
import { Poppins } from "next/font/google";

// Usamos next/font/google para Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anilist",
  description: "My Anilist clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RootProviders>
          <MediaProvider>{children}</MediaProvider>
        </RootProviders>
      </body>
    </html>
  );
}
