import React, { useState } from "react";
import { Link } from "gatsby";
import logoWhite from "@/assets/a2z-logo-white.svg";
import { submitSubscribe } from "@/services/api";
import { useThemeOptions, telHref, mailHref } from "@/components/ThemeOptionsProvider";
import { useMenus } from "@/components/MenusProvider";

const aboutLinks = [
  { label: "Our Story", path: "/about/our-story" },
  { label: "Blogs", path: "/blog" },
  { label: "FAQs", path: "/about/faqs" },
  { label: "Contact Us", path: "/contact-us" },
];

const Footer = () => {
  const { contact, social } = useThemeOptions();
  const menus = useMenus();
  const hardwareLinks = menus["footer-hardware"];
  const softwareLinks = menus["footer-software"];
  // Service menu temporarily hidden — uncomment to re-enable the footer Services column.
  // const serviceLinks = menus["footer-service"];
  const serviceLinks = [] as typeof softwareLinks;
  const legalLinks = menus["legal"];
  const hasSocial = Object.values(social).some(Boolean);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      const result = await submitSubscribe(email);
      setMessage({ type: result.success ? "success" : "error", text: result.message });
      if (result.success) setEmail("");
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Could not subscribe. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border border-solid border-[#4B36BF]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#568EF5] to-[#4B36BF] backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF] to-[#568EF5] backdrop-blur-xl animate-pulse [animation-duration:3500ms]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Top Section: Logo + Newsletter */}
        <div className="flex flex-col sm:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center">
              <img src={logoWhite} alt="A2Z Solutions" className="h-12" />
            </Link>
            <p className="mt-4 text-white/80 text-sm leading-relaxed">
              The Retail Growth Platform for Liquor Stores & Neighborhood Markets.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="relative group max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BCD4] to-[#651FFF] rounded-2xl sm:rounded-3xl opacity-20 group-hover:opacity-30 transition-all duration-500 blur-sm"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00BCD4] to-[#651FFF] rounded-2xl sm:rounded-3xl opacity-20 group-hover:opacity-30 transition-all duration-500 blur-md"></div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setMessage(null); }}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-white border border-[#747ED1] rounded-l-lg focus:outline-none focus:border-[#568EF5] text-black/80 placeholder-black/50 shadow-[0px_4px_4px_0px_#00000040] backdrop-blur-[4px] opacity-90 ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 border rounded-r-lg border-[#747ED1] bg-gradient-to-r from-[#568EF5] to-[#4B36BF] text-white font-bold shadow-[0px_4px_4px_0px_#00000040] backdrop-blur-[4px] opacity-90 min-w-[120px] flex items-center justify-center ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
              {message && (
                <div className={`absolute -bottom-7 left-0 text-sm ${message.type === "success" ? "text-green-300" : "text-red-300"}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Links Section */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 ${serviceLinks.length > 0 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {/* Software */}
          {softwareLinks.length > 0 && (
            <nav>
              <h3 className="text-white text-lg font-semibold mb-4">Software</h3>
              <ul className="space-y-3">
                {softwareLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/80 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Hardware */}
          {hardwareLinks.length > 0 && (
            <nav>
              <h3 className="text-white text-lg font-semibold mb-4">Hardware</h3>
              <ul className="space-y-3">
                {hardwareLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/80 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Services */}
          {serviceLinks.length > 0 && (
            <nav>
              <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/80 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* About A2Z */}
          <nav>
            <h3 className="text-white text-lg font-semibold mb-4">About A2Z</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/80 hover:text-white transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect & Contact */}
          <div>
            {hasSocial && (
              <>
                <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
                <div className="flex items-center space-x-4">
              {/* Facebook */}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="Facebook">
                  <div className="absolute inset-0 bg-white transition-all duration-500 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden"></div>
                  <div className="relative flex items-center justify-center w-11 h-11">
                    <svg className="w-[13px] h-[18px] text-[#4B36BF]/90 group-hover:text-[#4B36BF] transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 320 512">
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </div>
                </a>
              )}
              {/* Twitter */}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="Twitter">
                  <div className="absolute inset-0 bg-white transition-all duration-500 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden"></div>
                  <div className="relative flex items-center justify-center w-11 h-11">
                    <svg className="w-[18px] h-[18px] text-[#4B36BF]/90 group-hover:text-[#4B36BF] transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </div>
                </a>
              )}
              {/* LinkedIn */}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="LinkedIn">
                  <div className="absolute inset-0 bg-white transition-all duration-500 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden"></div>
                  <div className="relative flex items-center justify-center w-11 h-11">
                    <svg className="w-[18px] h-[18px] text-[#4B36BF]/90 group-hover:text-[#4B36BF] transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />
                    </svg>
                  </div>
                </a>
              )}
              {/* Instagram */}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="Instagram">
                  <div className="absolute inset-0 bg-white transition-all duration-500 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden"></div>
                  <div className="relative flex items-center justify-center w-11 h-11">
                    <svg className="w-[18px] h-[18px] text-[#4B36BF]/90 group-hover:text-[#4B36BF] transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
              )}
              {/* YouTube */}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="YouTube">
                  <div className="absolute inset-0 bg-white transition-all duration-500 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden"></div>
                  <div className="relative flex items-center justify-center w-11 h-11">
                    <svg className="w-[18px] h-[18px] text-[#4B36BF]/90 group-hover:text-[#4B36BF] transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                </a>
              )}
                </div>
              </>
            )}

            {/* Contact */}
            {(contact.email || contact.phone) && (
              <div className="mt-6">
                <h4 className="text-white text-lg font-semibold mb-2">Contact</h4>
                {contact.email && (
                  <a href={mailHref(contact.email)} className="text-white/80 hover:text-white transition-all duration-300 block mb-2">
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={telHref(contact.phone)} className="text-white/80 hover:text-white transition-all duration-300">
                    {contact.phone}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#4B36BF] to-transparent"></div>
          <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm hidden lg:block">&copy; {new Date().getFullYear()} A2Z Pos. All Rights Reserved.</p>
            <p className="text-white/80 text-sm hidden lg:block">Powered by Intelligent AI Insights.</p>
            {legalLinks.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-6">
                {legalLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="text-white/80 hover:text-white transition-all duration-300 text-sm">
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
            <p className="max-w-lg w-full text-white/80 text-sm lg:hidden flex sm:flex-row flex-col justify-between items-center gap-4">
              <span>&copy; {new Date().getFullYear()} A2Z Pos. All Rights Reserved.</span>
              <span>Powered by Intelligent AI Insights.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
