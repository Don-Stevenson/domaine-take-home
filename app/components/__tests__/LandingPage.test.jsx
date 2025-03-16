import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {LandingPage} from '../LandingPage';

// Mock the Image and Money components from Shopify Hydrogen
jest.mock('@shopify/hydrogen', () => ({
  Image: ({data, aspectRatio, sizes, className}) => (
    <img
      src={data?.url || 'mock-image-url'}
      alt={data?.altText || 'Product'}
      data-aspect-ratio={aspectRatio}
      data-sizes={sizes}
      className={className}
      data-testid="hydrogen-image"
    />
  ),
  Money: ({data}) => (
    <span data-testid="money-component">
      ${data?.amount || '0.00'} {data?.currencyCode || 'USD'}
    </span>
  ),
}));

describe('LandingPage', () => {
  const mockProps = {
    money: {
      amount: '19.99',
      currencyCode: 'USD',
    },
    image: {
      url: 'test-product.jpg',
      width: 800,
      height: 800,
    },
    title: 'Test Product',
  };

  it('renders the component correctly', () => {
    render(<LandingPage {...mockProps} />);

    // Check for main heading
    expect(screen.getByText('Our Latest Products')).toBeInTheDocument();

    // Check for description text
    expect(
      screen.getByText(/Check out our latest sale items below/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Quality t-shirts at unbeatable prices!/),
    ).toBeInTheDocument();

    // Check for product title
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Check for price label
    expect(screen.getByText('Special Price')).toBeInTheDocument();

    // Check for money component
    expect(screen.getByTestId('money-component')).toBeInTheDocument();

    // Check for image
    const image = screen.getByTestId('hydrogen-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-aspect-ratio', '1/1');
    expect(image).toHaveAttribute(
      'data-sizes',
      '(min-width: 640px) 50vw, (min-width: 768px) 40vw, (min-width: 1024px) 30vw, 90vw',
    );
    expect(image).toHaveClass('rounded-lg');
    expect(image).toHaveClass('mx-auto');
  });

  it('displays the correct product title', () => {
    render(<LandingPage {...mockProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays the correct price', () => {
    render(<LandingPage {...mockProps} />);
    const moneyComponent = screen.getByTestId('money-component');
    expect(moneyComponent).toHaveTextContent('$19.99 USD');
  });

  it('renders with a different product title', () => {
    const customProps = {
      ...mockProps,
      title: 'Custom Product Name',
    };

    render(<LandingPage {...customProps} />);
    expect(screen.getByText('Custom Product Name')).toBeInTheDocument();
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  it('renders with a different price', () => {
    const customProps = {
      ...mockProps,
      money: {
        amount: '29.99',
        currencyCode: 'CAD',
      },
    };

    render(<LandingPage {...customProps} />);
    const moneyComponent = screen.getByTestId('money-component');
    expect(moneyComponent).toHaveTextContent('$29.99 CAD');
  });

  it('applies responsive styling classes correctly', () => {
    render(<LandingPage {...mockProps} />);

    // Check main container
    const mainContainer = screen
      .getByText('Our Latest Products')
      .closest('div').parentElement;
    expect(mainContainer).toHaveClass('flex flex-col gap-4 sm:gap-8');

    // Check heading
    const heading = screen.getByText('Our Latest Products');
    expect(heading).toHaveClass('text-[#0A4874]');
    expect(heading).toHaveClass('font-roboto');
    expect(heading).toHaveClass('font-medium');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('sm:text-3xl');
    expect(heading).toHaveClass('md:text-4xl');

    // Check product card container
    const productCard = screen.getByText('Test Product').closest('div');
    expect(productCard).toHaveClass('border');
    expect(productCard).toHaveClass('border-[#E8E8E8]');
    expect(productCard).toHaveClass('rounded-xl');
    expect(productCard).toHaveClass('bg-white');
    expect(productCard).toHaveClass('shadow-sm');
  });
});
