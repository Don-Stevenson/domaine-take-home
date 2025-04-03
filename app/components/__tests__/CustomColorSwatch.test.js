import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {CustomColorSwatch} from '../CustomColorSwatch';

describe('CustomColorSwatch', () => {
  const mockColorOptions = [
    {
      name: 'Blue',
      swatch: {
        image: {
          previewImage: {
            url: 'blue-swatch.jpg',
          },
        },
      },
    },
    {
      name: 'Green',
      swatch: null,
    },
    {
      name: 'Orange',
      swatch: {
        image: {
          previewImage: {
            url: 'orange-swatch.jpg',
          },
        },
      },
      firstSelectableVariant: {
        availableForSale: true,
      },
    },
  ];

  const mockSetSelectedColor = jest.fn();

  beforeEach(() => {
    mockSetSelectedColor.mockClear();
  });

  it('renders all color options', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={{selectedOptions: [{value: 'Blue'}]}}
      />,
    );

    expect(screen.getByTitle('Blue')).toBeInTheDocument();
    expect(screen.getByTitle('Green')).toBeInTheDocument();
    expect(screen.getByTitle('Orange')).toBeInTheDocument();
  });

  it('applies selected styling to the currently selected color', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor="Green"
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={null}
      />,
    );

    const greenButton = screen.getByTitle('Green');
    expect(greenButton).toHaveClass('ring-1');
    expect(greenButton).toHaveClass('ring-[#0A4874]');
  });

  it('applies selected styling based on currentColorVariant when no selectedColor', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={{selectedOptions: [{value: 'Blue'}]}}
      />,
    );

    const blueButton = screen.getByTitle('Blue');
    expect(blueButton).toHaveClass('ring-1');
    expect(blueButton).toHaveClass('ring-[#0A4874]');
  });

  it('calls setSelectedColor with the correct color name when clicked', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={null}
      />,
    );

    fireEvent.click(screen.getByTitle('Orange'));

    expect(mockSetSelectedColor).toHaveBeenCalledWith('Orange');
  });

  it('sets background image when swatch image is available', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={null}
      />,
    );

    const blueButton = screen.getByTitle('Blue');
    expect(blueButton).toHaveStyle({
      backgroundImage: 'url(blue-swatch.jpg)',
    });
  });

  it('uses color code for background when no swatch image is available', () => {
    render(
      <CustomColorSwatch
        colorOptions={mockColorOptions}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
        currentColorVariant={null}
      />,
    );

    const greenButton = screen.getByTitle('Green');
    expect(greenButton).toHaveStyle({
      backgroundColor: '#006600',
    });
  });
});
