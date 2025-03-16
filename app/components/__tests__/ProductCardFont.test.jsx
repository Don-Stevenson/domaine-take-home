import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {
  PriceDisplay,
  ProductCardTitle,
  ProductCardVendor,
} from '../typography/ProductCardFont';

describe('ProductCardFont components', () => {
  describe('PriceDisplay', () => {
    it('renders with default props', () => {
      render(<PriceDisplay>$19.99</PriceDisplay>);

      const element = screen.getByText('$19.99');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-gray-500');
      expect(element).toHaveClass('font-roboto');
      expect(element).toHaveClass('font-normal');
    });

    it('applies custom className', () => {
      render(<PriceDisplay className="custom-class">$19.99</PriceDisplay>);

      const element = screen.getByText('$19.99');
      expect(element).toHaveClass('custom-class');
    });

    it('applies custom text color classes', () => {
      render(
        <PriceDisplay textColorClasses="text-red-500">$19.99</PriceDisplay>,
      );

      const element = screen.getByText('$19.99');
      expect(element).toHaveClass('text-red-500');
      expect(element).not.toHaveClass('text-gray-500');
    });
  });

  describe('ProductCardTitle', () => {
    it('renders with default props', () => {
      render(<ProductCardTitle>Test Product</ProductCardTitle>);

      const element = screen.getByText('Test Product');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-[#0A4874]');
      expect(element).toHaveClass('font-roboto');
      expect(element).toHaveClass('font-medium');
    });

    it('applies custom className', () => {
      render(
        <ProductCardTitle className="custom-class">
          Test Product
        </ProductCardTitle>,
      );

      const element = screen.getByText('Test Product');
      expect(element).toHaveClass('custom-class');
    });

    it('applies custom text color classes', () => {
      render(
        <ProductCardTitle textColorClasses="text-blue-700">
          Test Product
        </ProductCardTitle>,
      );

      const element = screen.getByText('Test Product');
      expect(element).toHaveClass('text-blue-700');
      expect(element).not.toHaveClass('text-[#0A4874]');
    });
  });

  describe('ProductCardVendor', () => {
    it('renders with default props', () => {
      render(<ProductCardVendor>Test Vendor</ProductCardVendor>);

      const element = screen.getByText('Test Vendor');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-[#111111]');
      expect(element).toHaveClass('font-roboto');
      expect(element).toHaveClass('font-normal');
    });

    it('applies custom className', () => {
      render(
        <ProductCardVendor className="custom-class">
          Test Vendor
        </ProductCardVendor>,
      );

      const element = screen.getByText('Test Vendor');
      expect(element).toHaveClass('custom-class');
    });

    it('applies custom text color classes', () => {
      render(
        <ProductCardVendor textColorClasses="text-gray-800">
          Test Vendor
        </ProductCardVendor>,
      );

      const element = screen.getByText('Test Vendor');
      expect(element).toHaveClass('text-gray-800');
      expect(element).not.toHaveClass('text-[#111111]');
    });
  });
});
