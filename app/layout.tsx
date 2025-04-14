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

const baseUrl = "https://malikcarrent.com"; // Replace with your actual domain

export const metadata: Metadata = {
  title: "Malik Car Rent Chandigarh | Best Car Rental Service Near You",
  description:
    "Malik Car Rent offers affordable and reliable car rental services in Chandigarh. Book hatchbacks, sedans, or SUVs with hassle-free online booking, 24/7 support, and on-time delivery.",
  keywords: [
    "Malik Car Rent Chandigarh",
    "Car Rental Chandigarh",
    "Rent a Car Chandigarh",
    "Self Drive Car Chandigarh",
    "Affordable Car Hire",
    "SUV Rental Chandigarh",
    "Hatchback Rent Chandigarh",
    "Luxury Car Rent Chandigarh",
    "Car Booking Near Me",
    "Car Rental Mohali Panchkula",
  ],
  metadataBase: new URL(baseUrl),
  authors: [{ name: "Malik Car Rent", url: baseUrl }],
  openGraph: {
    title: "Malik Car Rent Chandigarh | Best Car Rental Deals",
    description:
      "Explore Chandigarh with Malik Car Rent. Best-in-class service, transparent pricing, and a wide range of cars. Book your ride now!",
    url: baseUrl,
    siteName: "Malik Car Rent Chandigarh",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Malik Car Rent Chandigarh",
    description:
      "Book top-quality car rentals in Chandigarh with Malik Car Rent. Affordable pricing, all vehicle types available. Book online in minutes!",
    site: "@MalikCarRent",
    creator: "@MalikCarRent",
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  category: "Car Rental Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Uncomment and insert your site verification keys below if needed */}
        {/* <meta name="google-site-verification" content="your-code" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
