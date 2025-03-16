import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {ProductDetails} from '../ProductDetails';

// Mock the typography components
jest.mock('../typography/ProductCardFont', () => ({
  PriceDisplay: ({children, className, textColorClasses}) => (
    <div
      data-testid="price-display"
      className={className}
      data-color-classes={textColorClasses}
    >
      {children}
    </div>
  ),
  ProductCardTitle: ({children}) => (
    <div data-testid="product-title">{children}</div>
  ),
  ProductCardVendor: ({children}) => (
    <div data-testid="product-vendor">{children}</div>
  ),
}));

describe('ProductDetails', () => {
  const mockFormatPrice = jest.fn((price) => `$${price}`);

  const defaultProps = {
    vendor: 'Test Vendor',
    title: 'Test Product',
    isOnSale: false,
    currentColorVariant: {
      price: '19.99',
      compareAtPrice: null,
    },
    formatPrice: mockFormatPrice,
  };

  beforeEach(() => {
    mockFormatPrice.mockClear();
  });

  it('renders vendor and title correctly', () => {
    render(<ProductDetails {...defaultProps} />);

    expect(screen.getByTestId('product-vendor')).toHaveTextContent(
      'Test Vendor',
    );
    expect(screen.getByTestId('product-title')).toHaveTextContent(
      'Test Product',
    );
  });

  it('does not render vendor when not provided', () => {
    render(<ProductDetails {...defaultProps} vendor={null} />);

    expect(screen.queryByTestId('product-vendor')).not.toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(<ProductDetails {...defaultProps} title={null} />);

    expect(screen.getByTestId('product-vendor')).toBeInTheDocument();
    expect(screen.queryByTestId('product-title')).not.toBeInTheDocument();
  });

  it('renders regular price when not on sale', () => {
    render(<ProductDetails {...defaultProps} />);

    const priceElements = screen.getAllByTestId('price-display');
    expect(priceElements).toHaveLength(1);
    expect(priceElements[0]).not.toHaveClass('line-through');
    expect(mockFormatPrice).toHaveBeenCalledWith('19.99');
  });

  it('renders sale and compare-at prices when on sale', () => {
    render(
      <ProductDetails
        {...defaultProps}
        isOnSale={true}
        currentColorVariant={{
          price: '19.99',
          compareAtPrice: '29.99',
        }}
      />,
    );

    const priceElements = screen.getAllByTestId('price-display');
    expect(priceElements).toHaveLength(2);

    // First price should be the compare-at price (strikethrough)
    expect(priceElements[0]).toHaveClass('line-through');

    // Second price should be the sale price (red)
    expect(priceElements[1]).toHaveAttribute(
      'data-color-classes',
      'text-red-500',
    );

    expect(mockFormatPrice).toHaveBeenCalledWith('29.99');
    expect(mockFormatPrice).toHaveBeenCalledWith('19.99');
  });

  it('handles missing price data gracefully', () => {
    render(
      <ProductDetails
        {...defaultProps}
        currentColorVariant={{
          price: null,
          compareAtPrice: null,
        }}
      />,
    );

    expect(screen.getByTestId('price-display')).toBeInTheDocument();
    expect(mockFormatPrice).not.toHaveBeenCalled();
  });
});
