import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malik Car Rent Chandigarh | Best Car Rental Service",
  description:
    "Book affordable car rentals in Chandigarh with Malik Car Rent. Choose from hatchbacks, sedans, and SUVs with easy booking, professional service, and doorstep delivery.",
  keywords: [
    "Malik Car Rent",
    "car rental Chandigarh",
    "rent car Chandigarh",
    "SUV rental Chandigarh",
    "cheap car hire Chandigarh",
    "car rental service in Chandigarh",
    "car hire Chandigarh",
    "affordable cars Chandigarh",
  ],
  authors: [{ name: "Malik Car Rent Chandigarh" }],
  openGraph: {
    title: "Malik Car Rent Chandigarh",
    description:
      "Reliable and affordable car rental service in Chandigarh. Hatchbacks, sedans, and SUVs available. Book now with Malik Car Rent!",
    url: "https://yourdomain.com",
    siteName: "Malik Car Rent Chandigarh",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Malik Car Rent Chandigarh Fleet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  metadataBase: new URL("https://malikcarrent.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
