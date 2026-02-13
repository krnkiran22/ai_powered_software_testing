import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ArchitectureSection } from '@/components/home/ArchitectureSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
}
