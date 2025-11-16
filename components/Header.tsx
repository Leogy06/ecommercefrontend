"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const pages = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Orders", path: "/order" },
  { name: "Profile", path: "/profile" },
];

export default function Header() {
  const [openNavi, setOpenNavi] = useState(false);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {openNavi && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpenNavi(false)}
            />

            {/* Slide-down Menu */}
            <motion.nav
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 bg-accent z-50 shadow-md p-6"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="flex flex-col gap-4 text-center"
              >
                <div className="flex justify-between items-center mt-12">
                  <Image
                    src={"/images/logo.png"}
                    alt="logo"
                    height={60}
                    width={60}
                    priority={false}
                    placeholder="blur"
                    blurDataURL="/images/blur_logo.png"
                    className="rounded-full"
                  />
                  <Button
                    size={"icon-sm"}
                    variant={"ghost"}
                    onClick={() => setOpenNavi(false)}
                  >
                    <X />
                  </Button>
                </div>
                {pages.map((item) => (
                  <motion.li
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.path}
                      className="text-lg font-medium hover:text-red-600"
                      onClick={() => setOpenNavi(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-accent/50 border-b border-border shadow-sm backdrop-blur-3xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Image
              src="/images/logo.png"
              alt="logo-foodie"
              width={48}
              height={48}
              className="cursor-pointer rounded-full"
            />

            <div className="hidden lg:flex gap-6 items-center">
              <PagesLgWidth />
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setOpenNavi(!openNavi)}
                size="icon-sm"
                variant="ghost"
              >
                {openNavi ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function PagesLgWidth() {
  const { push } = useRouterTransition();
  const pathName = usePathname();
  return (
    <nav className="hidden lg:flex items-center gap-4">
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
    </nav>
  );
}
