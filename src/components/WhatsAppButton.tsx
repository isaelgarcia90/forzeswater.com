import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "525518070867";
  const message = encodeURIComponent("Hola, me gustaría obtener más información sobre sus servicios de tratamiento de agua.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-3 bg-background text-foreground px-3 py-2 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
};

export default WhatsAppButton;
