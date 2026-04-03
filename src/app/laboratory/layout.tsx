import Script from "next/script";
// import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}

        <Script
          src="https://docs.opencv.org/4.x/opencv.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}