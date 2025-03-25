
import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Truck, Package, Home, Calendar, User, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Farm Fresh Milk",
    price: 60,
    unit: "liter",
    description: "Naturally rich, farm-fresh milk directly from healthy cows. Pasteurized for safety while preserving natural flavor.",
    image: "/lovable-uploads/0d863b75-02cd-4bcf-a06c-95e96a227632.png",
    availableQuantity: 100
  },
  {
    id: 2,
    name: "Buffalo Milk",
    price: 80,
    unit: "liter",
    description: "Creamy, protein-rich buffalo milk with higher fat content. Ideal for making traditional dairy products.",
    image: "/lovable-uploads/652fdbbf-6bc9-43ee-bc69-7b20ebfa84da.png",
    availableQuantity: 80
  },
  {
    id: 3,
    name: "Homemade Ghee",
    price: 600,
    unit: "kg",
    description: "Pure, clarified butter made from farm-fresh milk. Traditional preparation with rich aroma and flavor.",
    image: "https://images.unsplash.com/photo-1631209121751-87ce11f5cf04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    availableQuantity: 30
  },
  {
    id: 4,
    name: "Paneer (Cottage Cheese)",
    price: 320,
    unit: "kg",
    description: "Soft, fresh cottage cheese made daily. Perfect for curries, snacks, and desserts.",
    image: "https://images.unsplash.com/photo-1631209476615-b06a3fa1d9a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    availableQuantity: 25
  },
  {
    id: 5,
    name: "Curd/Yogurt",
    price: 80,
    unit: "kg",
    description: "Creamy, probiotic-rich yogurt with live cultures. Made fresh daily from wholesome milk.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    availableQuantity: 50
  },
  {
    id: 6,
    name: "A2 Cow Milk",
    price: 100,
    unit: "liter",
    description: "Premium A2 milk from indigenous cow breeds. Contains only A2 beta-casein protein for easier digestion.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    availableQuantity: 40
  }
];

