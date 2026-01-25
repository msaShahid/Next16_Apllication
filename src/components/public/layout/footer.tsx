import { getCurrentYear } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Status", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/pricing#faq" },
      { label: "Help Docs", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "HTML File Upload", href: "/" },
      { label: "HTML Website Hosting", href: "/" },
      { label: "Free Image Hosting", href: "/" },
      { label: "Upload PDF Online", href: "/" },
      { label: "Free Zip Hosting", href: "/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/signin" },
      { label: "Sign Up", href: "/signup" },
      { label: "Reset Password", href: "/reset-password" },
      { label: "Support", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const glowFilterId = React.useId();

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-gray-400">

      <span
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <svg
          width="1260"
          height="457"
          viewBox="0 0 1260 457"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter={`url(#${glowFilterId})`}>
            <circle cx="630" cy="-173.299" r="230" fill="#10b981" />
          </g>
          <defs>
            <filter
              id={glowFilterId}
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
          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12">

            <div className="lg:col-span-3 xl:col-span-4">
              <p className="mb-9 text-sm">
                An AI platform built with Next.js, Tailwind CSS, and OpenAI
                integrations.
              </p>

              <nav aria-label="Social links" className="flex gap-2">
                {["#", "#", "#", "#"].map((href, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center transition hover:text-white"
                    aria-label={`Social link ${i + 1}`}
                  >
                    {/* icon */}
                  </a>
                ))}
              </nav>
            </div>

            {/* Links */}
            <nav
              className="lg:col-span-6 xl:col-span-5"
              aria-label="Footer navigation"
            >
              <div className="grid gap-7 sm:grid-cols-3">
                {footerLinks.map((group) => (
                  <div key={group.title}>
                    <span className="mb-6 block text-sm font-medium">
                      {group.title}
                    </span>
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm transition hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>

            <div className="lg:col-span-3">
              <span className="mb-6 block text-sm font-medium">
                Stay In Touch
              </span>
              <p className="mb-5 text-sm">
                Subscribe now for exclusive insights and offers.
              </p>

              <form
                aria-label="Newsletter subscription"
                className="flex w-full max-w-64 flex-col gap-2"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="h-12 rounded-full border border-gray-700 bg-transparent px-4 text-center text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-5 sm:px-7">
          <p className="py-5 text-center text-sm text-gray-500">
            © {getCurrentYear()} Md28 — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
