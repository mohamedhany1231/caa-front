import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50  py-16 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-wide">
            About Us
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Welcome to CAA, your partner in achieving peak performance.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-16 flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/2  ">
            <div className=" w-full min-h-64 md:h-full  relative ">
              <Image
                fill
                src="/mission.jpg"
                alt="Our Mission"
                className="rounded-lg shadow-md w-full h-auto z-10 object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8 text-center md:text-start">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              At CAA, we are dedicated to empowering fitness enthusiasts and
              athletes to reach their full potential. We aim to support your
              health and performance goals with expertise, passion, and
              commitment to excellence.
            </p>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16 flex flex-col md:flex-row-reverse items-center">
          <div className=" mt-6 md:mt-0 md:pr-8 text-center md:w-[60%] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We prioritize transparency, quality, and innovation in everything
              we do. Every step of our process, from sourcing to delivery, is
              designed to ensure your satisfaction and trust in our brand.
            </p>
          </div>
        </section>

        {/* Social Media Section */}
        <section className=" ">
          <div className="bg-black text-white p-8 rounded-lg text-center shadow-lg relative">
            <Image
              src={"/contact.jpg"}
              alt=""
              aria-disabled="true"
              fill
              className="opacity-20 object-cover z-0"
            />
            <div className=" relative z-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Connect With Us
              </h2>
              <p className="text-base md:text-lg mb-6">
                Follow us on social media to stay updated and get in touch!
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaFacebook size={32} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaTwitter size={32} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaInstagram size={32} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaLinkedin size={32} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
