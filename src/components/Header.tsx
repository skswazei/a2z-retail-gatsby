import React, { useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/a2z-logo.png";
import { useDemoModal } from "@/components/DemoModal";
import { useThemeOptions, telHref, mailHref } from "@/components/ThemeOptionsProvider";
import { useMenus } from "@/components/MenusProvider";

const aboutLinks = [
  { label: "Our Story", path: "/about/our-story" },
  { label: "Why A2Z", path: "/about/why-a2z" },
  { label: "Success Stories", path: "/about/success-stories" },
  { label: "FAQs", path: "/about/faqs" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [softwareOpen, setSoftwareOpen] = useState(false);
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();
  const { openDemoModal } = useDemoModal();
  const { contact, auth_links } = useThemeOptions();
  const menus = useMenus();
  const softwareLinks = menus["header-software"];
  const hardwareLinks = menus["header-hardware"];
  // Service menu temporarily hidden — uncomment to re-enable the header Services dropdown.
  // const serviceLinks = menus["header-service"];
  const serviceLinks = [] as typeof softwareLinks;

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Pre-header */}
      <div className="w-full h-10 bg-gradient-to-r from-[#4B36BF] to-[#568EF5]">
        <div className="max-w-[98%] h-full mx-auto px-4 flex items-center justify-between text-white text-sm">
          <div className="flex items-center xl:space-x-6 lg:space-x-4 space-x-3">
            <button
              onClick={() => {
                const isHomePage = window.location.pathname === '/';
                const scrollToVideoDemo = () => {
                  const element = document.getElementById('video-demo-player');
                  if (element) {
                    const offset = 120;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                  }
                };
                if (isHomePage) {
                  scrollToVideoDemo();
                } else {
                  sessionStorage.setItem('scrollToVideoDemo', 'true');
                  window.location.href = '/';
                }
              }}
              className="flex items-center hover:text-white/90 whitespace-nowrap"
            >
              <svg className="w-4 h-4 xl:mr-2 lg:mr-1.5 mr-1 flex-shrink-0" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 12.875C7.33718 12.875 8.16616 12.7101 8.93961 12.3897C9.71306 12.0694 10.4158 11.5998 11.0078 11.0078C11.5998 10.4158 12.0694 9.71306 12.3897 8.93961C12.7101 8.16616 12.875 7.33718 12.875 6.5C12.875 5.66282 12.7101 4.83384 12.3897 4.06039C12.0694 3.28694 11.5998 2.58417 11.0078 1.99219C10.4158 1.40022 9.71306 0.930642 8.93961 0.610268C8.16616 0.289894 7.33718 0.125 6.5 0.125C4.80924 0.125 3.18774 0.79665 1.99219 1.99219C0.79665 3.18774 0.125 4.80924 0.125 6.5C0.125 8.19075 0.79665 9.81226 1.99219 11.0078C3.18774 12.2033 4.80924 12.875 6.5 12.875ZM5.63796 3.65958L9.63579 5.88092C9.74616 5.94228 9.83812 6.03203 9.90214 6.14088C9.96617 6.24973 9.99993 6.37372 9.99993 6.5C9.99993 6.62628 9.96617 6.75027 9.90214 6.85912C9.83812 6.96797 9.74616 7.05772 9.63579 7.11908L5.63796 9.34042C5.50851 9.41237 5.36251 9.44925 5.21442 9.44741C5.06633 9.44556 4.92129 9.40506 4.79367 9.32991C4.66606 9.25475 4.56029 9.14756 4.48685 9.01895C4.41342 8.89034 4.37486 8.74477 4.375 8.59667V4.40333C4.37486 4.25523 4.41342 4.10966 4.48685 3.98105C4.56029 3.85244 4.66606 3.74525 4.79367 3.67009C4.92129 3.59494 5.06633 3.55444 5.21442 3.55259C5.36251 3.55075 5.50851 3.58763 5.63796 3.65958Z" fill="currentColor"/>
              </svg>
              <span className="hidden sm:inline">See A2Z in Action</span>
            </button>
          </div>
          <div className="flex items-center xl:space-x-6 lg:space-x-4 space-x-3">
            {contact.email && (
              <a href={mailHref(contact.email)} className="hidden sm:flex items-center hover:text-white/90 whitespace-nowrap">
                <svg className="w-4 h-4 xl:mr-2 lg:mr-1.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{contact.email}</span>
              </a>
            )}
            {contact.phone && (
              <a href={telHref(contact.phone)} className="hidden sm:flex items-center hover:text-white/90 whitespace-nowrap">
                <svg className="w-4 h-4 xl:mr-2 lg:mr-1.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{contact.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-2 sm:px-3 md:px-4">
        <div className="max-w-[98%] mx-auto relative">
          {/* Background with blur and gradient */}
          <div className="absolute inset-0 rounded-xl backdrop-blur-xl border border-[#4B36BF]/15 bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/5 to-[#00BCD4]/5 rounded-xl"></div>
          </div>

          {/* Header Content */}
          <div className="relative px-3 sm:px-4 lg:px-5 xl:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between gap-4 lg:gap-6">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="A2Z POS" className="h-[30px] sm:h-[34px] lg:h-[38px] w-auto" />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden items-center lg:flex xl:space-x-1 lg:space-x-0.5">
                {/* Software Dropdown */}
                {softwareLinks.length > 0 && (
                  <div className="relative group flex items-center">
                    <div className="flex items-center xl:px-4 lg:px-2 relative group-hover:bg-[#4B36BF]/10 rounded-lg">
                      <span className={`relative py-2 group-hover:text-[#4B36BF] transition-colors duration-300 flex items-center cursor-pointer whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                        isActive("/software") ? "text-[#4B36BF]" : "text-black/80"
                      }`}>
                        <span className="relative z-10">Software</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </span>
                      <svg className="ml-1 w-4 h-4 text-[#1a1a2e]/60 group-hover:text-[#4B36BF] transition-colors duration-300" width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl border border-[#4B36BF]/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2">
                        {softwareLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block p-2 text-sm text-black/80 hover:text-[#4B36BF] hover:bg-[#4B36BF]/10 rounded-lg transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hardware Dropdown */}
                {hardwareLinks.length > 0 && (
                  <div className="relative group flex items-center">
                    <div className="flex items-center xl:px-4 lg:px-2 relative group-hover:bg-[#4B36BF]/10 rounded-lg">
                      <span className={`relative py-2 group-hover:text-[#4B36BF] transition-colors duration-300 flex items-center cursor-pointer whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                        isActive("/hardware") ? "text-[#4B36BF]" : "text-black/80"
                      }`}>
                        <span className="relative z-10">Hardware</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </span>
                      <svg className="ml-1 w-4 h-4 text-[#1a1a2e]/60 group-hover:text-[#4B36BF] transition-colors duration-300" width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl border border-[#4B36BF]/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2">
                        {hardwareLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block p-2 text-sm text-black/80 hover:text-[#4B36BF] hover:bg-[#4B36BF]/10 rounded-lg transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Dropdown */}
                {serviceLinks.length > 0 && (
                  <div className="relative group flex items-center">
                    <div className="flex items-center xl:px-4 lg:px-2 relative group-hover:bg-[#4B36BF]/10 rounded-lg">
                      <span className={`relative py-2 group-hover:text-[#4B36BF] transition-colors duration-300 flex items-center cursor-pointer whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                        isActive("/service") ? "text-[#4B36BF]" : "text-black/80"
                      }`}>
                        <span className="relative z-10">Services</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </span>
                      <svg className="ml-1 w-4 h-4 text-[#1a1a2e]/60 group-hover:text-[#4B36BF] transition-colors duration-300" width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl border border-[#4B36BF]/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2">
                        {serviceLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block p-2 text-sm text-black/80 hover:text-[#4B36BF] hover:bg-[#4B36BF]/10 rounded-lg transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* About Dropdown */}
                <div className="relative group flex items-center">
                  <div className="flex items-center xl:px-4 lg:px-2 relative group-hover:bg-[#4B36BF]/10 rounded-lg">
                    <span className={`relative py-2 group-hover:text-[#4B36BF] transition-colors duration-300 flex items-center cursor-pointer whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                      isActive("/about") ? "text-[#4B36BF]" : "text-black/80"
                    }`}>
                      <span className="relative z-10">About A2Z</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </span>
                    <svg className="ml-1 w-4 h-4 text-[#1a1a2e]/60 group-hover:text-[#4B36BF] transition-colors duration-300" width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl border border-[#4B36BF]/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-2">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block p-2 text-sm text-black/80 hover:text-[#4B36BF] hover:bg-[#4B36BF]/10 rounded-lg transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Packages */}
                <div className="relative flex items-center">
                  <div className="flex items-center xl:px-4 lg:px-2 relative hover:bg-[#4B36BF]/10 rounded-lg">
                    <Link
                      to="/packages"
                      className={`relative py-2 hover:text-[#4B36BF] transition-colors duration-300 whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                        isActive("/packages") ? "text-[#4B36BF]" : "text-black/80"
                      }`}
                    >
                      <span className="relative z-10">Packages</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </Link>
                  </div>
                </div>

                {/* Contact Us */}
                <div className="relative flex items-center">
                  <div className="flex items-center xl:px-4 lg:px-2 relative hover:bg-[#4B36BF]/10 rounded-lg">
                    <Link
                      to="/contact-us"
                      className={`relative py-2 hover:text-[#4B36BF] transition-colors duration-300 whitespace-nowrap text-[15px] xl:text-base lg:text-sm ${
                        isActive("/contact-us") ? "text-[#4B36BF]" : "text-black/80"
                      }`}
                    >
                      <span className="relative z-10">Contact Us</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4B36BF]/0 to-[#00BCD4]/0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Right side */}
              <div className="flex items-center xl:space-x-4 lg:space-x-2 space-x-4">
                <div className="hidden sm:flex items-center xl:space-x-4 lg:space-x-2 space-x-4">
                  {auth_links.login && (
                    <a
                      href={auth_links.login}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="xl:!px-6 lg:!px-4 !px-6 !py-2.5 whitespace-nowrap text-[15px] xl:text-base lg:text-sm bg-white text-[#4B36BF] border border-[#747ED1]/50 rounded-[10px] shadow-[0px_1px_4px_0px_#2D185D26] opacity-90 font-semibold transition-all duration-300 hover:opacity-100 hover:scale-105 hover:shadow-[0_8px_25px_#00000080]"
                    >
                      Merchant Login
                    </a>
                  )}
                  <button
                    onClick={openDemoModal}
                    className="xl:!px-6 lg:!px-4 !px-6 !py-2.5 whitespace-nowrap text-[15px] xl:text-base lg:text-sm bg-gradient-to-r from-[#568EF5] to-[#4B36BF] text-white border border-[#747ED1]/50 rounded-[10px] shadow-[0px_1px_4px_0px_#2D185D26] opacity-90 font-semibold transition-all duration-300 hover:opacity-100 hover:scale-105 hover:shadow-[0_8px_25px_#00000080]"
                  >
                    Schedule Demo
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  <div className="relative flex flex-col items-center justify-center">
                    <span className={`w-6 h-0.5 bg-[#1a1a2e] rounded-full transition-all duration-300 ${
                      mobileOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}></span>
                    <span className={`w-6 h-0.5 bg-[#1a1a2e] rounded-full transition-all duration-300 mt-1.5 ${
                      mobileOpen ? '-rotate-45 -translate-y-1' : ''
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
              mobileOpen ? 'max-h-[80vh] mt-4' : 'max-h-0'
            }`}>
              <nav className="flex flex-col space-y-2 pb-4 max-h-[75vh] overflow-y-auto">
                {softwareLinks.length > 0 && (
                  <>
                    <button
                      onClick={() => setSoftwareOpen(!softwareOpen)}
                      className="flex w-full items-center justify-between px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                    >
                      <span>Software</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${softwareOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      className="ml-4 space-y-1 overflow-hidden transition-all duration-300 rounded-lg bg-[#4B36BF]/5"
                      style={{ maxHeight: softwareOpen ? '500px' : '0', opacity: softwareOpen ? '1' : '0' }}
                    >
                      {softwareLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-black/80 rounded-lg transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {hardwareLinks.length > 0 && (
                  <>
                    <button
                      onClick={() => setHardwareOpen(!hardwareOpen)}
                      className="flex w-full items-center justify-between px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                    >
                      <span>Hardware</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${hardwareOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      className="ml-4 space-y-1 overflow-hidden transition-all duration-300 rounded-lg bg-[#4B36BF]/5"
                      style={{ maxHeight: hardwareOpen ? '500px' : '0', opacity: hardwareOpen ? '1' : '0' }}
                    >
                      {hardwareLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-black/80 rounded-lg transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {serviceLinks.length > 0 && (
                  <>
                    <button
                      onClick={() => setServiceOpen(!serviceOpen)}
                      className="flex w-full items-center justify-between px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                    >
                      <span>Services</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      className="ml-4 space-y-1 overflow-hidden transition-all duration-300 rounded-lg bg-[#4B36BF]/5"
                      style={{ maxHeight: serviceOpen ? '500px' : '0', opacity: serviceOpen ? '1' : '0' }}
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-black/80 rounded-lg transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="flex w-full items-center justify-between px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                >
                  <span>About A2Z</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M4 6L8.5 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className="ml-4 space-y-1 overflow-hidden transition-all duration-300 rounded-lg bg-[#4B36BF]/5"
                  style={{ maxHeight: aboutOpen ? '500px' : '0', opacity: aboutOpen ? '1' : '0' }}
                >
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-sm text-black/80 rounded-lg transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/packages"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                >
                  Packages
                </Link>

                <Link
                  to="/contact-us"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-black/80 transition-colors duration-300 rounded-lg"
                >
                  Contact Us
                </Link>

                <div className="sm:hidden flex flex-col gap-2 mt-4">
                  {auth_links.login && (
                    <a
                      href={auth_links.login}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!px-6 !py-2.5 text-center bg-white text-[#4B36BF] border border-[#747ED1]/50 rounded-[10px] shadow-[0px_1px_4px_0px_#2D185D26] font-semibold transition-all duration-300"
                    >
                      Merchant Login
                    </a>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); openDemoModal(); }}
                    className="!px-6 !py-2.5 text-center bg-gradient-to-r from-[#568EF5] to-[#4B36BF] text-white border border-[#747ED1]/50 rounded-[10px] shadow-[0px_1px_4px_0px_#2D185D26] font-semibold transition-all duration-300"
                  >
                    Schedule Demo
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
