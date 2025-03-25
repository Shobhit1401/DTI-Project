
import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for diet plan selection
type AnimalType = "cow" | "buffalo";
type AgeGroup = "calf" | "young" | "adult" | "senior";
type Purpose = "milk" | "breeding" | "both";

// Diet plan recommendations data
const dietPlans = {
  cow: {
    calf: {
      title: "Cow Calf Diet Plan",
      description: "Optimal nutrition for healthy calf development",
      components: [
        { name: "Milk/Milk Replacer", amount: "10-12% of body weight per day" },
        { name: "Calf Starter Feed", amount: "Start at 50g/day, gradually increase" },
        { name: "Fresh Water", amount: "Ad libitum" },
        { name: "Hay", amount: "Small amounts from 2 weeks of age" }
      ],
      tips: [
        "Feed colostrum within first 6 hours of birth",
        "Divide milk feeding into 2-3 times per day",
        "Introduce solid feed gradually",
        "Maintain clean feeding equipment"
      ]
    },
    young: {
      title: "Young Cow Diet Plan",
      description: "Supporting growth and development",
      components: [
        { name: "High-quality Forage", amount: "5-6 kg dry matter per day" },
        { name: "Concentrate Mix", amount: "2-3 kg per day" },
        { name: "Protein Supplement", amount: "0.5-1 kg per day" },
        { name: "Minerals & Vitamins", amount: "As per requirement" }
      ],
      tips: [
        "Ensure adequate protein for muscle development",
        "Include calcium and phosphorus for bone growth",
        "Provide clean, fresh water at all times",
        "Monitor growth rate and adjust diet accordingly"
      ]
    },
    adult: {
      milk: {
        title: "Dairy Cow Production Diet",
        description: "Maximizing milk production with balanced nutrition",
        components: [
          { name: "High-quality Forage", amount: "10-12 kg dry matter per day" },
          { name: "Concentrate Mix", amount: "6-8 kg per day (based on production)" },
          { name: "Protein Supplement", amount: "1-2 kg per day" },
          { name: "Bypass Fat", amount: "150-200g per day" },
          { name: "Minerals & Vitamins", amount: "100-150g per day" }
        ],
        tips: [
          "Feed according to milk production level",
          "Maintain forage:concentrate ratio of 60:40",
          "Feed smaller portions multiple times a day",
          "Include buffer supplements to prevent acidosis"
        ]
      },
      breeding: {
        title: "Breeding Cow Diet Plan",
        description: "Supporting reproductive health and calf development",
        components: [
          { name: "High-quality Forage", amount: "10-12 kg dry matter per day" },
          { name: "Concentrate Mix", amount: "3-4 kg per day" },
          { name: "Protein Supplement", amount: "1 kg per day" },
          { name: "Mineral Mix (with focus on Ca, P, Se)", amount: "100g per day" }
        ],
        tips: [
          "Ensure adequate vitamin A, D, and E intake",
          "Maintain body condition score between 3-3.5",
          "Avoid rapid weight changes during pregnancy",
          "Increase energy intake during last trimester"
        ]
      },
      both: {
        title: "Dual-Purpose Cow Diet",
        description: "Balanced nutrition for milk production and breeding",
        components: [
          { name: "High-quality Forage", amount: "10-12 kg dry matter per day" },
          { name: "Concentrate Mix", amount: "5-7 kg per day" },
          { name: "Protein Supplement", amount: "1-1.5 kg per day" },
          { name: "Bypass Fat", amount: "100-150g per day" },
          { name: "Mineral & Vitamin Mix", amount: "120g per day" }
        ],
        tips: [
          "Balance between production and body condition",
          "Adjust diet based on reproductive status",
          "Monitor milk production and body condition score",
          "Provide selenium and vitamin E for reproduction"
        ]
      }
    },
    senior: {
      title: "Senior Cow Diet Plan",
      description: "Supporting health and comfort in older cattle",
      components: [
        { name: "Easy-to-digest Forage", amount: "8-10 kg dry matter per day" },
        { name: "Concentrate Mix", amount: "2-3 kg per day" },
        { name: "Protein Supplement", amount: "0.5-1 kg per day" },
        { name: "Senior Vitamin & Mineral Mix", amount: "100g per day" }
      ],
      tips: [
        "Provide softer, more digestible feeds",
        "Ensure adequate fiber to prevent digestive issues",
        "Monitor dental health and adjust feed texture accordingly",
        "Include joint supplements if needed"
      ]
    }
  },
  buffalo: {
    // Similar structure for buffalo diet plans
    // This is simplified for brevity - in a real app this would be fully implemented
    calf: {
      title: "Buffalo Calf Diet Plan",
      description: "Nutritional requirements for buffalo calf growth",
      components: [
        { name: "Buffalo Milk", amount: "10% of body weight per day" },
        { name: "Calf Starter", amount: "Start at 50g/day, gradually increase" },
        { name: "Fresh Water", amount: "Ad libitum" },
        { name: "Green Fodder", amount: "Small amounts from 3 weeks" }
      ],
      tips: [
        "Feed colostrum within first 6 hours of birth",
        "Divide milk feeding into 2-3 times per day",
        "Introduce green fodder gradually",
        "Maintain clean feeding environment"
      ]
    },
    young: {
      title: "Young Buffalo Diet Plan",
      description: "Supporting growth and development",
      components: [
        { name: "Green Fodder", amount: "15-20 kg per day" },
        { name: "Dry Fodder", amount: "2-3 kg per day" },
        { name: "Concentrate Mix", amount: "1.5-2 kg per day" },
        { name: "Mineral Mixture", amount: "50-60g per day" }
      ],
      tips: [
        "Ensure balanced calcium and phosphorus intake",
        "Feed higher protein diet during growth phase",
        "Provide clean, fresh water at all times",
        "Monitor growth rate and adjust diet accordingly"
      ]
    },
    adult: {
      milk: {
        title: "Dairy Buffalo Production Diet",
        description: "Nutrition for optimal milk production",
        components: [
          { name: "Green Fodder", amount: "30-40 kg per day" },
          { name: "Dry Fodder", amount: "5-6 kg per day" },
          { name: "Concentrate Mix", amount: "5-7 kg per day (based on production)" },
          { name: "Mineral Mixture", amount: "80-100g per day" }
        ],
        tips: [
          "Feed according to milk yield",
          "Include adequate fiber for rumen health",
          "Ensure sufficient protein for milk production",
          "Provide clean drinking water ad libitum"
        ]
      },
      breeding: {
        title: "Breeding Buffalo Diet Plan",
        description: "Nutrition for reproductive health",
        components: [
          { name: "Green Fodder", amount: "30-35 kg per day" },
          { name: "Dry Fodder", amount: "5-6 kg per day" },
          { name: "Concentrate Mix", amount: "3-4 kg per day" },
          { name: "Mineral Mixture (high in Ca, P)", amount: "100g per day" }
        ],
        tips: [
          "Ensure vitamin A, D, and E supplementation",
          "Maintain optimal body condition score",
          "Gradual feed changes during transition periods",
          "Increase energy in late pregnancy"
        ]
      },
      both: {
        title: "Dual-Purpose Buffalo Diet",
        description: "Balanced nutrition for milk and reproduction",
        components: [
          { name: "Green Fodder", amount: "30-40 kg per day" },
          { name: "Dry Fodder", amount: "5-6 kg per day" },
          { name: "Concentrate Mix", amount: "4-6 kg per day" },
          { name: "Mineral & Vitamin Mix", amount: "100g per day" }
        ],
        tips: [
          "Balance between production and body condition",
          "Adjust diet based on reproductive status",
          "Monitor milk production and body condition score",
          "Provide additional nutrients during peak lactation"
        ]
      }
    },
    senior: {
      title: "Senior Buffalo Diet Plan",
      description: "Supporting health in older buffaloes",
      components: [
        { name: "Soft Green Fodder", amount: "25-30 kg per day" },
        { name: "Easy-to-chew Dry Fodder", amount: "3-4 kg per day" },
        { name: "Concentrate Mix", amount: "2-3 kg per day" },
        { name: "Senior Vitamin & Mineral Mix", amount: "80g per day" }
      ],
      tips: [
        "Provide easily digestible feed",
        "Feed smaller quantities multiple times",
        "Ensure adequate water intake",
        "Monitor dental health regularly"
      ]
    }
  }
};

