import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileStickyBookBar from '@/components/MobileStickyBookBar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living & Boutique Hostel';
const hostelCity = process.env.NEXT_PUBLIC_HOSTEL_CITY || 'Bengaluru';
const hostelState = process.env.NEXT_PUBLIC_HOSTEL_STATE || 'Karnataka';

export const metadata: Metadata = {
  title: `${hostelName} | Luxury Boutique Hostel in ${hostelCity}, ${hostelState}`,
  description:
    'Experience 5-star hotel luxury with student co-living in Indiranagar, Bengaluru. Air-conditioned rooms, 5G Wi-Fi, 3-tier security, 3 gourmet meals daily, and 24/7 study pods.',
  keywords: [
    'Hostel in Indiranagar Bengaluru',
    'Luxury PG in Bengaluru',
    'Boutique Hostel Bangalore',
    'Student PG with AC and Wi-Fi',
    'Co-Living space Indiranagar',
    'Best hostel for college students',
  ],
  openGraph: {
    title: hostelName,
    description: 'Redefining student and young professional living in Bengaluru.',
    url: 'https://auraluxuryhostel.com',
    siteName: hostelName,
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: hostelName,
    description: 'Luxury Boutique Hostel and Co-Living Space for students and young professionals in Bengaluru.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 402, 100 Feet Road, Indiranagar',
      addressLocality: hostelCity,
      addressRegion: hostelState,
      postalCode: '560038',
      addressCountry: 'IN',
    },
    telephone: process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+91 98765 43210',
    priceRange: '₹8,500 - ₹32,000 INR',
    rating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '450',
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-navy-900 text-slate-100 pb-20 md:pb-0">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <MobileStickyBookBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
