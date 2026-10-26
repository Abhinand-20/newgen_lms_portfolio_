import Hero from '@/components/Hero';
import { IconSprite } from '@/components/Icons';
import Journey from '@/components/Journey';
import Nav from '@/components/Nav';
import RevealObserver from '@/components/RevealObserver';
import { Benefits, Companion, Compare, Cta, Hangar, Progress } from '@/components/Sections';

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
