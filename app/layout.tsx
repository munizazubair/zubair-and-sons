// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'Zubair & Sons',
//   description: 'Installment Recovery Management System',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=JetBrains+Mono:wght@100..800&family=Space+Grotesk:wght@300..700&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet" />
//       </head>
//       <body>{children}</body>
//     </html>
//   )
// }
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Zubair & Sons | Device Collection",
  description: "A responsive, modern hero landing page for the tech/electronics brand Zubair & Sons, featuring production-quality animations, and an interactive product cluster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <body className="bg-[#0b0c1e] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
