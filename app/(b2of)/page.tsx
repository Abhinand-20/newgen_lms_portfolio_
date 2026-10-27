import Benefits from '@/components/Benefits';
import Compare from '@/components/Compare';
import Hero from '@/components/Hero';
import { IconSprite } from '@/components/Icons';
import Journey from '@/components/Journey';
import Nav from '@/components/Nav';
import Progress from '@/components/Progress';
import RevealObserver from '@/components/RevealObserver';
import { Companion, Cta, Hangar } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <IconSprite />
      <Nav />
      <main>
        <Hero />
        <Companion />
        <Hangar />
        <Journey />
        <Progress />
        <Benefits />
        <Compare />
        <Cta />
      </main>
      <RevealObserver />
    </>
  );
}
