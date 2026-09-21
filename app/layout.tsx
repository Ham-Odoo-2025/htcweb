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
        <Script
          id="maz-htc-fire-chips"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateTeaserChips() {
                  var teaserChips = document.getElementById("maz-teaser-chips");
                  if (teaserChips) {
                    var chip1 = teaserChips.querySelector('[data-q*="Maifelz"], [data-q*="Services"]');
                    if (chip1) {
                      chip1.setAttribute("data-q", "What services does HTC Fire provide?");
                      chip1.innerHTML = "⚡ HTC Fire Services";
                    }
                    var chip2 = teaserChips.querySelector('[data-q*="Odoo"]');
                    if (chip2) {
                      chip2.setAttribute("data-q", "Tell me about Fire Alarm Systems & QCDD Approval");
                      chip2.innerHTML = "🚨 Fire Alarm & QCDD";
                    }
                    var chip3 = teaserChips.querySelector('[data-q*="consultation"]');
                    if (chip3) {
                      chip3.setAttribute("data-q", "Request Fire Safety AMC Maintenance Quote");
                      chip3.innerHTML = "📅 AMC Quotation";
                    }
                    var teaserName = document.getElementById("maz-teaser-name");
                    if (teaserName && teaserName.textContent.indexOf("Maifelz") !== -1) {
                      teaserName.textContent = "HTC Fire Qatar Support";
                    }
                  }
                }
                var observer = new MutationObserver(function() {
                  updateTeaserChips();
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
                window.addEventListener("DOMContentLoaded", updateTeaserChips);
                window.addEventListener("load", updateTeaserChips);
                setTimeout(updateTeaserChips, 600);
                setTimeout(updateTeaserChips, 1500);
                setTimeout(updateTeaserChips, 3000);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

