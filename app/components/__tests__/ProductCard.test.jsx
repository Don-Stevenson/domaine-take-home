import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {ProductCard} from '../ProductCard';
import * as HydrogenHooks from '@shopify/hydrogen';

jest.mock('../ProductForm', () => ({
  ProductForm: () => <div data-testid="product-form">Product Form</div>,
}));

jest.mock('../CustomColorSwatch', () => ({
  CustomColorSwatch: ({setSelectedColor}) => (
    <div data-testid="color-swatch">
      <button onClick={() => setSelectedColor('Red')}>Red</button>
      <button onClick={() => setSelectedColor('Blue')}>Blue</button>
    </div>
  ),
}));

jest.mock('../HoverImage', () => ({
  HoverImage: ({onMouseEnter, onMouseLeave}) => (
    <div
      data-testid="hover-image"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Hover Image
    </div>
  ),
}));

jest.mock('../ProductDetails', () => ({
  ProductDetails: () => (
    <div data-testid="product-details">Product Details</div>
  ),
}));

jest.mock('@shopify/hydrogen', () => ({
  useOptimisticVariant: jest.fn(),
  getAdjacentAndFirstAvailableVariants: jest.fn(),
  useSelectedOptionInUrlParam: jest.fn(),
}));

describe('ProductCard', () => {
  const mockProduct = {
    title: 'Test Product',
    vendor: 'Test Vendor',
    selectedOrFirstAvailableVariant: {
      id: 'variant1',
      price: {amount: '19.99', currencyCode: 'USD'},
      compareAtPrice: null,
      selectedOptions: [{name: 'Color', value: 'Red'}],
    },
    options: [
      {
        name: 'Color',
        optionValues: [
          {
            name: 'Red',
            firstSelectableVariant: {
              id: 'variant1',
              price: {amount: '19.99', currencyCode: 'USD'},
              compareAtPrice: null,
            },
          },
          {
            name: 'Blue',
            firstSelectableVariant: {
              id: 'variant2',
              price: {amount: '24.99', currencyCode: 'USD'},
              compareAtPrice: {amount: '29.99', currencyCode: 'USD'},
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    HydrogenHooks.useOptimisticVariant.mockReturnValue(
      mockProduct.selectedOrFirstAvailableVariant,
    );
    HydrogenHooks.getAdjacentAndFirstAvailableVariants.mockReturnValue({});
    HydrogenHooks.useSelectedOptionInUrlParam.mockReturnValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId('hover-image')).toBeInTheDocument();
    expect(screen.getByTestId('color-swatch')).toBeInTheDocument();
    expect(screen.getByTestId('product-details')).toBeInTheDocument();
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });
});
