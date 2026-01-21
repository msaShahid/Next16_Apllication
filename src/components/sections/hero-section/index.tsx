import Image from 'next/image';
import Link from 'next/link';
import HeroLogos from '../hero-logos';
import { Subheading } from './subheading';
import { Heading } from './heading'
import { IntroVideo } from './intro-video';

export default function HeroSection() {
  return (
    <section className="pt-16 relative overflow-hidden dark:bg-[#171F2E]">
      <div className="max-w-[120rem] mx-auto relative">
        <div className="wrapper">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center pb-16">
              <Subheading text="Most Powerful AI Tools at One Place" />
              
              <Heading text="Transform Ideas into Reality with Intelligent AI Tools" />

              <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
                Unleash the Power of Artificial Intelligence to Streamline Your
                Workflow, Boost Productivity, and Redefine Success.
              </p>

              <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                <Link
                  href="/text-generator"
                  className="bg-primary-500 transition h-12 inline-flex items-center justify-center hover:bg-primary-600 px-6 py-3 rounded-full text-white text-sm"
                >
                  Explore app
                </Link>

                <IntroVideo />
              </div>
            </div>
          </div>

        </div>

        <div className="max-[1100px]:hidden">
          <Image
            src="/images/hero/shape-left-1.svg"
            className="absolute top-14 left-16 floating-1"
            alt=""
            width={170}
            height={44}
          />
          <Image
            src="./images/hero/shape-left-2.svg"
            className="absolute left-[145px] top-[298px] floating-2 max-[1240px]:left-[80px]"
            alt=""
            width={181}
            height={44}
          />
          <Image
            src="/images/hero/shape-right-1.svg"
            className="absolute right-16 top-[108px] floating-3"
            alt=""
            width={176}
            height={44}
          />
          <Image
            src="./images/hero/shape-right-2.svg"
            className="absolute top-[316px] right-[200px] floating-4 max-[1240px]:right-[80px] max-[1350px]:right-[150px] max-[1500px]:right-[200px]"
            alt=""
            width={179}
            height={44}
          />
        </div>
      </div>
      <div className="hero-glow-bg pointer-events-none w-full h-167.5 absolute z-10 bottom-0"></div>
      <HeroLogos />
    </section>
  );
}
