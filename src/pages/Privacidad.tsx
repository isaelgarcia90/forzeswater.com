import { useEffect, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/forzes-water-logo.jpeg";
import Footer from "@/components/Footer";
import { EMAIL_ADDRESS, OFFICE_ADDRESS, PHONE_DISPLAY } from "@/data/landing";

/**
 * Datos legales del responsable.
 * PENDIENTE: completar los campos marcados con `null` antes de publicar.
 */
const RESPONSABLE = {
  razonSocial: null as string | null, // Nombre o razón social del responsable (persona física o moral)
  nombreComercial: "Forzes Water",
  domicilio: `${OFFICE_ADDRESS}, Ciudad de México` as string | null, // Confirmar que es el domicilio legal
  correoArco: EMAIL_ADDRESS as string | null, // Confirmar el correo para solicitudes ARCO
  telefono: PHONE_DISPLAY,
};
const ULTIMA_ACTUALIZACION = "24 de noviembre de 2026";

/** Marca visible para un dato legal que falta completar. */
const Dato = ({ value, label }: { value: string | null; label: string }) =>
  value ? (
    <>{value}</>
  ) : (
    <mark className="bg-[hsl(45_95%_55%/.2)] px-1 text-[hsl(45_95%_65%)]">[Pendiente: {label}]</mark>
  );

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-3 mt-10 font-display text-[28px] font-semibold leading-tight text-fw-text">{children}</h2>
);

