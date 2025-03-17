import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {OnSaleBadge} from '../OnSaleBadge';

describe('OnSaleBadge', () => {
  it('renders with default props', () => {
    render(<OnSaleBadge>Sale</OnSaleBadge>);
    const badge = screen.getByText('Sale');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border-red-600');
    expect(badge).toHaveClass('text-red-600');
    expect(badge).toHaveClass('font-medium');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('border');
  });

  it('renders with custom border class', () => {
    render(<OnSaleBadge className="border-blue-500">Sale</OnSaleBadge>);

    const badge = screen.getByText('Sale');
    expect(badge).toHaveClass('border-blue-500');
    expect(badge).not.toHaveClass('border-red-600');
    expect(badge).toHaveClass('text-red-600'); // Default text color should remain
  });

  it('renders with custom text color classes', () => {
    render(<OnSaleBadge textColorClasses="text-green-600">Sale</OnSaleBadge>);

    const badge = screen.getByText('Sale');
    expect(badge).toHaveClass('text-green-600');
    expect(badge).not.toHaveClass('text-red-600');
    expect(badge).toHaveClass('border-red-600'); // Default border should remain
  });

  it('renders with both custom border and text color classes', () => {
    render(
      <OnSaleBadge
        className="border-purple-600"
        textColorClasses="text-purple-600"
      >
        Sale
      </OnSaleBadge>,
    );

    const badge = screen.getByText('Sale');
    expect(badge).toHaveClass('border-purple-600');
    expect(badge).toHaveClass('text-purple-600');
    expect(badge).not.toHaveClass('border-red-600');
    expect(badge).not.toHaveClass('text-red-600');
  });

  it('renders with custom children content', () => {
    render(<OnSaleBadge>Discount</OnSaleBadge>);

    expect(screen.getByText('Discount')).toBeInTheDocument();
    expect(screen.queryByText('Sale')).not.toBeInTheDocument();
  });

  it('applies all default styling classes', () => {
    render(<OnSaleBadge>Sale</OnSaleBadge>);

    const badge = screen.getByText('Sale');
    expect(badge).toHaveClass('md:text-sm');
    expect(badge).toHaveClass('md:leading-[1.12rem]');
    expect(badge).toHaveClass('text-center');
    expect(badge).toHaveClass('md:px-3');
    expect(badge).toHaveClass('md:py-1.5');
    expect(badge).toHaveClass('md:w-[5.7rem]');
    expect(badge).toHaveClass('md:h-[1.85rem]');
    expect(badge).toHaveClass('flex');
    expect(badge).toHaveClass('items-center');
    expect(badge).toHaveClass('justify-center');
  });

  it('maintains accessibility attributes', () => {
    render(<OnSaleBadge aria-label="Product on sale">Sale</OnSaleBadge>);

    const badge = screen.getByText('Sale');
    expect(badge).toHaveAttribute('aria-label', 'Product on sale');
  });
});
