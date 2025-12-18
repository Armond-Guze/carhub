"use client";

import { CarProps } from "@/types";
import Image from "next/image";
import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const specs = [
    { label: "Transmission", value: car.transmission === "a" ? "Automatic" : "Manual" },
    { label: "Drivetrain", value: car.drive.toUpperCase() },
    { label: "Fuel", value: car.fuel_type ? car.fuel_type.toUpperCase() : "N/A" },
    { label: "City MPG", value: `${car.city_mpg} mpg` },
    { label: "Combined MPG", value: `${car.combination_mpg} mpg` },
    { label: "Cylinders", value: car.cylinders?.toString() ?? "-" },
    { label: "Year", value: car.year?.toString() ?? "-" },
  ];

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as='div'
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as='div'
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-100"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              ></TransitionChild>
              <DialogPanel className='car-details__dialog-panel'>
                <button className='car-details__close-btn' title='Close' type="button" onClick={closeModal}>
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                <div className="flex-1 flex flex-col gap-5">
                  <div className="relative w-full h-40 rounded-lg bg-gradient-to-br from-primary-blue/90 via-primary-blue to-slate-200 flex items-center justify-center text-white text-center px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm uppercase tracking-wide opacity-80">{car.make}</span>
                      <span className="text-2xl font-semibold capitalize leading-tight">{car.model}</span>
                      <span className="text-sm opacity-80">{car.year} • {car.drive.toUpperCase()} • {car.fuel_type?.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold capitalize">Details</h2>
                    <p className="text-sm text-gray-500">Specs at a glance to help you decide quickly.</p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {specs.map((item) => (
                        <div key={item.label} className="flex justify-between text-sm">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Built to keep trips easy—comfortable ride, predictable handling, and ready for daily errands or a weekend detour. Maintenance and insurance are handled so you can just pick it up and drive.
                    </p>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
