import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

interface HomeProps {
  searchParams: {
    manufacturer?: string;
    model?: string;
    year?: string;
    fuel?: string;
    limit?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer || "",
    model: searchParams?.model || "",
    year: searchParams?.year ? Number(searchParams.year) : undefined,
    fuel: searchParams?.fuel || "",
    limit: searchParams?.limit ? Number(searchParams.limit) : undefined,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

      {!isDataEmpty ? (
        <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, idx) => (
                <CarCard key={`${car.make}-${car.model}-${car.year}-${idx}`} car={car} />
              ))}

            </div>
        </section>
      ): (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p className="text-center">Try another make/model or reduce filters. If the issue persists the API may be rate-limited.</p>
        </div>
      )}

      </div>
    </main>
  );
}
