import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {CarouselDots} from '../CarouselDots';

describe('CarouselDots', () => {
  const mockSetCurrentImageIndex = jest.fn();

  beforeEach(() => {
    mockSetCurrentImageIndex.mockClear();
  });

  it('renders with active state when index matches currentImageIndex', () => {
    render(
      <CarouselDots
        index={0}
        currentImageIndex={0}
        setCurrentImageIndex={mockSetCurrentImageIndex}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-600');
    expect(button).not.toHaveClass('bg-gray-300');
  });

  it('renders with inactive state when index does not match currentImageIndex', () => {
    render(
      <CarouselDots
        index={1}
        currentImageIndex={0}
        setCurrentImageIndex={mockSetCurrentImageIndex}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-300');
    expect(button).not.toHaveClass('bg-gray-600');
  });

  it('calls setCurrentImageIndex with correct index when clicked', () => {
    render(
      <CarouselDots
        index={2}
        currentImageIndex={0}
        setCurrentImageIndex={mockSetCurrentImageIndex}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetCurrentImageIndex).toHaveBeenCalledWith(2);
  });

  it('has correct aria-label for accessibility', () => {
    render(
      <CarouselDots
        index={0}
        currentImageIndex={0}
        setCurrentImageIndex={mockSetCurrentImageIndex}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'View image 1');
  });

  it('maintains consistent dimensions', () => {
    render(
      <CarouselDots
        index={0}
        currentImageIndex={0}
        setCurrentImageIndex={mockSetCurrentImageIndex}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-2', 'h-2');
  });
});
