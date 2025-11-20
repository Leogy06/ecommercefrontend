"use client";

import { Button } from "@/components/ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { ArrowRight, Clock, Heart, Shield, Star, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

interface FeaturedDishesProp {
  id: number;
  name: string;
  rating: number;
  sold: number;
  price: number;
  description: string;
  img: string;
}

export default function Landing() {
  const { push } = useRouterTransition();

  const [featuredDishes, setFeaturedDishes] = useState([
    {
      id: 1,
      name: "Classic Burger",
      rating: 4.5,
      sold: 100,
      price: 50,
      description: "Juicy beef patty with fresh lettuce and tomato.",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      rating: 4.7,
      sold: 150,
      price: 198,
      description: "Fresh mozzarella, basil, and tomato sauce on a thin crust.",
      img: "https://media.istockphoto.com/id/1907940102/photo/margarita-pizza.jpg?s=1024x1024&w=is&k=20&c=lXoERJRr_HPQ2fRXSW9qWgVg1gU1bYK6qnLR4KAGK0w=",
    },
    {
      id: 3,
      name: "Caesar Salad",
      rating: 4.3,
      sold: 80,
      price: 84,
      description: "Crisp romaine lettuce with Caesar dressing and croutons.",
      img: "https://images.unsplash.com/photo-1656002609059-29bd82325682?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Spaghetti Carbonara",
      rating: 4.6,
      sold: 90,
      price: 88,
      description: "Creamy pasta with pancetta, egg, and Parmesan cheese.",
      img: "https://images.unsplash.com/photo-1679584410403-d03357e2e219?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Grilled Salmon",
      rating: 4.8,
      sold: 60,
      price: 170,
      description: "Tender salmon fillet with lemon butter sauce.",
      img: "https://cdn.pixabay.com/photo/2014/01/09/15/31/pasta-241146_960_720.jpg",
    },
  ]);

  return (
    <main className="flex flex-col gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
      <HeroSection push={push} />
      <FeaturedDishes featuredDishes={featuredDishes} />
    </main>
  );
}

function HeroSection({ push }: { push: (path: string) => void }) {
  return (
    <section
      className="min-h-screen py-16 sm:py-20 bg-linear-to-b from-red-100/40 to-transparent dark:from-red-500/20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              Experience mouth-watering dishes crafted with fresh ingredients by
              veteran cooks — delivered to your doorstep faster than ever.
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
        <div className="grid grid-cols-2 md:grid-cols-4 px-6 py-3 gap-4 mt-8">
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
    </section>
  );
}

function FeaturedDishes({
  featuredDishes,
}: {
  featuredDishes: FeaturedDishesProp[];
}) {
  return (
    <section>
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
                  src={`${f.img}`}
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
                    Sold {f.sold}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                  {f.description}
                </p>

                <Button className="w-full rounded-xl mt-3">Add to Cart</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
