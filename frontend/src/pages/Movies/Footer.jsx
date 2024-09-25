import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black opacity-40 p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="icon flex items-center gap-10 mb-4">
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
          <FaTwitter size={30} />
          <FaYoutube size={30} />
        </div>

        <div className="flex justify-between">
          <ul>
            <li>Audio Description</li>
            <li>Help Center</li>
            <li>Gift Cards</li>
          </ul>
          <ul>
            <li>Media Center</li>
            <li>Investor Relations</li>
            <li>Jobs</li>
          </ul>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Legal Notices</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