// Mock data for farmers
const farmers = [
  {
    id: 1,
    name: "Rajendra Singh",
    location: "Greater Noida",
    farm: "Green Pastures Dairy",
    rating: 4.8,
    reviews: 124,
    specialties: ["A2 Milk", "Organic Practices"],
    image: "https://images.unsplash.com/photo-1571504211935-1c936b327411?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    location: "Ghaziabad",
    farm: "Lakshmi Buffalo Farm",
    rating: 4.7,
    reviews: 98,
    specialties: ["Buffalo Milk", "Ghee"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Harpal Yadav",
    location: "Noida",
    farm: "Sunshine Dairy",
    rating: 4.9,
    reviews: 156,
    specialties: ["Fresh Milk", "Paneer", "Yogurt"],
    image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const DeliveryPage = () => {
  const [cart, setCart] = useState<{ id: number; quantity: number; product: any }[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [registrationForm, setRegistrationForm] = useState({
    type: "farmer", // "farmer" or "customer"
    name: "",
    phone: "",
    email: "",
    address: "",
    farmName: "",
    products: ""
  });
  
  const { toast } = useToast();

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Item already in cart, update quantity
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { id: product.id, quantity: 1, product }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add products to your cart before checking out",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order Placed Successfully",
      description: "Your products will be delivered soon!",
    });
    
    // Clear cart after successful order
    setCart([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!registrationForm.name || !registrationForm.phone || !registrationForm.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration Successful",
      description: `You have been registered as a ${registrationForm.type}. Our team will contact you shortly.`,
    });
    
    // Reset form
    setRegistrationForm({
      type: "farmer",
      name: "",
      phone: "",
      email: "",
      address: "",
      farmName: "",
      products: ""
    });
  };

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Farm-to-Home Milk Delivery"
        subtitle="Fresh dairy products delivered straight from farms to your doorstep"
        backgroundClass="bg-gradient-to-r from-dairy-600 to-dairy-400"
        className="py-16 min-h-[40vh]"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our farm-to-home delivery system connects farmers directly with consumers, 
              eliminating middlemen and ensuring fresh products at fair prices
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Farmers List Products",
                description: "Local dairy farmers register and list their fresh products with availability and pricing",
                icon: <User className="h-10 w-10" />
              },
              {
                title: "Customers Order Online",
                description: "Customers browse products, select items, and schedule convenient delivery times",
                icon: <Heart className="h-10 w-10" />
              },
              {
                title: "Direct Delivery",
                description: "Products are delivered fresh to your doorstep, supporting local farmers",
                icon: <Truck className="h-10 w-10" />
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Available Products</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Browse our selection of farm-fresh dairy products
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{product.name}</CardTitle>
                    <span className="text-lg font-bold text-dairy-600">₹{product.price}/{product.unit}</span>
                  </div>
                  <CardDescription>Available: {product.availableQuantity} {product.unit}s</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-dairy-500 hover:bg-dairy-600"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Meet Our Farmers</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Know the people behind your dairy products
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {farmers.map((farmer) => (
              <Card key={farmer.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 h-24 w-24 overflow-hidden rounded-full mx-auto">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <CardTitle>{farmer.name}</CardTitle>
                    <CardDescription>{farmer.farm}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < Math.floor(farmer.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({farmer.reviews} reviews)</span>
                    </div>
                    <div className="pt-2 text-center">
                      <span className="text-sm text-gray-700">Location: {farmer.location}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {farmer.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center rounded-full bg-dairy-100 px-2.5 py-0.5 text-xs font-medium text-dairy-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    variant="outline"
                    className="border-dairy-500 text-dairy-600 hover:bg-dairy-50"
                    onClick={() => setSelectedFarmer(farmer)}
                  >
                    View Products
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Join Our Network</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Register as a farmer to sell your products or as a customer to start receiving fresh dairy products
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Fill in your details to join our farm-to-home network</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="farmer" onValueChange={handleTypeChange}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="farmer">Register as Farmer</TabsTrigger>
                    <TabsTrigger value="customer">Register as Customer</TabsTrigger>
                  </TabsList>
                  
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={registrationForm.name}
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
                          value={registrationForm.phone}
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
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={registrationForm.address}
                          onChange={handleInputChange}
                          placeholder="Enter your full address" 
                          required 
                        />
                      </div>
                    </div>

                    {registrationForm.type === "farmer" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="farmName">Farm Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="farmName" 
                            name="farmName"
                            value={registrationForm.farmName}
                            onChange={handleInputChange}
                            placeholder="Enter your farm name" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="products">Products Available</Label>
                          <Textarea 
                            id="products" 
                            name="products"
                            value={registrationForm.products}
                            onChange={handleInputChange}
                            placeholder="List the dairy products you can provide" 
                          />
                        </div>
                      </>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-dairy-500 hover:bg-dairy-600 mt-4"
                    >
                      Register
                    </Button>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cart Section - Fixed at bottom */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Your Cart</p>
                  <p className="text-sm text-gray-500">{cart.length} items | Total: ₹{calculateTotal()}</p>
                </div>
              </div>
              
              <div className="space-x-4">
                <Button 
                  variant="outline" 
                  className="border-dairy-500 text-dairy-600"
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </Button>
                <Button 
                  className="bg-dairy-500 hover:bg-dairy-600"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
            
            {/* Expanded Cart */}
            <div className="mt-4 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-md bg-gray-50 p-2">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded overflow-hidden mr-3">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">₹{item.product.price} per {item.product.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        &times;
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Benefits of Farm-to-Home Delivery</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Discover the advantages of getting dairy products directly from farms
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Fresher Products",
                description: "Products reach you within hours of production, ensuring maximum freshness and nutritional value.",
                icon: <Calendar className="h-8 w-8" />
              },
              {
                title: "Support Local Farmers",
                description: "Your purchase directly supports local dairy farmers and their families, strengthening rural economies.",
                icon: <Home className="h-8 w-8" />
              },
              {
                title: "Better Pricing",
                description: "By eliminating middlemen, farmers earn more while consumers pay fair prices for quality products.",
                icon: <Package className="h-8 w-8" />
              },
              {
                title: "Eco-Friendly",
                description: "Reduced transportation and packaging leads to a smaller carbon footprint compared to traditional retail.",
                icon: <Heart className="h-8 w-8" />
              }
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Customer Stories</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Hear from families who have switched to farm-to-home delivery
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "The quality difference is immediately noticeable. My children prefer this milk over anything we've bought from stores before.",
                name: "Priya Sharma",
                location: "Noida"
              },
              {
                quote: "I love knowing exactly where my dairy products come from and supporting a local farmer. The delivery is always on time and the products are fresh.",
                name: "Suresh Kumar",
                location: "Greater Noida"
              },
              {
                quote: "As someone who is health-conscious, I appreciate that these products don't contain preservatives or additives. Pure, natural goodness delivered to my door.",
                name: "Meera Patel",
                location: "Ghaziabad"
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
                    <p className="text-sm text-gray-500">Customer, {testimonial.location}</p>
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to try farm-fresh products?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Register today to start receiving fresh dairy products directly from local farms
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-dairy-600 hover:bg-gray-100">
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPage;
