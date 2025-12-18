export interface FetchCarsFilters {
    manufacturer?: string;
    model?: string;
    fuel?: string;
    year?: number;
    limit?: number;
}

interface VPicModel {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

const demoImages: Record<string, string> = {
    acura: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    audi: "https://images.unsplash.com/photo-1502877828070-33dc5c0bb216?auto=format&fit=crop&w=1200&q=80",
    bmw: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    mercedes: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    toyota: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    honda: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    default: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
};

const imagePool = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    "https://images.unsplash.com/photo-1502877828070-33dc5c0bb216",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1503736334956-d03da6e65f19",
    "https://images.unsplash.com/photo-1503736334956-79c879a09d74",
    "https://images.unsplash.com/photo-1493238792000-8113da705763",
    "https://images.unsplash.com/photo-1492144534655-ccf5b86c27b1",
    "https://images.unsplash.com/photo-1503736334956-d0380f0a1a5c",
];

const buildSpecs = (idx: number) => {
    const city = 24 + (idx % 8);
    const highway = city + 5;
    const year = 2018 + (idx % 6);
    const displacement = 1.6 + (idx % 4) * 0.3;
    const fuelType = idx % 4 === 0 ? "electricity" : "gas";
    return {
        city_mpg: city,
        highway_mpg: highway,
        combination_mpg: Math.round((city * 0.55 + highway * 0.45)),
        cylinders: 4,
        displacement: Number(displacement.toFixed(1)),
        drive: idx % 3 === 0 ? "awd" : "fwd",
        fuel_type: fuelType,
        transmission: idx % 2 === 0 ? "a" : "m",
        year,
    };
};

export const getImageForMake = (make: string) => {
    const key = make.toLowerCase();
    return demoImages[key] || demoImages.default;
};

export const getImageForCar = (make: string, model: string) => {
    const key = `${make}-${model}`.toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash + key.charCodeAt(i) * (i + 1)) % 9973;
    }
    const picked = imagePool[hash % imagePool.length] || demoImages.default;
    return `${picked}?auto=format&fit=crop&w=900&q=80`;
};

const defaultMakes = [
    "toyota",
    "honda",
    "ford",
    "bmw",
    "audi",
    "nissan",
    "mercedes",
    "volkswagen",
];

const fetchModelsForMake = async (
    make: string,
    {
        model,
        fuel,
        year,
    }: { model?: string; fuel?: string; year?: number },
    indexOffset: number
) => {
    try {
        const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch cars", make, response.status, errorText);
            return [] as Array<ReturnType<typeof buildSpecs> & { make: string; model: string; image: string; }>;
        }

        const data = await response.json();
        const results: VPicModel[] = data?.Results || [];

        const filtered = model
            ? results.filter((item) =>
                  item.Model_Name.toLowerCase().includes(model.toLowerCase())
              )
            : results;

        return filtered.map((item, idx) => {
            const spec = buildSpecs(indexOffset + idx);
            const effectiveFuel = fuel ? fuel.toLowerCase() : spec.fuel_type;
            const effectiveYear = typeof year === "number" ? year : spec.year;

            return {
                ...spec,
                fuel_type: effectiveFuel,
                year: effectiveYear,
                class: "compact",
                make: item.Make_Name,
                model: item.Model_Name,
                image: getImageForCar(item.Make_Name, item.Model_Name),
            };
        });
    } catch (error) {
        console.error("Unexpected error fetching cars", make, error);
        return [];
    }
};

export async function fetchCars({ manufacturer = "toyota", model = "", fuel = "", year, limit = 20 }: FetchCarsFilters = {}) {
    const makesToFetch = manufacturer ? [manufacturer] : defaultMakes;

    const allCars = await Promise.all(
        makesToFetch.map((make, idx) =>
            fetchModelsForMake(make, { model, fuel, year }, idx * 25)
        )
    );

    const merged = allCars.flat();

    const filteredByOptions = merged.filter((car) => {
        const matchesFuel = fuel ? car.fuel_type.toLowerCase() === fuel.toLowerCase() : true;
        const matchesYear = year ? car.year === year : true;
        return matchesFuel && matchesYear;
    });

    return filteredByOptions.slice(0, limit);
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = (city_mpg || 0) * mileageFactor;
    const vehicleYear = year || new Date().getFullYear();
    const ageRate = (new Date().getFullYear() - vehicleYear) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };