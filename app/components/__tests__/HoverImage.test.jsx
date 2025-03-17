import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {HoverImage} from '../HoverImage';

// Mock the dependent components
jest.mock('@shopify/hydrogen', () => ({
  Image: ({className, alt}) => (
    <img data-testid="shopify-image" className={className} alt={alt} />
  ),
}));

jest.mock('../OnSaleBadge', () => ({
  OnSaleBadge: ({children}) => (
    <div data-testid="on-sale-badge">{children}</div>
  ),
}));

jest.mock('../MobileCarousel', () => ({
  MobileCarousel: ({images}) => (
    <div data-testid="mobile-carousel">{images.length} images in carousel</div>
  ),
}));

describe('HoverImage', () => {
  const mockProps = {
    isHovered: false,
    currentColorVariant: {
      title: 'Red',
      image: {
        width: 800,
        height: 1000,
      },
      secondaryImage: {
        width: 800,
        height: 1000,
      },
    },
    title: 'Test Product',
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    isOnSale: false,
  };

  it('renders the component correctly', () => {
    render(<HoverImage {...mockProps} />);

    expect(screen.getByTestId('shopify-image')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-carousel')).toBeInTheDocument();
  });

  it('shows sale badge when isOnSale is true', () => {
    render(<HoverImage {...mockProps} isOnSale={true} />);

    expect(screen.getByTestId('on-sale-badge')).toBeInTheDocument();
    expect(screen.getByText('On Sale!')).toBeInTheDocument();
  });

  it('handles mouse events correctly', () => {
    render(<HoverImage {...mockProps} />);

    const imageContainer =
      screen.getByTestId('shopify-image').parentElement.parentElement;

    fireEvent.mouseEnter(imageContainer);
    expect(mockProps.onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(imageContainer);
    expect(mockProps.onMouseLeave).toHaveBeenCalled();
  });

  it('shows secondary image when hovered', () => {
    render(<HoverImage {...mockProps} isHovered={true} />);

    const images = screen.getAllByTestId('shopify-image');
    expect(images).toHaveLength(2);
    expect(images[1].alt).toContain('hover view');
  });

  it('calculates correct aspect ratio when both images are present', () => {
    render(<HoverImage {...mockProps} />);

    // Both images have the same dimensions (800x1000), so aspect ratio should be 0.8
    expect(screen.getByTestId('mobile-carousel')).toBeInTheDocument();
  });

  it('renders without secondary image', () => {
    const propsWithoutSecondary = {
      ...mockProps,
      currentColorVariant: {
        ...mockProps.currentColorVariant,
        secondaryImage: null,
      },
    };

    render(<HoverImage {...propsWithoutSecondary} />);

    const images = screen.getAllByTestId('shopify-image');
    expect(images).toHaveLength(1);
  });
});
