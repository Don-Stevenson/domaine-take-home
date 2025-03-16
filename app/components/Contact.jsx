export function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-[#0A4874] font-roboto font-medium text-3xl md:text-4xl mb-4">
            Contact Me
          </h1>
          <p className="font-roboto text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? I&apos;m here to help! Reach out
            to me using the information below.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 border border-[#E8E8E8] rounded-xl p-6 md:p-8 bg-white shadow-sm">
            <h2 className="text-[#0A4874] font-roboto font-medium text-xl mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111]">
                  Name
                </span>
                <span className="font-roboto text-gray-700">Don Stevenson</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111]">
                  Location
                </span>
                <span className="font-roboto text-gray-700">Toronto, ON</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111]">
                  Phone
                </span>
                <a
                  href="tel:4169090083"
                  className="font-roboto text-[#0A4874] hover:underline"
                >
                  (1)416-909-0083
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-roboto font-medium text-[#111111]">
                  Email
                </span>
                <a
                  href="mailto:contact@example.com"
                  className="font-roboto text-[#0A4874] hover:underline"
                >
                  dsteven1@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-[#E8E8E8] rounded-xl p-6 md:p-8 bg-white shadow-sm">
            <h2 className="text-[#0A4874] font-roboto font-medium text-xl mb-4">
              Business Hours
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <span className="font-roboto font-medium">Monday - Friday</span>
                <span className="font-roboto text-gray-700">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto font-medium">Saturday</span>
                <span className="font-roboto text-gray-700">
                  10:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto font-medium">Sunday</span>
                <span className="font-roboto text-gray-700">Closed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto font-medium">Holidays</span>
                <span className="font-roboto text-gray-700">
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
