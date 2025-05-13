import axios from 'axios';
import { Product, ProductValidationResult, ValidationSummary } from '../types/product.types';

export class ProductValidatorService {
    private readonly apiUrl = 'https://fakestoreapi.com/products';

    /**
     * Fetches products from the API
     * @returns Promise with array of products
     */
    public async fetchProducts(): Promise<Product[]> {
        const response = await axios.get<Product[]>(this.apiUrl);
        return response.data;
    }

    /**
     * Validates a single product for defects
     * @param product Product to validate
     * @returns Array of defect descriptions if any found
     */
    private validateProduct(product: Product): string[] {
        const defects: string[] = [];

        if (!product.title || product.title.trim() === '') {
            defects.push('Title is empty');
        }

        if (product.price < 0) {
            defects.push('Price is negative');
        }

        if (product.rating.rate > 5) {
            defects.push('Rating exceeds maximum value of 5');
        }

        return defects;
    }

    /**
     * Validates all products and generates a summary of defects
     * @param products Array of products to validate
     * @returns Validation summary containing defective products
     */
    public validateProducts(products: Product[]): ValidationSummary {
        const defectiveProducts: ProductValidationResult[] = products
            .map(product => ({
                productId: product.id,
                defects: this.validateProduct(product)
            }))
            .filter(result => result.defects.length > 0);

        return {
            totalProducts: products.length,
            defectiveProducts,
            hasDefects: defectiveProducts.length > 0
        };
    }
} 