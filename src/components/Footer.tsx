const Footer = () => (
  <footer className="border-t border-[rgba(148,190,220,.1)] bg-fw-foot">
    <div className="fw-container flex flex-wrap justify-between gap-3 py-7 text-[13px] leading-[1.4] text-fw-dim">
      <span>© {new Date().getFullYear()} Forzes Water · Ingeniería en tratamiento de agua · CDMX</span>
      <span>Soporte técnico 24/7 para clientes con contrato de mantenimiento</span>
    </div>
  </footer>
);

export default Footer;
