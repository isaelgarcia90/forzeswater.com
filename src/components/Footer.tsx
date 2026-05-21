import { Facebook, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/forzes-water-logo.jpeg";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Forzes Water" className="w-10 h-10 rounded-lg object-cover bg-white" />
              <span className="text-xl font-bold">Forzes Water</span>
            </div>
            <p className="text-white/80 mb-4 text-justify">
              Soluciones profesionales de tratamiento de agua para un futuro más limpio y saludable.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/forzes.psco" target="_blank" rel="noopener noreferrer nofollow" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: "Inicio", id: "hero" },
                { label: "Nosotros", id: "about" },
                { label: "Soluciones", id: "solutions" },
                { label: "Productos", id: "products" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {[
                { label: "Servicios", id: "services" },
                { label: "Contacto", id: "contact" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Información de Contacto</h3>
            <ul className="space-y-2 text-white/80 text-justify">
              <li>(+52) 55-1807-0867</li>
              <li>forzeswater@gmail.com</li>
              <li>Campeche 1723-111, Chalma de Guadalupe</li>
              <li>Gustavo A. Madero, 07210</li>
              <li>Ciudad de México, CDMX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 text-center text-white/90">
          <p>&copy; {new Date().getFullYear()} Forzes Water. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
