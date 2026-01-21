import { getCurrentYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-900">
      {/* Glow background */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2">
        <svg
          width="1260"
          height="457"
          viewBox="0 0 1260 457"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f)">
            <circle cx="630" cy="-173.299" r="230" fill="#10b981" />
          </g>
          <defs>
            <filter
              id="filter0_f"
              x="0"
              y="-803.299"
              width="1260"
              height="1260"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </span>

      <div className="relative z-10 py-16 xl:py-24">
        <div className="container mx-auto px-5 sm:px-7">
          <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-3 xl:col-span-4">

              <p className="mb-9 text-sm text-gray-400">
                A self-hosted AI starter kit built with Next.js, Tailwind CSS,
                and OpenAI integrations. Perfect for developers and startups
                to quickly build, deploy, and scale AI-powered SaaS products.
              </p>

              {/* Socials */}
              <div className="flex gap-1">
                {[
                  { href: "#" },
                  { href: "#" },
                  { href: "#" },
                  { href: "#" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    className="size-10 text-gray-400 transition hover:text-white/80"
                  >
                    {/* icon stays unchanged */}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="grid gap-7 sm:grid-cols-3">
                {[
                  {
                    title: "Services",
                    links: [
                      ["Status", "/"],
                      ["Pricing", "/pricing"],
                      ["FAQ", "/pricing#faq"],
                      ["Help Docs", "/contact"],
                      ["Privacy Policy", "/privacy"],
                    ],
                  },
                  {
                    title: "Features",
                    links: [
                      ["HTML File Upload", "/"],
                      ["HTML Website Hosting", "/"],
                      ["Free Image Hosting", "/"],
                      ["Upload PDF Online", "/"],
                      ["Free Zip Hosting", "/"],
                    ],
                  },
                  {
                    title: "Account",
                    links: [
                      ["Login", "/signin"],
                      ["Sign Up", "/signup"],
                      ["Reset Password", "/reset-password"],
                      ["Support", "/contact"],
                    ],
                  },
                ].map((group) => (
                  <div key={group.title}>
                    <span className="mb-6 block text-sm text-gray-400">
                      {group.title}
                    </span>
                    <nav className="flex flex-col space-y-3">
                      {group.links.map(([label, href]) => (
                        <Link
                          key={label}
                          href={href}
                          className="text-sm text-gray-400 transition hover:text-white"
                        >
                          {label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <span className="mb-6 block text-sm text-gray-400">
                Stay In Touch
              </span>
              <p className="mb-5 text-sm text-gray-400">
                Subscribe now for exclusive insights and offers!
              </p>

              <form>
                <div className="flex w-full max-w-64 flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-full border border-gray-700 bg-transparent p-4 text-center text-sm text-white placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600"
                  >
                    Subscribe Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-5 sm:px-7">
          <div className="py-5 text-center">
            <p className="text-sm text-gray-500">
              &copy; {getCurrentYear()} Md28 — All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
