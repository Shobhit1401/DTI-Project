
import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MapPin, Clock, Phone, Mail, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data for veterinarians
const veterinarians = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialty: "Cattle Nutrition & Health",
    location: "Greater Noida",
    address: "123 Dairy Avenue, Greater Noida",
    experience: "15 years",
    fees: "₹500 - ₹1,200",
    availability: "Mon-Fri, 9AM-5PM",
    phone: "+91 98765 43210",
    email: "dr.sharma@dairywise.com",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Dr. Anita Patel",
    specialty: "Reproductive Health",
    location: "Noida",
    address: "456 Animal Care Road, Sector 18, Noida",
    experience: "12 years",
    fees: "₹600 - ₹1,500",
    availability: "Mon-Sat, 10AM-6PM",
    phone: "+91 98765 43211",
    email: "dr.patel@dairywise.com",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Dr. Vikram Singh",
    specialty: "Cattle Surgery & Emergency Care",
    location: "Ghaziabad",
    address: "789 Vet Plaza, Indirapuram, Ghaziabad",
    experience: "20 years",
    fees: "₹800 - ₹2,000",
    availability: "Tues-Sun, 8AM-8PM",
    phone: "+91 98765 43212",
    email: "dr.singh@dairywise.com",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Dr. Priya Verma",
    specialty: "Preventive Care & Vaccination",
    location: "Noida",
    address: "101 Health Center, Sector 62, Noida",
    experience: "8 years",
    fees: "₹400 - ₹1,000",
    availability: "Mon-Fri, 9AM-4PM",
    phone: "+91 98765 43213",
    email: "dr.verma@dairywise.com",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const VeterinaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVet, setSelectedVet] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    phone: "",
    email: "",
    animalType: "",
    issue: ""
  });
  
  const { toast } = useToast();

  // Filter vets based on search term
  const filteredVets = veterinarians.filter(vet => 
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectVet = (vet: any) => {
    setSelectedVet(vet);
    // Scroll to appointment form
    setTimeout(() => {
      document.getElementById("appointment-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation check
    if (!date || !appointmentForm.name || !appointmentForm.phone || !appointmentForm.issue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit appointment (would connect to backend in real app)
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${selectedVet.name} on ${format(date, "PPP")} has been scheduled.`,
    });
    
    // Reset form
    setDate(undefined);
    setAppointmentForm({
      name: "",
      phone: "",
      email: "",
      animalType: "",
      issue: ""
    });
    setSelectedVet(null);
  };

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Veterinary Consultation"
        subtitle="Connect with experienced veterinarians for your cattle's healthcare needs"
        backgroundClass="bg-gradient-to-r from-dairy-600 to-dairy-400"
        className="py-16 min-h-[40vh]"
      />

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">Find a Veterinarian</h2>
            <p className="text-gray-600 mb-6">
              Search our network of qualified veterinarians specialized in cattle and buffalo care
            </p>
            
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, specialty or location..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Veterinarians List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVets.length > 0 ? (
              filteredVets.map((vet) => (
                <Card key={vet.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={vet.image} 
                      alt={vet.name} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{vet.name}</CardTitle>
                    <CardDescription>{vet.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span>{vet.location}</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span>{vet.availability}</span>
                      </div>
                      <p className="font-medium mt-2">Consultation Fee: {vet.fees}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-dairy-500 hover:bg-dairy-600"
                      onClick={() => handleSelectVet(vet)}
                    >
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No veterinarians found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      {selectedVet && (
        <section id="appointment-form" className="bg-gray-50 py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">Book an Appointment</h2>
                <p className="text-gray-600">
                  Schedule a consultation with {selectedVet.name}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-5">
                {/* Vet Info Card */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Veterinarian Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-full mx-auto">
                      <img
                        src={selectedVet.image}
                        alt={selectedVet.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mb-1 text-center text-xl font-semibold">{selectedVet.name}</h3>
                    <p className="mb-4 text-center text-gray-500">{selectedVet.specialty}</p>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span className="text-sm">{selectedVet.address}</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span className="text-sm">{selectedVet.availability}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span className="text-sm">{selectedVet.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-2 text-dairy-500 mt-0.5" />
                        <span className="text-sm">{selectedVet.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Form */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>Fill in your details to book a consultation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={appointmentForm.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={appointmentForm.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            value={appointmentForm.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="animalType">Animal Type</Label>
                          <Input 
                            id="animalType" 
                            name="animalType"
                            value={appointmentForm.animalType}
                            onChange={handleInputChange}
                            placeholder="Cow, Buffalo, etc." 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date <span className="text-red-500">*</span></Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Select a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issue">Reason for Visit <span className="text-red-500">*</span></Label>
                        <Textarea 
                          id="issue" 
                          name="issue"
                          value={appointmentForm.issue}
                          onChange={handleInputChange}
                          placeholder="Describe the health issue or reason for consultation" 
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-dairy-500 hover:bg-dairy-600">
                        Confirm Appointment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Our Veterinary Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our network of veterinarians provides comprehensive healthcare services for your cattle
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "General Health Check-ups",
                description: "Regular health assessments to monitor overall condition and prevent diseases",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM10.5 17H13.5V13.5H17V10.5H13.5V7H10.5V10.5H7V13.5H10.5V17Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Reproductive Health",
                description: "Breeding services, pregnancy diagnosis, and reproductive disorder treatments",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4.5 9.5L7 12L10.5 8.5L10.5 22H13.5V8.5L17 12L19.5 9.5L12 2Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Emergency Care",
                description: "Prompt attention for critical conditions requiring immediate intervention",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM10 17H8V15H10V17ZM10 13H8V7H10V13ZM16 17H14V11H16V17ZM16 9H14V7H16V9Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Preventive Care",
                description: "Vaccinations and preventive treatments to safeguard against common diseases",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.75 7L14 3.25L4.15 13.1C3.87 13.38 3.66 13.72 3.54 14.09L2.1 19L7.01 17.56C7.38 17.44 7.72 17.23 8 16.95L17.85 7.1C17.85 7.1 17.75 7 17.75 7ZM6.6 17.2L4.8 15.4L5.5 13.03L9.05 16.58L6.68 17.28C6.66 17.25 6.63 17.23 6.6 17.2ZM12.35 6.35L15.75 9.75L17.5 8L14.1 4.6L12.35 6.35Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Surgical Procedures",
                description: "Routine and specialized surgeries performed with advanced techniques",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 20H4V8H20V20Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Nutrition Counseling",
                description: "Expert advice on feeding practices to optimize health and productivity",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 9V21H20V9L12 3ZM18 19H6V10L12 5.5L18 10V19ZM9 14H15V16H9V14ZM9 10H15V12H9V10Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Diagnostic Services",
                description: "Advanced testing and imaging to accurately diagnose health conditions",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2V16H3V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V2L19.5 3.5ZM15 20H6C5.45 20 5 19.55 5 19V18H15V20ZM19 19C19 19.55 18.55 20 18 20C17.45 20 17 19.55 17 19V18H18V17H8V16H18C18.55 16 19 16.45 19 17V19ZM18 14H8V11H18V14ZM18 9H8V5H18V9Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                title: "Mobile Veterinary Units",
                description: "On-farm services that bring veterinary care directly to your location",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
                  </svg>
                )
              }
            ].map((service, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">What Our Clients Say</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Hear from farmers who have used our veterinary consultation services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "The mobile veterinary service was a game-changer for my farm. The vet was at my doorstep within hours of my call.",
                name: "Mahesh Yadav",
                location: "Dairy Farmer, Haryana"
              },
              {
                quote: "I've been using the veterinary consultation service for two years now. The preventive care advice has dramatically reduced health issues in my herd.",
                name: "Sunita Devi",
                location: "Buffalo Farmer, Uttar Pradesh"
              },
              {
                quote: "The reproductive health services have significantly improved my breeding program. My calving rates have increased by 30% since I started consulting with DairyWise vets.",
                name: "Ramesh Kumar",
                location: "Dairy Farmer, Punjab"
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 text-dairy-500">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 26.6667H10.0001L15.0001 16.6667H11.6667V10H21.6667V20L16.6667 26.6667ZM31.6667 26.6667H25.0001L30.0001 16.6667H26.6667V10H36.6667V20L31.6667 26.6667Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="mb-6 italic text-gray-600">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 rounded-full bg-dairy-100 text-center flex items-center justify-center text-dairy-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need urgent veterinary assistance?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Our emergency hotline is available 24/7 for critical situations
          </p>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-dairy-600">
              <Phone size={32} />
            </div>
            <p className="text-2xl font-bold">+91 800-123-4567</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VeterinaryPage;
