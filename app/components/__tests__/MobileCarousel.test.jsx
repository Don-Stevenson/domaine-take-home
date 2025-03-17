import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {MobileCarousel} from '../MobileCarousel';

jest.mock('@shopify/hydrogen', () => ({
  Image: ({data, className, alt}) => (
    <img src={data.url} className={className} alt={alt} />
  ),
}));

describe('MobileCarousel', () => {
  const mockImages = [
    {
      image: {
        url: 'image1.jpg',
        width: 800,
        height: 800,
        altText: 'First product image',
      },
      alt: 'First product image',
    },
    {
      image: {
        url: 'image2.jpg',
        width: 800,
        height: 800,
        altText: 'Second product image',
      },
      alt: 'Second product image',
    },
  ];

  const mockSetCurrentImageIndex = jest.fn();
  const defaultProps = {
    images: mockImages,
    currentImageIndex: 0,
    setCurrentImageIndex: mockSetCurrentImageIndex,
    containerStyle: {maxWidth: '500px'},
  };

  beforeEach(() => {
    mockSetCurrentImageIndex.mockClear();
  });

  it('renders the component with initial image', () => {
    render(<MobileCarousel {...defaultProps} />);

    const button = screen.getByRole('button', {name: 'View secondary image'});
    expect(button).toHaveAttribute('aria-label', 'View secondary image');
    expect(screen.getByAltText('First product image')).toBeInTheDocument();
  });

  it('renders carousel dots when multiple images exist', () => {
    render(<MobileCarousel {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // Main button + 2 dots
  });

  it('does not render carousel dots with single image', () => {
    render(<MobileCarousel {...defaultProps} images={[mockImages[0]]} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1); // Only main button
  });

  it('switches image on main button click', () => {
    render(<MobileCarousel {...defaultProps} />);

    const mainButton = screen.getByRole('button', {
      name: 'View secondary image',
    });
    fireEvent.click(mainButton);

    expect(mockSetCurrentImageIndex).toHaveBeenCalled();
  });

  it('switches image on keyboard interaction', () => {
    render(<MobileCarousel {...defaultProps} />);

    const mainButton = screen.getByRole('button', {
      name: 'View secondary image',
    });

    fireEvent.keyDown(mainButton, {key: 'Enter'});
    expect(mockSetCurrentImageIndex).toHaveBeenCalled();

    fireEvent.keyDown(mainButton, {key: ' '});
    expect(mockSetCurrentImageIndex).toHaveBeenCalled();
  });

  it('applies custom container styles', () => {
    const customStyle = {maxWidth: '600px', backgroundColor: 'red'};
    render(<MobileCarousel {...defaultProps} containerStyle={customStyle} />);

    const container = screen.getByRole('button', {
      name: 'View secondary image',
    });
    expect(container).toHaveStyle(customStyle);
  });

  it('updates aria-label based on currentImageIndex', () => {
    const {rerender} = render(<MobileCarousel {...defaultProps} />);

    let mainButton = screen.getByRole('button', {name: 'View secondary image'});
    expect(mainButton).toHaveAttribute('aria-label', 'View secondary image');

    rerender(<MobileCarousel {...defaultProps} currentImageIndex={1} />);

    mainButton = screen.getByRole('button', {name: 'View primary image'});
    expect(mainButton).toHaveAttribute('aria-label', 'View primary image');
  });

  it('handles missing image data gracefully', () => {
    const imagesWithMissingData = [
      {image: null, alt: 'Missing image'},
      ...mockImages,
    ];

    render(<MobileCarousel {...defaultProps} images={imagesWithMissingData} />);

    // Should still render without crashing
    const mainButton = screen.getByRole('button', {
      name: 'View secondary image',
    });
    expect(mainButton).toBeInTheDocument();
  });
});
