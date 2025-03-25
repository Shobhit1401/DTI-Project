
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/ui/hero-section";
import ServiceCard from "@/components/ui/service-card";
import { FileText, User, Truck } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to DairyCare"
        subtitle="Your one-stop solution for cow & buffalo care!"
        buttonText="View Diet Plans"
        buttonLink="/diet-plans"
        backgroundClass="bg-gradient-to-r from-dairy-600 to-dairy-400"
      />

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">Our Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Comprehensive solutions for dairy farmers to optimize their operations and animal care
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Custom Diet Plans"
              description="Get tailored diet recommendations based on breed and life stage of your cattle."
              icon={<FileText size={32} />}
              linkText="Explore Diet Plans"
              linkUrl="/diet-plans"
            />

            <ServiceCard
              title="Veterinarian Network"
              description="Connect with nearby vets, view fees, and schedule appointments with ease."
              icon={<User size={32} />}
              linkText="Find a Vet"
              linkUrl="/veterinary"
            />

            <ServiceCard
              title="Farm-to-Home Milk Delivery"
              description="Direct delivery system for dairy farmers to sell fresh products to consumers."
              icon={<Truck size={32} />}
              linkText="Learn More"
              linkUrl="/delivery"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-3xl font-bold text-gray-800">Why Choose DairyCare?</h2>
              <p className="mb-6 text-lg text-gray-600">
                We combine modern technology with traditional farming knowledge to provide comprehensive 
                solutions for dairy farmers. Our platform helps optimize cattle health, connect with 
                veterinary professionals, and establish direct sales channels.
              </p>
              <ul className="space-y-3">
                {[
                  "Scientifically formulated diet plans",
                  "Network of qualified veterinarians",
                  "Direct market access for your products",
                  "Educational resources for modern dairy farming",
                  "Community of like-minded farmers"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-dairy-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate("/resources")}
                className="mt-8 rounded-md bg-dairy-500 px-6 py-2 font-medium text-white transition-colors hover:bg-dairy-600"
              >
                Explore Resources
              </button>
            </div>
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/0d863b75-02cd-4bcf-a06c-95e96a227632.png" 
                  alt="Happy dairy cows" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">What Farmers Say</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Hear from dairy farmers who have transformed their operations with DairyCare
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rajesh Kumar",
                location: "Punjab",
                quote: "The diet plans have significantly improved my cattle's milk production. I've seen a 15% increase in just two months!"
              },
              {
                name: "Anita Sharma",
                location: "Gujarat",
                quote: "Being able to quickly consult with veterinarians has saved me countless hours and helped prevent serious health issues in my herd."
              },
              {
                name: "Vikram Singh",
                location: "Haryana",
                quote: "The farm-to-home delivery system has opened a new revenue stream for my dairy. My products now reach customers directly with better margins."
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 text-dairy-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9999 2C6.47774 2 2.00488 6.47712 2.00488 12C2.00488 17.5229 6.47774 22 11.9999 22C17.5221 22 21.9949 17.5229 21.9949 12C21.9949 6.47712 17.5221 2 11.9999 2ZM16.9999 16C16.5471 16.4142 15.8139 16.3865 15.3999 15.94C14.9999 15.5 14.9999 14.83 15.3999 14.43L16.5899 13.24L15.3999 12.05C14.9999 11.65 14.9999 10.98 15.3999 10.58C15.7999 10.18 16.4699 10.18 16.8699 10.58L18.7699 12.47C19.1699 12.87 19.1699 13.54 18.7699 13.94L16.9999 16ZM9.85988 10.58C10.2599 10.98 10.2599 11.65 9.85988 12.05L8.66988 13.24L9.85988 14.43C10.2599 14.83 10.2599 15.5 9.85988 15.94C9.41988 16.38 8.68988 16.38 8.24988 15.94L6.34988 14.04C5.94988 13.64 5.94988 12.97 6.34988 12.57L8.24988 10.67C8.68988 10.23 9.41988 10.23 9.85988 10.58ZM7.96988 18C7.58988 17.61 7.58988 16.97 7.96988 16.59C8.35988 16.2 8.98988 16.2 9.36988 16.59C9.74988 16.97 9.74988 17.61 9.36988 18C8.98988 18.39 8.35988 18.39 7.96988 18ZM7.96988 7.41C7.58988 7.02 7.58988 6.38 7.96988 6C8.35988 5.61 8.98988 5.61 9.36988 6C9.74988 6.38 9.74988 7.02 9.36988 7.41C8.98988 7.79 8.35988 7.79 7.96988 7.41ZM14.9699 18C14.5899 17.61 14.5899 16.97 14.9699 16.59C15.3599 16.2 15.9899 16.2 16.3699 16.59C16.7499 16.97 16.7499 17.61 16.3699 18C15.9899 18.39 15.3599 18.39 14.9699 18ZM11.9999 19C11.4499 19 10.9999 18.55 10.9999 18C10.9999 17.45 11.4499 17 11.9999 17C12.5499 17 12.9999 17.45 12.9999 18C12.9999 18.55 12.5499 19 11.9999 19ZM11.9999 7C11.4499 7 10.9999 6.55 10.9999 6C10.9999 5.45 11.4499 5 11.9999 5C12.5499 5 12.9999 5.45 12.9999 6C12.9999 6.55 12.5499 7 11.9999 7Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="mb-4 italic text-gray-600">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 rounded-full bg-dairy-100 text-center flex items-center justify-center text-dairy-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Dairy Farmer, {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dairy-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to transform your dairy farming?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Join thousands of farmers who have optimized their operations with DairyCare
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate("/diet-plans")}
              className="button-animation rounded-md bg-white px-6 py-3 font-medium text-dairy-600 shadow-md transition-colors hover:bg-gray-100"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate("/resources")}
              className="button-animation rounded-md border border-white bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
