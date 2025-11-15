"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";

const Header = () => {
  return (
    //behavior
    <header className="sticky top-0 z-50 bg-accent border-b border-gray-200 shadow-sm">
      {/* padding margin */}
      <div className=" mx-auto px-4 sm:px-6 lg-px-8">
        {/* element position */}
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-12 w-12 rounded-full overflow-hidden"
          >
            <Image
              src="/images/logo.png"
              alt="logo-foodie"
              fill
              className="object-contain"
            />
          </motion.div>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
