"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchManufacturer } from "./";
import CustomButton from "./CustomButton";

const SearchBar = () => {
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") return;

    const searchParams = new URLSearchParams(window.location.search);

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer.toLowerCase());
    } else {
      searchParams.delete("manufacturer");
    }

    if (model) {
      searchParams.set("model", model.toLowerCase());
    } else {
      searchParams.delete("model");
    }

    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
      </div>

      <div className="searchbar__item">
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model (e.g. corolla)"
          className="searchbar__input"
        />
      </div>

      <CustomButton
        title="Search"
        BtnType="submit"
        containerStyles="bg-primary-blue text-white rounded-full"
      />
    </form>
  );
};

export default SearchBar;