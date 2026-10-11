import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import { getSettings } from "@/lib/content";

export const revalidate = 60; // Revalidate settings every 60 seconds (ISR)

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: `${settings.short_name} | ${settings.institute_name}`,
    description: `Official website of ${settings.institute_name}. Empowering women through technical and vocational excellence.`
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <AdmissionModal />
      </body>
    </html>
  );
}
