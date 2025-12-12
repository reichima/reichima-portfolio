import Footer from "@/app/(portfolio)/footer";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HomeSection from "@/components/sections/home-section";
import SpecialSection from "@/components/sections/special-section";
import WorksSection from "@/components/sections/works-section";

export default function Page() {
  return (
    <main className="w-full">
      <HomeSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
      <SpecialSection />
      <Footer />
    </main>
  );
}
