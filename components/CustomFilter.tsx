"use client";

import { CustomFilterProps, OptionProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();
  const initialOption = options[0] ?? { title: "Any", value: "" };
  const [selected, setSelected] = useState<OptionProps>(initialOption);

  const updateSearchParams = (option: OptionProps) => {
    const searchParams = new URLSearchParams(window.location.search);
    const key = title.toLowerCase();

    if (option.value) {
      searchParams.set(key, option.value.toLowerCase());
    } else {
      searchParams.delete(key);
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <div className="w-fit">
      <Combobox
        value={selected}
        onChange={(option) => {
          if (!option) return;
          setSelected(option);
          updateSearchParams(option);
        }}
      >
        <div className="relative w-full">
          <Combobox.Button className="custom-filter__btn">
            <span className="block truncate capitalize">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="Select option"
            />
          </Combobox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="custom-filter__options">
              {options.map((option) => (
                <Combobox.Option
                  key={option.value || option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {option.title}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CustomFilter;