"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Box, Menu, Minus, Plus, ShoppingCart, Trash, X } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
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
  const { cartItems, removeItem, adjustQuantity, getSubtotal } = useCart();
  const { push } = useRouterTransition();
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
          <DrawerDescription>Checkout item?</DrawerDescription>
        </DrawerHeader>
        <div className="flex container mx-auto justify-center py-10 px-4 max-h-1/2 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Box />
              <span className="text-muted-foreground tracking-tight">
                No items? Start Adding items
              </span>
              <DialogClose asChild>
                <Button
                  className="w-full"
                  onClick={() => {
                    //add close the drawer?
                    push("/menu");
                  }}
                >
                  Browse Menu
                </Button>
              </DialogClose>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-4 px-2">
              {cartItems.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-start gap-3 flex-1">
                    <Image
                      src={i.item?.images?.[0] ?? "/placeholder.png"}
                      height={60}
                      width={80}
                      alt="image-product"
                      className="rounded-md object-cover border"
                    />

                    <div className="flex flex-col justify-between md:justify-center">
                      <span className="font-semibold text-base leading-tight">
                        {i.item?.name ?? "--"}
                      </span>

                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md"
                          onClick={() =>
                            adjustQuantity(i.menu_item_id, "reduce")
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="min-w-5 text-center">
                          {i.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md"
                          onClick={() => adjustQuantity(i.menu_item_id, "add")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-semibold text-base text-right">
                      ₱ {(i.item?.price ?? 0) * i.quantity}
                      {/* put choices' price */}
                      {i.selectedOptions && (
                        <div className="flex flex-col gap-2">
                          {i.selectedOptions.map((o, optionIndex) => (
                            <div key={optionIndex} className="space-y-1">
                              <span>{o.choices.label}</span>
                              <span> + {o.choices.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </span>
                    <Button
                      variant="ghost"
                      title="Remove item?"
                      size="icon"
                      onClick={() => removeItem(i.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* subtotal */}
              <div className="flex justify-end items-center w-full mt-6 px-2  pb-3 gap-4">
                <span className="text-lg font-medium">Subtotal:</span>
                <span className="text-lg font-semibold">
                  ₱ {getSubtotal().toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
