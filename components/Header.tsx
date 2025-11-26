"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useCart } from "@/context/CartContext";

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

            <div className="hidden lg:flex gap-2 items-center">
              <PagesLgWidth />
              <AddtoCartDrawer />
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <AddtoCartDrawer />
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
    <nav className="hidden lg:flex items-center gap-3">
      {pages.map((p) => {
        const isActive = pathName === p.path;
        return (
          <Button
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

function AddtoCartDrawer() {
  const { cartItems } = useCart();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="relative px-4 py-2"
          variant={"ghost"}
          size={"icon-lg"}
        >
          {cartItems.length >= 0 && (
            <span className="absolute -top-0.5 -right-0.5 text-white bg-red-500 p-0.5 rounded-full text-xs w-5 h-5">
              {cartItems.length}
            </span>
          )}
          <ShoppingCart />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold mb-4">
            Add to cart
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center py-10 px-4">
          {cartItems.length === 0 ? (
            <span className="text-muted-foreground tracking-tight">
              No items? Start Adding items
            </span>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              {cartItems.map((i) => (
                <div
                  className="flex w-full items-center justify-between border-b"
                  key={i.menu_item_id}
                >
                  <span className="font-medium text-lg">
                    {i.item?.name ?? "--"}
                  </span>
                  <span>Quantity: {i.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
