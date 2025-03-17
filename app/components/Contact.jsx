export function Contact() {
  return (
    <div className="flex flex-col items-center justify-center md:items-start md:justify-start px-2 sm:px-4 py-6 sm:py-8 md:py-12 sm:gap-6 md:gap-8 max-w-[190px] sm:max-w-[390px] md:max-w-[490px] lg:max-w-[590px]">
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col text-left gap-2 sm:gap-3 md:gap-4">
          <span className="text-[#0A4874] font-roboto font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 md:mb-4 break-words">
            Contact Me
          </span>
          <span className="font-roboto text-gray-600 text-xs sm:text-sm md:text-base flex flex-wrap">
            Have any development questions or need assistance?
          </span>
          <span className="font-roboto text-gray-600 text-sm sm:text-base md:text-lg flex flex-wrap">
            I&apos;m here to help!
            {String.fromCodePoint('0x1f603')}
          </span>
          <span className="font-roboto text-xs sm:text-sm md:text-base text-gray-600 flex flex-wrap">
            I&apos;m a full stack developer with a passion for building scalable
            and efficient web applications. I&apos;m currently available and can
            help you with your next project.
          </span>
          <span className="font-roboto text-xs sm:text-sm md:text-base text-gray-600 flex flex-wrap">
            Reach out to me using the information below.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="flex-1 border border-[#E8E8E8] rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 bg-white shadow-sm">
            <span className="text-[#0A4874] font-roboto font-medium text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 flex flex-wrap">
              Contact Information
            </span>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111] text-xs sm:text-sm md:text-base flex flex-wrap">
                  Name
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  Don Stevenson
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111] text-xs sm:text-sm md:text-base flex flex-wrap">
                  Location
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  Toronto, ON
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111] text-xs sm:text-sm md:text-base flex flex-wrap">
                  Phone
                </span>
                <a
                  href="tel:4169090083"
                  className="font-roboto text-[#0A4874] hover:underline text-xs sm:text-sm md:text-base break-all"
                >
                  (1)416-909-0083
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111] text-xs sm:text-sm md:text-base flex flex-wrap">
                  Email
                </span>
                <a
                  href="mailto:dsteven1@gmail.com"
                  className="font-roboto text-[#0A4874] hover:underline text-xs sm:text-sm md:text-base break-all"
                >
                  dsteven1@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-[#E8E8E8] rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 bg-white shadow-sm">
            <span className="text-[#0A4874] font-roboto font-medium text-base sm:text-lg md:text-xl mb-3 sm:mb-4 flex flex-wrap">
              Business Hours
            </span>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="font-roboto font-medium text-xs sm:text-sm md:text-base flex flex-wrap">
                  Monday - Friday
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="font-roboto font-medium text-xs sm:text-sm md:text-base flex flex-wrap">
                  Saturday
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  10:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="font-roboto font-medium text-xs sm:text-sm md:text-base flex flex-wrap">
                  Sunday
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  Closed
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="font-roboto font-medium text-xs sm:text-sm md:text-base flex flex-wrap">
                  Holidays
                </span>
                <span className="font-roboto text-gray-700 text-xs sm:text-sm md:text-base flex flex-wrap">
                  Hours may vary
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
