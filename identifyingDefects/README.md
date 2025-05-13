# Product Validator

Automated tests to validate data provided by a public API (https://fakestoreapi.com/products) to detect errors and anomalies in product data.

## Features

- Fetches real product data from the public API
- Validates each product for:
  - Non-empty `title`
  - Non-negative `price`
  - `rating.rate` not exceeding 5
- Generates and prints a list of products containing defects
- Uses Jest for automated testing

## Project Structure

```
identifyingDefects/
├── services/                # Business logic and API interaction
│   └── product-validator.service.ts
├── tests/                   # Automated tests
│   └── product-validator.integration.spec.ts
├── types/                   # TypeScript types
│   └── product.types.ts
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Jest configuration
└── README.md                # Project documentation
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the integration test

```bash
npm test
```

The test will:

- Fetch products from the public API
- Validate each product
- Print a list of defective products (if any) to the console

## Validation Rules

- **title**: must not be empty
- **price**: must not be negative
- **rating.rate**: must not exceed 5

## Example Output

```
Defective products: [
  {
    productId: 2,
    defects: [
      'Title is empty',
      'Price is negative',
      'Rating exceeds maximum value of 5'
    ]
  }
]
```

## License

MIT
