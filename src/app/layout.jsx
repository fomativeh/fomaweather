import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather app",
  description: "A weather app by fomatech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://tiles.locationiq.com/v3/libs/maplibre-gl/1.15.2/maplibre-gl.js"></script>
        <link
          href="https://tiles.locationiq.com/v3/libs/maplibre-gl/1.15.2/maplibre-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <Toaster />
      <body className={inter.className}>
        <section className="flex justify-center items-center">
          {children}
        </section>
      </body>
    </html>
  );
}
