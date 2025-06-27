import React from 'react';

interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  sections?: FooterSection[];
  copyrightText?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Returns", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" }
    ]
  }
];

const Footer: React.FC<FooterProps> = ({
  brandName = "FlipKart",
  brandDescription = "Your one-stop destination for all your shopping needs. Quality products, unbeatable prices.",
  sections = defaultSections,
  copyrightText = "2025 FlipKart Clone. All rights reserved."
}) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="text-2xl font-bold text-green-400 mb-4">{brandName}</div>
            <p className="text-gray-300 mb-4">
              {brandDescription}
            </p>
          </div>
          
          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-300">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      onClick={link.onClick}
                      className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;