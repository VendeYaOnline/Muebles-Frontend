"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQueryFeatured } from "@/api/queries";

export default function ProductCarousel() {
  const { data, isLoading } = useQueryFeatured(1, "");
  return (
    <div className="mt-20 mb-20 px-4 sm:px-6 lg:px-8 max-w-7xl m-auto">
      <h2 className="mx-auto text-2xl font-semibold text-gray-800 md:text-left lg:text-left xl:text-left text-center mb-6">
        Promociones imperdibles
      </h2>
      {isLoading ? (
        <div className="w-full mx-auto h-[625px] bg-gray-900 rounded-lg flex justify-center items-center">
          <div className="loader" />
        </div>
      ) : (
        data &&
        data.products.length > 0 && (
          <div className="w-full mx-auto p-4 bg-gray-900 rounded-lg">
            <Carousel className="w-full" opts={{ slidesToScroll: 1 }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {data.products.map(({ product, id }) => (
                  <CarouselItem
                    key={id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="relative bg-white">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2 text-indigo-500 hover:text-indigo-600"
                      >
                        <Plus className="h-6 w-6" />
                      </Button>
                      <CardContent className="p-4">
                        <div className="aspect-square relative mb-4">
                          <Image
                            src={product.image_product || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        {/*     <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-gray-500">
                          ({product.reviews})
                        </span>
                      </div> */}
                        <h3 className="font-medium text-sm mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-gray-500 line-through text-sm">
                            {product.price}
                          </p>
                          <p className="text-2xl font-bold text-indigo-600">
                            {product.discount_price}
                            <span className="text-sm font-normal ml-1">
                              Hoy
                            </span>
                          </p>
                        </div>
                      </CardContent>
                      {/*          <CardFooter className="p-4 pt-0">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="h-4 w-4" />
                          <span>{product.discount_price}</span>
                          <Button
                            variant="link"
                            className="text-xs text-indigo-600 p-0 h-auto"
                          >
                            Aplican T&C
                          </Button>
                        </div>
                      </CardFooter> */}
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>

            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === 0 ? "bg-indigo-600" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
