"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/redux/api/categoryApiSlice";
import { useGetMenuItemsQuery } from "@/redux/api/menuItemApiSlice";
import { Categories as CategoryType, MenuItem } from "@/types";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { AddToCartButton } from "../page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DishFilter = "popular" | "cheapest" | "expensive";

export default function Menu() {
  const [menuCategory, setMenuCategory] = useState("");
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const [dishFilter, setdishFilter] = useState<DishFilter>("popular");

  const { data: menuItems, isLoading: isMenuItemLoading } =
    useGetMenuItemsQuery(menuCategory);

  const handleChangeMenuCategory = (categoryId: string) => {
    setMenuCategory(categoryId);
  };

  const handleChangeDishFilter = (val: DishFilter) => {
    setdishFilter(val);
  };

  const memoMenuItems = useMemo(() => {
    if (!menuItems) return [];

    let sorted = [...menuItems];

    switch (dishFilter) {
      case "cheapest":
        sorted.sort((a, b) => a.price - b.price);

        break;
      case "expensive":
        sorted.sort((a, b) => b.price - a.price);

        break;

      case "popular":
      default:
        break;
    }

    return sorted;
  }, [menuItems, dishFilter]);

  return (
    <>
      <h1 className="text-2xl font-bold">Our Menu</h1>
      <p className="text-muted-foreground ">
        Discover dishes you will actually love!
      </p>
      <Categories
        categories={categories || []}
        isLoading={isCategoriesLoading}
        handleChangeMenuCategory={handleChangeMenuCategory}
        menuCategory={menuCategory}
        handleChangeDishFilter={handleChangeDishFilter}
        dishFilter={dishFilter}
      />
      <MenuItems
        menuItems={memoMenuItems || []}
        isLoading={isMenuItemLoading}
      />
    </>
  );
}

function Categories({
  categories,
  isLoading,
  handleChangeMenuCategory,
  menuCategory,
  handleChangeDishFilter,
  dishFilter,
}: {
  categories: CategoryType[];
  isLoading: boolean;
  handleChangeMenuCategory: (param: string) => void;
  menuCategory: string;
  handleChangeDishFilter: (val: DishFilter) => void;
  dishFilter: DishFilter;
}) {
  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24" />
        ))}
      </div>
    );
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "linear", delay: 0.8 }}
      viewport={{ amount: 0.3, once: true }}
      className="gap-4 flex flex-col md:flex-row justify-between overflow-x-auto overflow-y-hidden"
    >
      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleChangeMenuCategory("")}
          variant={menuCategory === "" ? "default" : "outline"}
        >
          All
        </Button>
        {categories?.map((c) => (
          <Button
            variant={menuCategory === c.id ? "default" : "outline"}
            key={c.id}
            onClick={() => handleChangeMenuCategory(c.id)}
          >
            {c.name}
          </Button>
        ))}
      </div>
      <Select onValueChange={(val: DishFilter) => handleChangeDishFilter(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={dishFilter.toLocaleUpperCase()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter by</SelectLabel>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="cheapest">Price low to high</SelectItem>
            <SelectItem value="expensive">Price high to low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </motion.div>
  );
}

function MenuItems({
  menuItems,
  isLoading,
}: {
  menuItems: MenuItem[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-3">
      {menuItems.map((f) => (
        <motion.div
          key={f.id}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: true }}
          className=" bg-accent rounded-2xl overflow-hidden
                   hover:shadow-xl transition-all duration-300 shadow-primary/50"
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
              placeholder="blur"
              blurDataURL="/images/blur_logo.png"
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
  );
}
