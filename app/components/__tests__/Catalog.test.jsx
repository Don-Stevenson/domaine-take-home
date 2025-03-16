import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Catalog} from '../Catalog';

// Mock the Hydrogen components
jest.mock('@shopify/hydrogen', () => ({
  Image: ({data, className}) => (
    <img
      data-testid="product-image"
      src={data?.url || 'mock-image-url'}
      alt="Product"
      className={className}
    />
  ),
  Money: ({data}) => (
    <span data-testid="product-price">
      ${data?.amount || '19.99'} {data?.currencyCode || 'USD'}
    </span>
  ),
}));

describe('Catalog', () => {
  const mockProduct = {
    title: 'Test T-Shirt',
    featuredImage: {
      url: 'test-image.jpg',
      altText: 'Test T-Shirt Image',
    },
    priceRange: {
      minVariantPrice: {
        amount: '19.99',
        currencyCode: 'USD',
      },
    },
  };

  it('renders the component correctly', () => {
    render(<Catalog product={mockProduct} />);

    // Check for heading elements
    expect(screen.getByText('Current Catalog')).toBeInTheDocument();
    expect(screen.getByText('Test T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Special Price')).toBeInTheDocument();

    // Check for product description
    expect(
      screen.getByText(/Check out our current catalog below/),
    ).toBeInTheDocument();

    // Check for product image and price
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toBeInTheDocument();
  });

  it('renders without featuredImage when not provided', () => {
    const productWithoutImage = {
      ...mockProduct,
      featuredImage: null,
    };

    render(<Catalog product={productWithoutImage} />);

    // Should not find the image
    expect(screen.queryByTestId('product-image')).not.toBeInTheDocument();

    // Other elements should still be present
    expect(screen.getByText('Test T-Shirt')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toBeInTheDocument();
  });
});
