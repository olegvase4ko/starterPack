export interface ProductRating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: ProductRating;
}

export interface ProductValidationResult {
    productId: number;
    defects: string[];
}

export interface ValidationSummary {
    totalProducts: number;
    defectiveProducts: ProductValidationResult[];
    hasDefects: boolean;
} 