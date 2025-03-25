
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navbg text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">
              <span className="text-dairy-400">Dairy</span>Care
            </h3>
            <p className="text-sm text-gray-300">
              Your one-stop solution for cow & buffalo care. Providing customized diet plans, 
              veterinary consultations, and farm-to-home delivery services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 transition-colors hover:text-dairy-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/diet-plans"
                  className="text-gray-300 transition-colors hover:text-dairy-300"
                >
                  Customized Diet Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/veterinary"
                  className="text-gray-300 transition-colors hover:text-dairy-300"
                >
                  Veterinary Consultation
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="text-gray-300 transition-colors hover:text-dairy-300"
                >
                  Farm-to-Home Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 transition-colors hover:text-dairy-300"
                >
                  Useful Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-dairy-400" />
                <span>+91 9811401924</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-dairy-400" />
                <span>sshobhit849@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin size={16} className="mt-1 text-dairy-400" />
                <span>Bennett University , Greater Noida</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-300">
              Subscribe to our newsletter for the latest updates on cattle care and dairy farming.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-dairy-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-dairy-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dairy-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DairyWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
