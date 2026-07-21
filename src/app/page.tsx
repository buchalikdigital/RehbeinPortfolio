import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandLogos from "@/components/BrandLogos";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import GeberitPartner from "@/components/GeberitPartner";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BrandLogos />
        <Services />
        <WhyUs />
        <GeberitPartner />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
