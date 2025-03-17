import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Contact} from '../Contact';

describe('Contact', () => {
  it('renders the component correctly', () => {
    render(<Contact />);

    // Check for main heading
    expect(screen.getByText('Contact Me')).toBeInTheDocument();

    // Check for description text
    expect(
      screen.getByText('Have any development questions or need assistance?'),
    ).toBeInTheDocument();
    expect(screen.getByText(/I'm here to help!😃/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /I'm a full stack developer with a passion for building/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Reach out to me using the information below.'),
    ).toBeInTheDocument();

    // Check for contact information section
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Don Stevenson')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Toronto, ON')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('(1)416-909-0083')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('dsteven1@gmail.com')).toBeInTheDocument();

    // Check for business hours section
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Friday')).toBeInTheDocument();
    expect(screen.getByText(/9AM - 6PM/i)).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('10AM - 4PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
    expect(screen.getByText('Holidays')).toBeInTheDocument();
    expect(screen.getByText('Hours may vary')).toBeInTheDocument();
  });

  it('renders contact links correctly', () => {
    render(<Contact />);

    // Check phone link
    const phoneLink = screen.getByText('(1)416-909-0083');
    expect(phoneLink.tagName).toBe('A');
    expect(phoneLink).toHaveAttribute('href', 'tel:4169090083');
    expect(phoneLink).toHaveClass('text-[#0A4874]');
    expect(phoneLink).toHaveClass('hover:underline');

    // Check email link
    const emailLink = screen.getByText('dsteven1@gmail.com');
    expect(emailLink.tagName).toBe('A');
    expect(emailLink).toHaveAttribute('href', 'mailto:dsteven1@gmail.com');
    expect(emailLink).toHaveClass('text-[#0A4874]');
    expect(emailLink).toHaveClass('hover:underline');
  });

  it('applies responsive styling classes correctly', () => {
    render(<Contact />);

    // Check main container
    const mainContainer = screen.getByText('Contact Me').closest('div')
      .parentElement.parentElement;
    expect(mainContainer).toHaveClass(
      'flex flex-col items-center justify-center md:items-start md:justify-start px-2 sm:px-4 py-6 sm:py-8 md:py-12 sm:gap-6 md:gap-8 max-w-[190px] sm:max-w-[390px] md:max-w-[490px] lg:max-w-[590px]',
    );

    // Check heading
    const heading = screen.getByText('Contact Me');
    expect(heading).toHaveClass('text-[#0A4874]');
    expect(heading).toHaveClass('font-roboto');
    expect(heading).toHaveClass('font-medium');
    expect(heading).toHaveClass(
      'text-[#0A4874] font-roboto font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 md:mb-4 break-words',
    );

    // Check contact information container
    const contactInfoContainer = screen
      .getByText('Contact Information')
      .closest('div');
    expect(contactInfoContainer).toHaveClass(
      'flex-1 border border-[#E8E8E8] rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 bg-white shadow-sm',
    );

    // Check business hours container
    const businessHoursContainer = screen
      .getByText('Business Hours')
      .closest('div');
    expect(businessHoursContainer).toHaveClass(
      'flex flex-col border border-[#E8E8E8] rounded-xl p-3 sm:p-4 md:p-6 bg-white shadow-sm min-w-[12rem] md:min-w-[14rem]',
    );
  });

  it('verifies the layout changes responsively', () => {
    render(<Contact />);

    // Check the flex container for contact info and business hours
    const flexContainer = screen
      .getByText('Contact Information')
      .closest('div').parentElement;
    expect(flexContainer).toHaveClass(
      'flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8',
    );
  });

  it('renders the emoji correctly', () => {
    render(<Contact />);

    // The emoji is rendered using String.fromCodePoint
    const emojiContainer = screen.getByText(/I'm here to help!😃/);
    expect(emojiContainer.textContent).toContain("I'm here to help!😃");
  });
});
