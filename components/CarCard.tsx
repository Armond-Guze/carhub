"use client";

import { CarProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "./CustomButton";

interface CarCardprops {
  car: CarProps;
}

const CarCard = ({ car }: CarCardprops) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content">
          {make} {model}
        </h2>
      </div>

      <p>
        <span>
            Car Rent...
        </span>
      </p>
    </div>
  );
};

export default CarCard;
