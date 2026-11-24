import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-[rgba(148,190,220,.1)] bg-fw-foot">
    <div className="fw-container flex flex-wrap justify-between gap-3 py-7 text-[13px] leading-[1.4] text-fw-dim">
      <span>© {new Date().getFullYear()} Forzes Water · Ingeniería en tratamiento de agua · CDMX</span>
      <span className="flex flex-wrap gap-x-4 gap-y-1">
        <span>Soporte técnico 24/7 para clientes con contrato de mantenimiento</span>
        <Link to="/aviso-de-privacidad" className="text-fw-nav underline-offset-2 hover:text-fw-aqua hover:underline">
          Aviso de privacidad
        </Link>
      </span>
    </div>
  </footer>
);

export default Footer;
