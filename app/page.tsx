"use client";

import { Button } from "@/components/ui/button";
import { useRouterTransition } from "@/context/RouterTransitionContext";
import { ArrowRight, Clock, Shield, Star, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Landing() {
  const { push } = useRouterTransition();

  return (
    <main className="flex flex-col gap-4">
      <HeroSection push={push} />
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
        </div>
      </section>
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
            viewport={{ once: true }}
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
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
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
          <div className="flex flex-col items-center">
            <Users />
            <h3>50k+</h3>
            <p className=" text-muted-foreground ">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center">
            <Star />
            <h3>4.8</h3>
            <p className=" text-muted-foreground ">Average Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock />
            <h3>30min</h3>
            <p className=" text-muted-foreground ">Delivery Time</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield />
            <h3>100%</h3>
            <p className=" text-muted-foreground ">Quality Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
