import ContentSection from "./components/content-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";
import Header from "./components/Headers/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col max-h-screen max-w-360 mx-auto items-center">
        <main className="grow w-full flex flex-col items-center">
          <CTASection />
          <ContentSection />
        </main>
      </div>
      <Footer />
    </>
  );
}
