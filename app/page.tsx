import CTASection from "./components/cta-section";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col max-w-360 mx-auto items-center">
      <Header />
      <CTASection/>
    </div>
  );
}
