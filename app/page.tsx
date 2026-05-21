import ContentSection from "./components/content-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-360 mx-auto items-center">
      <Header />
      <main className="flex-grow w-full flex flex-col items-center">
        <CTASection />
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
}
