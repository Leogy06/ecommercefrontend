"use client";

import { Button } from "@/components/ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import {
  ArrowRight,
  Clock,
  Heart,
  Minus,
  Plus,
  Shield,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useGetMenuItemsQuery } from "@/redux/api/menuItemApiSlice";
import { MenuItem } from "@/types";
import { useCart } from "@/hooks/cartItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { menuitem } from "framer-motion/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Landing() {
  const { push } = useRouterTransition();

  const { data: featuredDishes, isLoading: isFeaturedDishLoading } =
    useGetMenuItemsQuery();

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col">
          {/* Section 1 – Hero */}
          <HeroSection push={push} />
          {/* Section 2 – Featured Dishes */}
          <section className="snap-start ">
            <FeaturedDishes
              isLoading={isFeaturedDishLoading}
              featuredDishes={featuredDishes || []}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

function HeroSection({ push }: { push: (path: string) => void }) {
  return (
    <section className=" snap-start pt-4" aria-labelledby="hero-heading">
      <div className="container mx-auto">
        <div className="bg-linear-to-b from-red-100/40 to-transparent dark:from-red-500/20 rounded-lg">
          <div className="p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
              {/* TEXT */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col max-w-xl text-center lg:text-left"
              >
                <h1
                  id="hero-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground-900 leading-tight mb-4"
                >
                  Taste the Best Cuisines, Freshly Delivered
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-8">
                  Experience mouth-watering dishes crafted with fresh
                  ingredients by veteran cooks — delivered to your doorstep
                  faster than ever.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button
                    onClick={() => push("/menu")}
                    size="lg"
                    className="text-lg"
                  >
                    Order Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => push("/menu")}
                    size="lg"
                    variant="outline"
                    className="text-lg"
                  >
                    View Menu
                  </Button>
                </div>
              </motion.div>
              {/* IMAGE */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-center lg:justify-end w-full"
              >
                <Image
                  src="/images/resto.png"
                  alt="Restaurant freshly cooked dishes"
                  width={600}
                  height={400}
                  placeholder="blur"
                  blurDataURL="/images/blur_resto.png"
                  className="rounded-2xl shadow-xl object-cover max-w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 px-6 py-3 gap-4 mt-8 bg-accent/50 rounded-lg">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <Users />
                <h3>50k+</h3>
                <p className=" text-muted-foreground ">Happy Customers</p>
              </motion.div>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <Star />
                <h3>4.8</h3>
                <p className=" text-muted-foreground ">Average Rating</p>
              </motion.div>
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <Clock />
                <h3>30min</h3>
                <p className=" text-muted-foreground ">Delivery Time</p>
              </motion.div>
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <Shield />
                <h3>100%</h3>
                <p className=" text-muted-foreground ">Quality Guarantee</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedDishes({
  featuredDishes,
  isLoading,
}: {
  featuredDishes: MenuItem[];
  isLoading: boolean;
}) {
  const { addItem } = useCart();

  if (isLoading) return <FeaturedDishesSkeleton />;
  if (!featuredDishes) return null;

  return (
    <section
      className="snap-start py-6 md:py-8 lg:py-10"
      aria-labelledby="featured-dishes"
    >
      <div className="flex flex-col text-center">
        <h1
          id="feature-dishes"
          className="text-2xl font-bold text-foreground-900 leading-tight"
        >
          Featured Dishes
        </h1>
        <p className=" text-muted-foreground tracking-tight">
          Discover our best seller dishes and taste the luxury.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-6">
          {featuredDishes.map((f) => (
            <motion.div
              key={f.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ amount: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className=" bg-accent rounded-2xl shadow-md overflow-hidden 
                 hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGE + FAVORITE BUTTON */}
              <div className="relative">
                {/* Favorite Icon */}
                <button
                  className="absolute top-3 right-3 p-2 rounded-full shadow 
                      transition z-10"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>

                {/* Price Badge */}
                <span
                  className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 
                         rounded-full text-sm font-semibold shadow"
                >
                  ₱ {f.price}
                </span>

                <Image
                  src={f.images?.[0] ?? "/images/logo.png"}
                  height={224}
                  width={500}
                  alt={f.name}
                  className="object-cover w-full h-56"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold">{f.name}</h3>

                {/* Rating + Sold */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    {f.rating}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    Sold {f.ratingCount}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                  {f.description}
                </p>

                <AddToCartButton menuItem={f} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddToCartButton({ menuItem }: { menuItem: MenuItem }) {
  const [quantity, setquantity] = useState(1);
  const [selectedOptions, setselectedOptions] = useState([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-primary text-white w-full">
          <ShoppingCart /> Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[90vh] sm:h-auto overflow-auto">
        <DialogHeader>
          <DialogTitle>Add to Cart item?</DialogTitle>
          <DialogDescription>
            Adjust the necessary order of the item
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col my-4 gap-3">
          {/* item details  */}
          <div className="space-y-3">
            <Image
              src={menuItem.images?.[0] ?? "/images/logo.png"}
              height={224}
              width={500}
              alt={menuItem.name}
              className="object-cover w-full h-56 rounded-lg"
            />
            <h2 className="text-xl">{menuItem.name}</h2>
            <span className="text-lg flex items-center gap-4">
              <Star fill="yellow" />
              <p>
                {menuItem.rating} ({menuItem.ratingCount} reviews){" "}
              </p>
            </span>
            <p className="text-muted-foreground tracking-tight">
              {menuItem.description}
            </p>
          </div>
          {/* options */}
          {menuItem.options.map((o, i) => (
            <div key={i} className="space-y-3">
              <span className="text-lg leading-tight">{o.label}</span>
              <RadioGroup defaultValue={o.choices[0].label}>
                {o.choices.map((c, i) => (
                  <div
                    className="bg-accent rounded-lg flex justify-between px-3 py-4 text-start"
                    key={i}
                  >
                    <RadioGroupItem value={c.label} />
                    <label>
                      {c.label} {c.price}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          {/* quantity */}
          <div className="px-2 py-4 flex justify-between bg-accent rounded-lg">
            <span>Quantity</span>
            <span className="flex items-center gap-2">
              <Button
                onClick={() => setquantity((prev) => prev - 1)}
                variant={"outline"}
                disabled={quantity < 2}
              >
                <Minus />
              </Button>
              {quantity}
              <Button
                onClick={() => setquantity((prev) => prev + 1)}
                variant={"outline"}
              >
                <Plus />
              </Button>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeaturedDishesSkeleton() {
  return (
    <section className="snap-start py-6 md:py-8 lg:py-10">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold text-foreground-900 leading-tight">
          Featured Dishes
        </h1>
        <p className="text-muted-foreground tracking-tight">
          Discover our best seller dishes and taste the luxury.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-accent rounded-2xl shadow-md overflow-hidden p-0 animate-pulse"
            >
              {/* Image skeleton */}
              <div className="w-full h-56 bg-muted"></div>

              {/* Content skeleton */}
              <div className="p-5 space-y-3">
                <div className="h-5 w-32 bg-muted rounded"></div>

                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>

                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
                <div className="h-10 w-full bg-muted rounded-xl mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
