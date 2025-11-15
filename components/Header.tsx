"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { usePathname } from "next/navigation";

export default function Header() {
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
          <PagesLgWidth />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

const pages = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Orders", path: "/order" },
  { name: "Profile", path: "/profile" },
];

function PagesLgWidth() {
  const { push } = useRouterTransition();
  const pathName = usePathname();
  return (
    <div className="hidden lg:flex items-center gap-4 relative">
      {pages.map((p) => {
        const isActive = pathName === p.path;
        return (
          <Button
            size={"lg"}
            key={p.name}
            variant={"link"}
            onClick={() => push(p.path)}
            className="relative"
          >
            {p.name}
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className=" absolute left-0 right-0 bottom-0 h-px bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
}
