import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://htc-fire.com'),
  title: {
    default: 'Fire Alarm & Fire Fighting Company | Doha Qatar | HTC Fire',
    template: '%s | HTC Fire Qatar',
  },
  description:
    'Hamilton Trading & Contracting (HTC Fire) is a leading A-Grade QCDD Civil Defence approved fire alarm and fire fighting contractor in Doha Qatar.',
  keywords: [
    'Fire Protection Company in Qatar',
    'Fire Alarm System Qatar',
    'Fire Fighting System Contractor Qatar',
    'QCDD Approved Fire Contractor Doha',
    'Fire Extinguisher Supplier Qatar',
    'Fire Alarm AMC Qatar',
    'MEP Contractor Qatar',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
        <Script
          src="https://ai.maifelz.com/maz.js"
          data-bot-id="maz_520be52f0376"
          data-api-host="https://maz-backend-t1hy.onrender.com"
          data-teaser-text="I am hot! 🔥 Pls ask me 😊"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

