import React, { useEffect } from "react";
import Seo from "@/components/Seo";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { useDemoModal } from "@/components/DemoModal";

const NotFound = () => {
  const location = useLocation();
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center pt-16 py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F1FF]/20 to-transparent"></div>

        {/* Content container */}
        <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
          {/* 404 Image */}
          <div className="w-full max-w-lg mb-8 md:mb-10 lg:mb-12">
            <img
              src="/404.svg"
              alt="404 Not Found"
              className="w-full object-contain"
            />
          </div>

          {/* Text content */}
          <h1
            className="mb-6 text-4xl font-extrabold !leading-[1.3] md:text-5xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
            style={{
              textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
            }}
          >
            Page Not Found
          </h1>
          <p className="body-text max-w-2xl text-lg mb-8 md:mb-10">
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to our homepage.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/" className="btn-primary-gradient !px-8">
              Back to Homepage
            </Link>
            <button onClick={openDemoModal} className="btn-secondary-outline !px-6 inline-flex items-center">
              Contact Support
              <svg className="w-4 h-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#4B36BF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#568EF5]/5 rounded-full blur-3xl"></div>
      </main>
    </div>
  );
};

export const Head = () => (
  <Seo
    title="Page Not Found"
    description="The page you're looking for doesn't exist. Navigate back to the A2Z POS homepage."
    pathname="/404"
  />
);

export default NotFound;
