import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/content";

export const revalidate = 60; // Revalidate settings every 60 seconds (ISR)

export const metadata = {
  title: "GPI W D.I. Khan | Government Polytechnic Institute (Women) Dera Ismail Khan",
  description: "Official website of Government Polytechnic Institute (Women) Dera Ismail Khan. Empowering women through technical and vocational excellence."
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
