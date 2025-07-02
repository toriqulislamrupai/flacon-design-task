import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaHeadset,
  FaMapMarkerAlt,
} from "react-icons/fa";
import mainIcon from "../../assets/Frame 1618874453.png";
import bkashLogo from "../../assets/Badge.png";
import nagadLogo from "../../assets/Badge (1).png";
import textLogo from "../../assets/Badge 2.png";
import redLogo from "../../assets/redLogo.png";
import visaLogo from "../../assets/visda.png";

const aboutLinks = [
  "Contact Us",
  "About Us",
  "Careers",
  "Press",
  "Cancellation & Returns",
  "Terms of Use",
];

const helpLinks = [
  "Payments",
  "Shipping",
  "My Orders",
  "FAQs",
  "Terms of Use",
  "Security",
  "Privacy",
];

const paymentLogos = [
  { src: visaLogo, alt: "Visa" },
  { src: redLogo, alt: "Visa" },
  { src: textLogo, alt: "TextPay" },
  { src: bkashLogo, alt: "bKash" },
  { src: nagadLogo, alt: "Nagad" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-sm ">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto px-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-16">
        {/* Column 1: Image + Info */}
        <div>
          <img
            src={mainIcon}
            alt="Falcon Logo"
            className="mb-4"
          />
          <p className="mb-2">
            Experience our new platform & Enjoy exciting deals and offers on
            your day to day
          </p>
          <div className="flex items-start gap-2 mt-4">
            <div className="bg-white text-gray-800 p-2 rounded-full text-xs">
              <FaMapMarkerAlt />
            </div>
            <p>House #64, Road 13, ASA Center, Uttara, Dhaka-1402</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white text-xs  text-gray-800 p-2 rounded-full">
              <FaPhone />
            </div>
            <span>01729-1497201</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white text-gray-800 text-xs p-2 rounded-full">
              <FaEnvelope />
            </div>
            <span>falcon@gmail.com</span>
          </div>
        </div>

        {/* Column 2: About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-3">ABOUT</h3>
          <ul className="space-y-1">
            {aboutLinks.map((item, i) => (
              <li key={i} className="hover:text-emerald-400 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Help */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-3">HELP</h3>
          <ul className="space-y-1">
            {helpLinks.map((item, i) => (
              <li key={i} className="hover:text-emerald-400 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-3">
            Need Support?
          </h3>

          <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-emerald-400 transition border w-fit p-1 rounded-md mb-3">
            <FaHeadset className="text-base text-emerald-400" />
            <p className="">10724-7814XX</p>
          </div>
          <p className="mb-2 text-gray-500">DOWNLOAD APP</p>
          <div className="flex flex-col gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-24"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-700 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Social */}
          <div className="flex items-center gap-3">
            <span className="font-semibold">Follow us on:</span>
            <FaFacebook className="text-xl hover:text-emerald-400 cursor-pointer" />
            <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
            <FaYoutube className="text-xl hover:text-red-600 cursor-pointer" />
          </div>

          {/* Right: Payments */}
          {/* Right: Payments */}
          <div className="flex items-center gap-3">
            <span className="font-semibold whitespace-nowrap">Payment Accepted:</span>
            <div className="flex overflow-x-auto">

            
            {paymentLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto  rounded "
              />
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-800 py-4">
        Falcon ©2025. Design by xyz.
      </div>
    </footer>
  );
};

export default Footer;
