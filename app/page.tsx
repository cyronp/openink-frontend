import ContentSection from "./components/content-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";
import Header from "./components/Headers/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-360 mx-auto w-full flex-1">
        <main className="w-full flex flex-col items-center">
          <CTASection />
          <ContentSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
