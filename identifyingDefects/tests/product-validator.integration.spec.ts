import axios from 'axios';
import { ProductValidatorService } from '../services/product-validator.service';
import { Product } from '../types/product.types';

describe('ProductValidatorService Integration', () => {
    let service: ProductValidatorService;

    beforeAll(() => {
        service = new ProductValidatorService();
    });

    it('should fetch products from the public API, validate them, and print defects', async () => {
        // Arrange & Act
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        const products = response.data;

        // Assert: response code
        expect(response.status).toBe(200);

        // Validate products
        const validation = service.validateProducts(products);

        // Print defective products for visibility
        console.log('Defective products:', validation.defectiveProducts);

        // The test will pass even if there are defects, as this is the purpose of the check
        expect(Array.isArray(validation.defectiveProducts)).toBe(true);
    });
}); 