'use client';

import Image from "next/image";
import { useTheme } from "next-themes";

const logos = [
  "br-1.svg",
  "br-2.svg",
  "br-3.svg",
  "br-4.svg",
  "br-5.svg",
  "br-6.svg",
  "br-7.svg",
];

export default function HeroLogos() {
  const { theme } = useTheme(); 

  return (
    <div className="wrapper">
      <div className="max-w-[1016px] relative z-30 mx-auto pt-14 pb-16">
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
          Trusted by the worlds largest companies including...
        </p>

        <div className="flex flex-wrap justify-center items-center gap-7 md:gap-14 mt-10">
          {logos.map((logo, idx) => (
            <Image
              key={idx}
              src={`/images/brands/${logo}`}
              width={80}
              height={32}
              alt={`Brand ${idx + 1}`}
              className={`
                transition-opacity duration-200
                ${theme === "dark" ? "opacity-50 hover:opacity-100" : "opacity-70 hover:opacity-100"}
              `}
              style={{
                filter: theme === "light" ? "brightness(0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
