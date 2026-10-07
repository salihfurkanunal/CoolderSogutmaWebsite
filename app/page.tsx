import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/home/About";
import { FieldWorks } from "@/components/home/FieldWorks";
import { ProductGroups } from "@/components/home/ProductGroups";
import { ServiceHub } from "@/components/service/ServiceHub";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProductGroups />
      <ServiceHub />
      <FieldWorks />
    </>
  );
}
