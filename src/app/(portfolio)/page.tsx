import Footer from "@/app/(portfolio)/footer";
import AboutSection from "@/components/sections/about-section";
import BlogSection from "@/components/sections/blog-section";
import ContactSection from "@/components/sections/contact-section";
import HomeSection from "@/components/sections/home-section";
import SpecialSection from "@/components/sections/special-section";
import WorksSection from "@/components/sections/works-section";
import { getBlogs } from "@/lib/microcms";

export default async function Page() {
  const { contents: blogs } = await getBlogs({
    limit: 6,
    orders: "-publishedAt",
  });

  return (
    <main className="w-full">
      <HomeSection />
      <AboutSection />
      <WorksSection />
      <BlogSection blogs={blogs} />
      <ContactSection />
      <SpecialSection />
      <Footer />
    </main>
  );
}