const DietPlanPage = () => {
  const [animalType, setAnimalType] = useState<AnimalType>("cow");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  const [purpose, setPurpose] = useState<Purpose>("milk");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { toast } = useToast();

  const handleGeneratePlan = () => {
    let plan;

    if (ageGroup === "adult") {
      plan = dietPlans[animalType][ageGroup][purpose];
    } else {
      plan = dietPlans[animalType][ageGroup];
    }

    setSelectedPlan(plan);
    
    toast({
      title: "Diet Plan Generated",
      description: `Your custom ${animalType} diet plan is ready to view`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Customized Diet Plans"
        subtitle="Scientifically formulated nutrition recommendations for optimal health and productivity"
        backgroundClass="bg-gradient-to-r from-dairy-600 to-dairy-400"
        className="py-16 min-h-[40vh]"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl mx-auto">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">Generate Your Custom Diet Plan</h2>
            <p className="text-gray-600">
              Our diet plans are formulated by expert nutritionists based on years of research and practical 
              experience. Select your animal details below to get tailored recommendations.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Diet Plan Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-medium">Select Animal Type</h3>
                <RadioGroup 
                  defaultValue="cow" 
                  className="flex gap-4"
                  onValueChange={(value) => setAnimalType(value as AnimalType)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cow" id="cow" />
                    <Label htmlFor="cow">Cow</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buffalo" id="buffalo" />
                    <Label htmlFor="buffalo">Buffalo</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <h3 className="mb-4 text-lg font-medium">Select Age Group</h3>
                <RadioGroup 
                  defaultValue="adult" 
                  className="grid grid-cols-2 gap-4"
                  onValueChange={(value) => setAgeGroup(value as AgeGroup)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calf" id="calf" />
                    <Label htmlFor="calf">Calf (0-6 months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="young" id="young" />
                    <Label htmlFor="young">Young (6-24 months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adult" id="adult" />
                    <Label htmlFor="adult">Adult (2-8 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior">Senior (8+ years)</Label>
                  </div>
                </RadioGroup>
              </div>

              {ageGroup === "adult" && (
                <div className="mb-6">
                  <h3 className="mb-4 text-lg font-medium">Select Purpose</h3>
                  <RadioGroup 
                    defaultValue="milk" 
                    className="grid grid-cols-2 gap-4"
                    onValueChange={(value) => setPurpose(value as Purpose)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="milk" id="milk" />
                      <Label htmlFor="milk">Milk Production</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="breeding" id="breeding" />
                      <Label htmlFor="breeding">Breeding</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Dual Purpose</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <Button 
                className="w-full bg-dairy-500 hover:bg-dairy-600" 
                onClick={handleGeneratePlan}
              >
                Generate Diet Plan
              </Button>
            </div>

            {/* Diet Plan Display */}
            <div>
              {selectedPlan ? (
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle>{selectedPlan.title}</CardTitle>
                    <CardDescription>{selectedPlan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="components">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="components">Diet Components</TabsTrigger>
                        <TabsTrigger value="tips">Feeding Tips</TabsTrigger>
                      </TabsList>
                      <TabsContent value="components" className="mt-4">
                        <h4 className="font-medium mb-2">Recommended Daily Intake</h4>
                        <div className="space-y-2">
                          {selectedPlan.components.map((component: any, index: number) => (
                            <div key={index} className="flex justify-between border-b pb-2">
                              <span className="font-medium">{component.name}</span>
                              <span className="text-gray-600">{component.amount}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="tips" className="mt-4">
                        <h4 className="font-medium mb-2">Expert Recommendations</h4>
                        <ul className="space-y-2">
                          {selectedPlan.tips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-dairy-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => window.print()}>Print Plan</Button>
                    <Button className="bg-dairy-500 hover:bg-dairy-600">Save Plan</Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800">Diet Plan Preview</h3>
                    <p className="text-gray-500">Select your animal details and click "Generate Diet Plan" to see your customized recommendations.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Diet Information Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Our Approach to Cattle Nutrition</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              We combine scientific research with practical farming experience to provide diet plans 
              that optimize health, productivity, and profitability
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Life-Stage Specific",
                description: "Diet plans tailored to each growth stage, from newborn calves to senior cattle, ensuring optimal development at every phase."
              },
              {
                title: "Production Optimized",
                description: "Specialized nutrition for milk production, breeding, or dual-purpose animals to maximize output while maintaining health."
              },
              {
                title: "Locally Adaptable",
                description: "Recommendations that can be implemented using locally available feed ingredients, making them practical for all farmers."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dairy-100 text-dairy-600">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Common questions about our diet plans and cattle nutrition
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: "How often should I adjust my cattle's diet plan?",
                answer: "Diet plans should be reviewed seasonally and adjusted based on changes in animal condition, production levels, and available feed ingredients. Major life changes such as pregnancy, calving, or changes in milk production also warrant dietary adjustments."
              },
              {
                question: "Can I customize these diet plans based on available local feed?",
                answer: "Yes, our diet plans provide general nutritional guidelines that can be adapted to locally available feed resources. The key is to maintain the proper balance of energy, protein, minerals, and vitamins while considering cost-effectiveness."
              },
              {
                question: "How do I transition my cattle to a new diet plan?",
                answer: "Dietary changes should be implemented gradually over 7-14 days. Begin by replacing 25% of the old diet with the new one, then gradually increase the proportion of the new diet while decreasing the old one. This helps prevent digestive upsets and allows rumen microbes to adapt."
              },
              {
                question: "What signs indicate that my diet plan needs adjustment?",
                answer: "Watch for changes in milk production, body condition score, manure consistency, feed intake, or reproductive performance. If you notice any significant changes in these parameters, it may be time to review and adjust your feeding program."
              }
            ].map((faq, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">{faq.question}</h3>
                <Separator className="my-2" />
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dairy-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need personalized nutrition advice?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Our expert nutritionists can provide tailored recommendations for your specific situation
          </p>
          <Button variant="outline" className="bg-white text-dairy-600 hover:bg-gray-100">
            Contact a Nutritionist
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DietPlanPage;