const Privacidad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-fw-bg text-fw-text">
      <Helmet>
        <title>Aviso de privacidad · Forzes Water</title>
        <meta name="description" content="Aviso de privacidad integral de Forzes Water conforme a la LFPDPPP." />
      </Helmet>

      <header className="sticky top-0 z-[60] border-b border-[rgba(148,190,220,.12)] bg-[rgba(14,22,30,.82)] backdrop-blur-[14px]">
        <div className="fw-container flex h-[68px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 text-fw-text hover:text-fw-text">
            <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden bg-white">
              <img src={logo} alt="Forzes Water" className="h-[46px] w-[46px] max-w-none object-cover [object-position:50%_30%]" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold leading-none tracking-[.08em]">FORZES</span>
              <span className="text-[10px] font-semibold leading-[1.4] tracking-[.42em] text-fw-cyan">WATER</span>
            </span>
          </Link>
          <Link to="/" className="fw-btn-outline h-10 gap-2 px-4 text-sm">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Volver al sitio
          </Link>
        </div>
      </header>

      <main className="fw-container py-[clamp(48px,7vw,88px)]">
        <article className="mx-auto max-w-[760px] text-base leading-[1.7] text-fw-sec [&_li]:mb-1.5 [&_strong]:text-fw-text [&_ul]:list-disc [&_ul]:pl-6">
          <p className="fw-eyebrow mb-4">Legal</p>
          <h1 className="m-0 font-display text-[clamp(38px,5vw,56px)] font-semibold leading-none text-fw-text">Aviso de privacidad integral</h1>
          <p className="mt-4 text-sm text-fw-label">Última actualización: {ULTIMA_ACTUALIZACION}</p>

          <H2>1. Responsable de tus datos</H2>
          <p>
            <strong><Dato value={RESPONSABLE.razonSocial} label="nombre o razón social" /></strong>, que opera con el nombre
            comercial <strong>{RESPONSABLE.nombreComercial}</strong>, con domicilio en{" "}
            <Dato value={RESPONSABLE.domicilio} label="domicilio legal" />, es responsable del tratamiento de tus datos
            personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)
            y su Reglamento.
          </p>

          <H2>2. Datos personales que recabamos</H2>
          <p>Cuando nos contactas a través de este sitio podemos recabar:</p>
          <ul>
            <li><strong>Identificación y contacto:</strong> nombre, correo electrónico, teléfono y, si lo proporcionas, el nombre de tu empresa.</li>
            <li><strong>Información de tu solicitud:</strong> la lista de precios que pides, los equipos de tu lista de cotización y lo que escribes en el chat con Forzecito.</li>
            <li><strong>Datos de navegación:</strong> información técnica básica de tu visita (ver sección 7).</li>
          </ul>
          <p>No recabamos datos personales sensibles. Te pedimos no compartirlos en el chat.</p>

          <H2>3. Finalidades</H2>
          <p><strong>Finalidades primarias</strong> (necesarias para atender tu solicitud):</p>
          <ul>
            <li>Responder tus dudas y darte asesoría técnica, por chat, WhatsApp, teléfono o correo.</li>
            <li>Enviarte las listas de precios que solicites.</li>
            <li>Elaborar y dar seguimiento a cotizaciones, proyectos, instalaciones y servicios de mantenimiento.</li>
          </ul>
          <p><strong>Finalidades secundarias</strong> (no necesarias, pero nos ayudan a darte mejor atención):</p>
          <ul>
            <li>Ofrecerte descuentos, promociones y cotizaciones personalizadas.</li>
            <li>Enviarte información sobre productos y servicios.</li>
            <li>Mejorar nuestro sitio, nuestro asistente virtual y la calidad de la atención.</li>
          </ul>
          <p>
            Si no quieres que usemos tus datos para las finalidades secundarias, escríbenos a{" "}
            <Dato value={RESPONSABLE.correoArco} label="correo de privacidad" /> con el asunto "Finalidades secundarias".
            Tu negativa no afectará la atención de tu solicitud.
          </p>

          <H2>4. Con quién compartimos tus datos</H2>
          <p>
            No vendemos tus datos. Para operar el sitio usamos proveedores que los tratan por nuestra cuenta y bajo nuestras
            instrucciones (encargados):
          </p>
          <ul>
            <li>Supabase, para alojar la base de datos donde se guardan las solicitudes.</li>
            <li>Formspree, para enviarnos por correo el aviso de cada solicitud.</li>
            <li>El proveedor de inteligencia artificial que genera las respuestas de Forzecito, que recibe el texto de la conversación.</li>
          </ul>
          <p>
            Si eliges escribirnos por WhatsApp, esa conversación también se rige por las políticas de WhatsApp (Meta). Solo
            transferiremos tus datos a terceros sin tu consentimiento en los casos de excepción que prevé la LFPDPPP,
            por ejemplo, por requerimiento de una autoridad competente.
          </p>

          <H2>5. Derechos ARCO y revocación del consentimiento</H2>
          <p>
            Tienes derecho a <strong>Acceder</strong> a tus datos, <strong>Rectificarlos</strong>, <strong>Cancelarlos</strong>{" "}
            u <strong>Oponerte</strong> a su uso, así como a revocar tu consentimiento. Para hacerlo, envía tu solicitud a{" "}
            <Dato value={RESPONSABLE.correoArco} label="correo de privacidad" /> con:
          </p>
          <ul>
            <li>Tu nombre y un medio para comunicarte contigo.</li>
            <li>Una identificación oficial (o, si actúa un representante, el documento que acredite su representación).</li>
            <li>La descripción clara del derecho que quieres ejercer y de los datos involucrados.</li>
          </ul>
          <p>
            Te responderemos en un máximo de 20 días hábiles y, si procede, haremos efectiva tu solicitud dentro de los 15 días
            hábiles siguientes. También puedes llamarnos al {RESPONSABLE.telefono} para orientarte.
          </p>

          <H2>6. Cómo limitar el uso de tus datos</H2>
          <p>
            Puedes pedirnos dejar de recibir promociones escribiendo a <Dato value={RESPONSABLE.correoArco} label="correo de privacidad" />.
            Además, puedes inscribirte en el Registro Público para Evitar Publicidad (REPEP) de la PROFECO.
          </p>

          <H2>7. Tecnologías de rastreo</H2>
          <p>Este sitio guarda información en tu propio navegador (almacenamiento local) para funcionar:</p>
          <ul>
            <li>Tu conversación con Forzecito, durante 24 horas, para que puedas retomarla.</li>
            <li>Los equipos de tu lista de cotización.</li>
          </ul>
          <p>
            También podemos usar herramientas de analítica (como Google Analytics) para conocer de forma estadística cómo se
            usa el sitio, y cargamos tipografías de Google Fonts. Puedes borrar el almacenamiento local o bloquear estas
            herramientas desde la configuración de tu navegador.
          </p>

          <H2>8. Cambios a este aviso</H2>
          <p>
            Cualquier cambio a este aviso de privacidad se publicará en esta misma página, indicando la fecha de la última
            actualización.
          </p>

          <H2>9. Autoridad</H2>
          <p>
            Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad
            competente en materia de protección de datos personales.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Privacidad;
