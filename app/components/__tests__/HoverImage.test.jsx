import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {HoverImage} from '../HoverImage';

// Mock the Image component from Shopify Hydrogen
jest.mock('@shopify/hydrogen', () => ({
  Image: ({data, className, alt}) => (
    <img
      src={data?.url || 'mock-image-url'}
      className={className}
      alt={alt}
      data-testid="hydrogen-image"
    />
  ),
}));

// Mock the OnSaleBadge component
jest.mock('../OnSaleBadge', () => ({
  OnSaleBadge: ({children}) => (
    <div data-testid="on-sale-badge">{children}</div>
  ),
}));

describe('HoverImage', () => {
  const mockProps = {
    isHovered: false,
    currentColorVariant: {
      title: 'Red',
      image: {
        url: 'red-image.jpg',
        width: 800,
        height: 600,
      },
      secondaryImage: {
        url: 'red-hover-image.jpg',
        width: 800,
        height: 600,
      },
    },
    title: 'Test Product',
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    isOnSale: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the primary image correctly', () => {
    render(<HoverImage {...mockProps} />);

    const image = screen.getByTestId('hydrogen-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Test Product - Red');
  });

  it('does not render the secondary image when not hovered', () => {
    render(<HoverImage {...mockProps} />);

    const images = screen.getAllByTestId('hydrogen-image');
    expect(images.length).toBe(1);
  });

  it('renders the secondary image when hovered', () => {
    render(<HoverImage {...mockProps} isHovered={true} />);

    const images = screen.getAllByTestId('hydrogen-image');
    expect(images.length).toBe(2);
    expect(images[1]).toHaveAttribute('alt', 'Test Product - Red hover view');
  });

  it('applies custom hover image position classes', () => {
    render(
      <HoverImage
        {...mockProps}
        isHovered={true}
        hoverImagePositionClasses="top-0 right-0"
      />,
    );

    const hoverImageContainer = screen.getByAltText(
      'Test Product - Red hover view',
    ).parentElement;
    expect(hoverImageContainer).toHaveClass('top-0');
    expect(hoverImageContainer).toHaveClass('right-0');
  });

  it('shows the OnSaleBadge when isOnSale is true', () => {
    render(<HoverImage {...mockProps} isOnSale={true} />);

    const saleBadge = screen.getByTestId('on-sale-badge');
    expect(saleBadge).toBeInTheDocument();
    expect(saleBadge).toHaveTextContent('On Sale!');
  });

  it('does not show the OnSaleBadge when isOnSale is false', () => {
    render(<HoverImage {...mockProps} isOnSale={false} />);

    expect(screen.queryByTestId('on-sale-badge')).not.toBeInTheDocument();
  });

  it('calls onMouseEnter when mouse enters the image container', () => {
    render(<HoverImage {...mockProps} />);

    const container = screen
      .getByTestId('hydrogen-image')
      .closest('div').parentElement;
    fireEvent.mouseEnter(container);

    expect(mockProps.onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseLeave when mouse leaves the image container', () => {
    render(<HoverImage {...mockProps} />);

    const container = screen
      .getByTestId('hydrogen-image')
      .closest('div').parentElement;
    fireEvent.mouseLeave(container);

    expect(mockProps.onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('handles missing currentColorVariant gracefully', () => {
    render(<HoverImage {...mockProps} currentColorVariant={null} />);

    expect(screen.queryByTestId('hydrogen-image')).not.toBeInTheDocument();
  });

  it('handles missing image in currentColorVariant gracefully', () => {
    const propsWithoutImage = {
      ...mockProps,
      currentColorVariant: {
        ...mockProps.currentColorVariant,
        image: null,
      },
    };

    render(<HoverImage {...propsWithoutImage} />);

    expect(screen.queryByTestId('hydrogen-image')).not.toBeInTheDocument();
  });

  it('handles missing secondaryImage in currentColorVariant gracefully', () => {
    const propsWithoutSecondaryImage = {
      ...mockProps,
      currentColorVariant: {
        ...mockProps.currentColorVariant,
        secondaryImage: null,
      },
      isHovered: true,
    };

    render(<HoverImage {...propsWithoutSecondaryImage} />);

    const images = screen.getAllByTestId('hydrogen-image');
    expect(images.length).toBe(1); // Only primary image should be shown
  });
});
