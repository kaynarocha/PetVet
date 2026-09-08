import './globals.css';
import type { ReactNode } from 'react';
 
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body>
        <header></header>
        {children}
      </body>
    </html>
  );
}