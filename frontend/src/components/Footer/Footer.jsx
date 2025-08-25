import { Link } from "react-router-dom";
import logo from "../../../public/icon.jpg";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-50 mt-10">
      <div className="footer max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-base-content ">
        {/* Logo & Contact Info */}
        <div className="ml-5">
          <img src={logo} alt="Logo" className="h-12 mb-2" />
            <p className="mb-4 font-bold uppercase text-base">Office Address</p>

          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt /> 0663277828
          </p>
          <p className="flex items-center gap-2 mb-1">
            <MdEmail /> contact@amdeco-renovation.fr
          </p>
          <p className="flex items-center gap-2">
            <MdLocationOn /> France
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-base">
          <h2 className="footer-title mb-4 text-base text-black font-bold">
            Useful Links
          </h2>
          <Link
            to="/cookies-policy"
            className="link link-hover block mb-2 text-center md:text-left"
          >
            Politique relative aux cookies 
          </Link>
          <Link
            to="/privacy-policy"
            className="link link-hover block mb-2 text-center md:text-left"
          >
            Politique de confidentialité
          </Link>
          <Link
            to="/terms-and-conditions"
            className="link link-hover block mb-2 text-center md:text-left"
          >
            Conditions générales d’utilisation 
          </Link>
        </div>
      </div>

      {/* Bottom copyright strip */}
      <div className="border-t border-gray-300 text-center text-sm p-4 bg-base-100">
        <p>
          &copy; {currentYear} AM DECO || Developed by{" "}
          <a
            href="https://github.com/Mozammel772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
