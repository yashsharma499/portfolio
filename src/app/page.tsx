import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import Impact from "@/components/sections/Impact";
import CompanyWork from "@/components/sections/CompanyWork";
import VideoShowcase from "@/components/sections/VideoShowcase";
import Automations from "@/components/sections/Automations";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Impact />
      <CompanyWork />
      <VideoShowcase />
      <Automations />
      <Projects />
      <About />
      <Skills />
      <Timeline />
      <Contact />
    </>
  );
}
