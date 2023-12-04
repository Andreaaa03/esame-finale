export type AllEvents = {
    id: number;
    name: string;
    coverImage: string;
    date: string;
    description: {
        short: string;
    };
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: boolean;
}[];

export type SingleEvent = {
    id: number;
    name: string;
    coverImage: string;
    date: string;
    description: {
        long: string[];
        short: string;
    };
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: true;
    includedDishes: [
        {
            name: string;
            description: string;
            allergens: string[];
        }
    ];
} | {
    id: number;
    name: string;
    coverImage: string;
    date: string;
    description: {
        long: string[];
        short: string;
    };
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: false; // Se isAperitivoIncluded è false, questo campo non è presente
};

