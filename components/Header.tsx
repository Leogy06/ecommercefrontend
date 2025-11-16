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
    <motion.header
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="sticky top-0 z-50 bg-accent border-b border-border shadow-sm"
    >
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
              width={400}
              height={400}
              priority={false} //lazy load
              placeholder="blur"
              blurDataURL="/images/blur_logo.png"
            />
          </motion.div>
          <PagesLgWidth />
          <ModeToggle />
        </div>
      </div>
    </motion.header>
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
    <div className="hidden lg:flex items-center gap-4">
      {pages.map((p) => {
        const isActive = pathName === p.path;
        return (
          <Button
            size={"lg"}
            key={p.name}
            variant={"link"}
            onClick={() => push(p.path)}
            className="relative"
            disabled={isActive}
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
