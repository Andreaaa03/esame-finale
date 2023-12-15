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
};

export type SingleEvent = {
    id: number;
    name: string;
    coverImage: string;
    date: string;
    date_modified: string;
    description: {
        long: string[];
        short: string;
    };
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: boolean;
    includedDishes: [
        {
            name: string;
            description: string;
            allergens: string[];
        }
    ];
    time: string[];
};

