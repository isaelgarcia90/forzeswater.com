import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const productCategories = [
    {
      id: "pumps",
      label: "Water Pumps",
      products: [
        {
          title: "Submersible Pumps",
          description: "High-performance submersible pumps for deep well applications",
          specs: "Up to 500m depth, 5-500 HP",
        },
        {
          title: "Centrifugal Pumps",
          description: "Efficient centrifugal pumps for water distribution",
          specs: "Flow rates up to 5000 m³/h",
        },
        {
          title: "Booster Pumps",
          description: "Pressure boosting systems for building water supply",
          specs: "Variable speed, energy-efficient",
        },
      ],
    },
    {
      id: "panels",
      label: "Control Panels",
      products: [
        {
          title: "PLC Control Systems",
          description: "Advanced programmable logic controllers for automation",
          specs: "Siemens/Allen-Bradley compatible",
        },
        {
          title: "Pump Controllers",
          description: "Intelligent pump control and monitoring systems",
          specs: "Remote monitoring capability",
        },
        {
          title: "Automation Panels",
          description: "Complete automation solutions for water systems",
          specs: "Custom-built, UL certified",
        },
      ],
    },
    {
      id: "filters",
      label: "Filters",
      products: [
        {
          title: "Sand Filters",
          description: "Multi-media sand filtration systems",
          specs: "Various sizes, automatic backwash",
        },
        {
          title: "Activated Carbon Filters",
          description: "Removes chlorine, odor, and organic compounds",
          specs: "High-grade activated carbon",
        },
        {
          title: "Cartridge Filters",
          description: "Precision filtration with replaceable cartridges",
          specs: "1-100 micron options",
        },
      ],
    },
    {
      id: "plants",
      label: "Treatment Plants",
      products: [
        {
          title: "RO Plants",
          description: "Complete reverse osmosis water purification systems",
          specs: "100 LPH to 100,000 LPH capacity",
        },
        {
          title: "Wastewater Treatment",
          description: "Industrial and municipal wastewater treatment",
          specs: "Biological & chemical treatment",
        },
        {
          title: "Drinking Water Plants",
          description: "Turnkey drinking water production facilities",
          specs: "WHO standards compliant",
        },
      ],
    },
  ];

  return (
    <section id="products" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            High-quality water treatment equipment and systems
          </p>
        </div>

        <Tabs defaultValue="pumps" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            {productCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-base">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {productCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product, index) => (
                  <Card key={index} className="p-6 hover:shadow-large transition-all duration-300 bg-card border-border">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl opacity-20">🔧</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-3">{product.description}</p>
                    <p className="text-sm text-primary font-semibold mb-4">{product.specs}</p>
                    <Button variant="outline" className="w-full group">
                      More Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Products;
