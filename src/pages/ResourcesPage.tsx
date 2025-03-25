
import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, FileText, Link as LinkIcon, Calendar, User, Book } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for resources
const resources = {
  clinics: [
    {
      id: 1,
      name: "Taber Cattle Clinic",
      location: "Greater Noida",
      contact: "+91 98765 43210",
      services: ["General Check-ups", "Vaccinations", "Surgery"],
      website: "https://tabercattleclinic.com"
    },
    {
      id: 2,
      name: "Coaldale Veterinary Clinic",
      location: "Noida, Sector 62",
      contact: "+91 98765 43211",
      services: ["Reproductive Health", "Emergency Care", "Dental Services"],
      website: "https://coaldaleveterinary.com"
    },
    {
      id: 3,
      name: "Lander Veterinary Clinic",
      location: "Ghaziabad",
      contact: "+91 98765 43212",
      services: ["Health Certificates", "Laboratory Services", "Mobile Veterinary Unit"],
      website: "https://landerveterinary.com"
    },
    {
      id: 4,
      name: "ABS Pet Care",
      location: "Greater Noida",
      contact: "+91 98765 43213",
      services: ["Preventive Care", "Specialized Treatments", "Livestock Consultations"],
      website: "https://abspetcare.com"
    },
    {
      id: 5,
      name: "DCC Animal Hospital",
      location: "Noida, Sector 18",
      contact: "+91 98765 43214",
      services: ["24/7 Emergency Services", "Diagnostic Imaging", "Laboratory Testing"],
      website: "https://dccanimal.com"
    }
  ],
  articles: [
    {
      id: 1,
      title: "Optimizing Diet for Maximum Milk Production",
      category: "Nutrition",
      author: "Dr. Rajesh Sharma",
      date: "June 15, 2023",
      summary: "Learn about the latest research on nutritional requirements for dairy cattle to maximize milk production while maintaining animal health.",
      image: "/lovable-uploads/0d863b75-02cd-4bcf-a06c-95e96a227632.png"
    },
    {
      id: 2,
      title: "Common Health Issues in Dairy Cattle and Prevention",
      category: "Health",
      author: "Dr. Anita Patel",
      date: "May 22, 2023",
      summary: "An overview of common health problems affecting dairy cattle and preventive measures to maintain a healthy herd.",
      image: "/lovable-uploads/752f33e5-08a8-47b2-84ee-7b368d0d051f.png"
    },
    {
      id: 3,
      title: "Modern Dairy Farm Management Practices",
      category: "Management",
      author: "Dr. Vikram Singh",
      date: "April 10, 2023",
      summary: "Discover efficient management techniques for dairy farms, including record-keeping, staff training, and operational optimization.",
      image: "/lovable-uploads/652fdbbf-6bc9-43ee-bc69-7b20ebfa84da.png"
    },
    {
      id: 4,
      title: "Buffalo Breeding: Selecting for Optimal Milk Production",
      category: "Breeding",
      author: "Dr. Priya Verma",
      date: "March 5, 2023",
      summary: "Guidelines for selecting and breeding buffalo for improved milk production traits and genetic advancement.",
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ],
  websites: [
    {
      id: 1,
      title: "National Dairy Development Board",
      url: "https://www.nddb.coop/",
      description: "Official portal of NDDB with information on dairy development programs, technical resources, and industry statistics."
    },
    {
      id: 2,
      title: "Dairy Knowledge Portal",
      url: "https://dairyknowledge.in/",
      description: "Comprehensive knowledge repository on dairy farming, animal health, breeding, and modern practices."
    },
    {
      id: 3,
      title: "Indian Council of Agricultural Research",
      url: "https://icar.org.in/",
      description: "Research papers, technical bulletins, and educational resources on dairy farming and animal husbandry."
    },
    {
      id: 4,
      title: "International Livestock Research Institute",
      url: "https://www.ilri.org/",
      description: "Global research organization working on livestock health, genetics, and sustainable farming practices."
    },
    {
      id: 5,
      title: "Veterinary Council of India",
      url: "https://www.vci.nic.in/",
      description: "Regulatory body for veterinary practice with directories of certified practitioners and clinics."
    },
    {
      id: 6,
      title: "Food and Agriculture Organization",
      url: "https://www.fao.org/dairy-production-products/",
      description: "FAO's resources on dairy production, safety standards, and global best practices."
    }
  ],
  events: [
    {
      id: 1,
      title: "Annual Dairy Farmers Conference",
      date: "August 15-17, 2023",
      location: "India Expo Centre, Greater Noida",
      description: "National gathering of dairy farmers, veterinarians, and industry experts featuring workshops, exhibitions, and networking opportunities."
    },
    {
      id: 2,
      title: "Modern Dairy Equipment Expo",
      date: "September 22-24, 2023",
      location: "Pragati Maidan, New Delhi",
      description: "Exhibition showcasing the latest milking equipment, cooling systems, and dairy farm technology."
    },
    {
      id: 3,
      title: "Cattle Nutrition Workshop",
      date: "July 10, 2023",
      location: "Agricultural University, Noida",
      description: "Hands-on workshop on formulating balanced rations, maximizing feed efficiency, and utilizing local ingredients."
    }
  ]
};

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clinics");

  // Filter resources based on search term and active tab
  const getFilteredResources = () => {
    const term = searchTerm.toLowerCase();

    switch (activeTab) {
      case "clinics":
        return resources.clinics.filter(clinic => 
          clinic.name.toLowerCase().includes(term) || 
          clinic.location.toLowerCase().includes(term) ||
          clinic.services.some(service => service.toLowerCase().includes(term))
        );
      case "articles":
        return resources.articles.filter(article => 
          article.title.toLowerCase().includes(term) || 
          article.category.toLowerCase().includes(term) || 
          article.author.toLowerCase().includes(term) ||
          article.summary.toLowerCase().includes(term)
        );
      case "websites":
        return resources.websites.filter(website => 
          website.title.toLowerCase().includes(term) || 
          website.description.toLowerCase().includes(term)
        );
      case "events":
        return resources.events.filter(event => 
          event.title.toLowerCase().includes(term) || 
          event.location.toLowerCase().includes(term) || 
          event.description.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const filteredResources = getFilteredResources();

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Useful Resources"
        subtitle="Educational materials, clinic directories, and events for dairy farmers"
        backgroundClass="bg-gradient-to-r from-dairy-600 to-dairy-400"
        className="py-16 min-h-[40vh]"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">Find Dairy Farming Resources</h2>
            <p className="text-gray-600 mb-6">
              Access veterinary clinics, educational articles, informative websites, and upcoming events
            </p>
            
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for resources..."
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

          <Tabs defaultValue="clinics" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-center mb-8">
              <TabsTrigger value="clinics" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Veterinary Clinics</span>
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Educational Articles</span>
              </TabsTrigger>
              <TabsTrigger value="websites" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <span>Useful Websites</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Events</span>
              </TabsTrigger>
            </TabsList>

            {/* Veterinary Clinics */}
            <TabsContent value="clinics" className="w-full">
              {filteredResources.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((clinic: any) => (
                    <Card key={clinic.id}>
                      <CardHeader>
                        <CardTitle>{clinic.name}</CardTitle>
                        <CardDescription>{clinic.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">Services:</p>
                          <ul className="space-y-1">
                            {clinic.services.map((service: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 text-dairy-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="pt-2"><span className="font-medium">Contact:</span> {clinic.contact}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-dairy-500 hover:bg-dairy-600"
                          onClick={() => window.open(clinic.website, '_blank')}
                        >
                          Visit Website
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No veterinary clinics found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            {/* Educational Articles */}
            <TabsContent value="articles" className="w-full">
              {filteredResources.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredResources.map((article: any) => (
                    <Card key={article.id} className="overflow-hidden flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-full bg-dairy-100 px-2.5 py-0.5 text-xs font-medium text-dairy-800">
                              {article.category}
                            </span>
                            <span className="text-sm text-gray-500">{article.date}</span>
                          </div>
                          <CardTitle className="mt-2">{article.title}</CardTitle>
                          <CardDescription>By {article.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{article.summary}</p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-dairy-500 hover:bg-dairy-600">
                            Read Full Article
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No articles found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            {/* Useful Websites */}
            <TabsContent value="websites" className="w-full">
              {filteredResources.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((website: any) => (
                    <Card key={website.id}>
                      <CardHeader>
                        <CardTitle>{website.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{website.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-dairy-500 hover:bg-dairy-600"
                          onClick={() => window.open(website.url, '_blank')}
                        >
                          Visit Website
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No websites found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            {/* Upcoming Events */}
            <TabsContent value="events" className="w-full">
              {filteredResources.length > 0 ? (
                <div className="space-y-6">
                  {filteredResources.map((event: any) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-dairy-100 p-6 text-dairy-800 flex items-center justify-center md:w-1/4">
                          <div className="text-center">
                            <Calendar className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-bold">{event.date}</p>
                            <p className="text-sm">{event.location}</p>
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          <Button className="bg-dairy-500 hover:bg-dairy-600">
                            Register for Event
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No events found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Educational Resources</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Access free materials to enhance your dairy farming knowledge
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dairy Farming Guide",
                description: "Comprehensive guide covering all aspects of dairy farming from housing to milking techniques.",
                icon: <Book className="h-8 w-8" />,
                buttonText: "Download PDF"
              },
              {
                title: "Video Tutorials",
                description: "Video demonstrations of best practices in cattle management, milking, and health monitoring.",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Watch Videos"
              },
              {
                title: "Disease Prevention Manual",
                description: "Detailed information on common cattle diseases, symptoms, prevention, and treatment options.",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Access Manual"
              },
              {
                title: "Nutrition Calculator",
                description: "Interactive tool to calculate balanced rations based on cattle breed, age, and production stage.",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Use Calculator"
              },
              {
                title: "Farm Record Templates",
                description: "Downloadable templates for maintaining health records, milk production data, and financial tracking.",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM9 13V15H7V13H9ZM9 9V11H7V9H9ZM9 17V19H7V17H9ZM17 13V15H11V13H17ZM17 9V11H11V9H17ZM17 17V19H11V17H17Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Download Templates"
              },
              {
                title: "Breeding Calendar",
                description: "Tool to track heat cycles, insemination dates, and calculate expected calving dates.",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Access Calendar"
              }
            ].map((resource, index) => (
              <div key={index} className="flex flex-col rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  {resource.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{resource.title}</h3>
                <p className="mb-4 flex-grow text-gray-600">{resource.description}</p>
                <Button className="w-full bg-dairy-500 hover:bg-dairy-600">
                  {resource.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Government Schemes & Programs</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Information on financial assistance, subsidies, and support programs for dairy farmers
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Dairy Entrepreneurship Development Scheme",
                description: "Financial assistance for setting up small dairy farms and purchasing equipment.",
                eligibility: "Farmers, individual entrepreneurs, NGOs, companies",
                benefit: "25% back-ended capital subsidy (33.33% for SC/ST farmers)"
              },
              {
                title: "National Program for Dairy Development",
                description: "Support for creating infrastructure for milk procurement, processing, and marketing.",
                eligibility: "Dairy Cooperatives, Producer Companies, Milk Unions",
                benefit: "Financial assistance for infrastructure development"
              },
              {
                title: "Rashtriya Gokul Mission",
                description: "Program focused on conservation and development of indigenous cattle breeds.",
                eligibility: "All farmers and breeding centers",
                benefit: "Support for breeding centers, bull production, and disease control"
              }
            ].map((scheme, index) => (
              <Card key={index}>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{scheme.title}</h3>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium text-gray-800 mb-1">Eligibility:</p>
                      <p className="text-gray-600">{scheme.eligibility}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium text-gray-800 mb-1">Benefits:</p>
                      <p className="text-gray-600">{scheme.benefit}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-dairy-500 hover:bg-dairy-600">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Join Our Farming Community</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Connect with fellow dairy farmers, share experiences, and learn from each other
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Online Forum",
                description: "Participate in discussions, ask questions, and share your knowledge with other farmers.",
                icon: (
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Join Forum"
              },
              {
                title: "Monthly Webinars",
                description: "Attend live online sessions with experts on various aspects of dairy farming.",
                icon: (
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3H3C1.9 3 1 3.9 1 5V17C1 18.1 1.9 19 3 19H8L10 21.5L12 19L14 21.5L16 19H21C22.1 19 23 18.1 23 17V5C23 3.9 22.1 3 21 3ZM21 17H3V5H21V17Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "View Schedule"
              },
              {
                title: "WhatsApp Groups",
                description: "Join region-specific WhatsApp groups for quick advice and local market updates.",
                icon: (
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.75 14.45C16.35 14.25 15.78 14.05 15.38 13.95C14.98 13.85 14.68 13.85 14.48 14.05C14.17 14.35 13.77 14.45 13.37 14.35C12.27 14.15 11.17 13.45 10.47 12.55C10.07 12.05 9.57 11.25 9.57 10.55C9.57 10.05 9.77 9.65 10.07 9.35C10.27 9.15 10.37 8.85 10.37 8.45C10.37 8.15 10.27 7.85 10.27 7.65C10.17 7.25 9.97 6.65 9.77 6.25C9.57 5.85 9.27 5.65 8.97 5.65H8.17C7.47 5.65 6.67 6.35 6.47 7.05C6.27 7.85 6.47 8.75 6.67 9.35C7.37 11.35 8.37 13.05 9.87 14.45C11.77 16.15 14.07 17.15 16.27 17.15C16.67 17.15 17.07 17.05 17.47 16.95C18.17 16.75 18.87 16.05 18.97 15.35V14.55C18.87 14.05 18.57 13.65 18.17 13.55C17.77 13.55 17.25 13.65 16.75 14.45ZM19.97 4.55L19.87 4.45H14.77L14.67 4.55V9.55L14.77 9.65H16.87V7.15L19.37 9.65L19.47 9.55V4.55H19.97ZM19.97 1.45H4.07C2.97 1.45 2.07 2.35 2.07 3.45V20.55C2.07 21.65 2.97 22.55 4.07 22.55H19.97C21.07 22.55 21.97 21.65 21.97 20.55V3.45C21.97 2.35 21.07 1.45 19.97 1.45ZM19.97 20.55H4.07V3.45H19.97V20.55Z" fill="currentColor"/>
                  </svg>
                ),
                buttonText: "Request to Join"
              }
            ].map((community, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  {community.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{community.title}</h3>
                <p className="mb-6 text-gray-600">{community.description}</p>
                <Button className="bg-dairy-500 hover:bg-dairy-600">
                  {community.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dairy-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need personalized assistance?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Our team of experts is available to provide customized advice for your dairy farming needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/veterinary">
              <Button className="bg-white text-dairy-600 hover:bg-gray-100">
                Contact a Veterinarian
              </Button>
            </Link>
            <Link to="/diet-plans">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Get Diet Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
