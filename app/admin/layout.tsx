import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | HTC Fire Qatar',
  description: 'HTC Fire Qatar Administration Panel',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Suppress public MAZ chatbot inside admin panel */}
      <style>{`
        #maz-launcher-btn, #maz-teaser-wrapper {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  );
}
