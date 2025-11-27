import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje Enviado!",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solicita una cotización o contáctanos para cualquier consulta sobre nuestras soluciones de tratamiento de agua
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="p-8 bg-card border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="tu.correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+52 55 1807 0867"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mensaje</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                    placeholder="Cuéntanos sobre los requerimientos de tu proyecto..."
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Teléfono</h3>
                <p className="text-muted-foreground">+52 55 1807 0867</p>
                <p className="text-muted-foreground">
                  <a href="https://wa.me/525518070867" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-primary transition-colors">
                    WhatsApp: +52 55 1807 0867
                  </a>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Correo Electrónico</h3>
                <p className="text-muted-foreground">info@forseswater.com</p>
                <p className="text-muted-foreground">ventas@forseswater.com</p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground">123 Avenida Industrial</p>
                <p className="text-muted-foreground">Distrito de Tratamiento de Agua</p>
                <p className="text-muted-foreground">Ciudad, Estado 12345</p>
              </div>
            </Card>

            <div className="h-64 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Integración de mapa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
