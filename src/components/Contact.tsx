import { useEffect, useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import forzecito from "@/assets/forzecito.webp";
import { EMAIL_ADDRESS, OFFICE_ADDRESS, OFFICE_MAPS_URL, PHONE_DISPLAY, PHONE_HREF, WA_DEFAULT } from "@/data/landing";
import { openForzecito } from "@/context/LandingContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Marks, WhatsAppIcon } from "./fw";

/** ¿Está abierta la oficina ahora? (L–V 9:00–18:00, hora de CDMX) */
function isOpenNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Mexico_City",
      weekday: "short",
      hour: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const wd = parts.find((x) => x.type === "weekday")?.value ?? "";
    const h = Number(parts.find((x) => x.type === "hour")?.value);
    return !["Sat", "Sun"].includes(wd) && h >= 9 && h < 18;
  } catch {
    return false;
  }
}

const cellCls =
  "flex gap-3.5 p-[22px] text-fw-text transition-colors hover:bg-[hsl(188_94%_43%/.06)] hover:text-fw-text";
const iconCls = "mt-0.5 h-5 w-5 flex-none text-[hsl(188_94%_50%)]";
const labelCls = "text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-label";

const Contact = () => {
  const [open, setOpen] = useState(isOpenNow);
  const { trackContactClick } = useAnalytics();

  useEffect(() => {
    const t = window.setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="contacto" className="scroll-mt-[68px] border-t border-[rgba(148,190,220,.1)]">
      <div className="fw-section mx-auto flex max-w-[1080px] flex-col gap-10 px-[clamp(18px,4vw,40px)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="fw-eyebrow">06 · Centro de contacto</p>
          <h2 className="m-0 font-display text-[clamp(40px,5vw,64px)] font-semibold leading-none">Hablemos de tu proyecto</h2>
          <p className="m-0 text-lg leading-normal text-fw-sec">Elige el canal que prefieras. Te respondemos rápido.</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
          <div className="relative flex flex-col gap-4 border border-[hsl(188_94%_43%/.4)] p-8 transition-all duration-300 [background:linear-gradient(160deg,hsl(199_89%_32%/.35),#17232e_55%)] hover:shadow-[0_0_0_1px_hsl(188_94%_43%/.3),0_30px_70px_-30px_hsl(188_94%_43%/.7)] max-md:p-6">
            <Marks opacity={1} />
            <div className="flex items-center justify-between">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[hsl(142_70%_42%)] text-white">
                <WhatsAppIcon className="h-[30px] w-[30px]" />
              </span>
              <span className="border border-[hsl(174_72%_56%/.4)] px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-aqua">
                Canal principal
              </span>
            </div>
            <h3 className="m-0 font-display text-[34px] font-semibold leading-none">WhatsApp</h3>
            <p className="m-0 text-base leading-[1.55] text-fw-sec">Habla directo con un asesor técnico y envía fotos de tu equipo o tu agua.</p>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("WhatsApp - Contacto")}
              className="fw-btn-cyan mt-auto h-[52px] gap-2.5 text-base hover:shadow-[0_14px_40px_-12px_hsl(174_72%_56%/.8)]"
            >
              Escribir por WhatsApp <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
          </div>

          <div className="relative flex flex-col gap-4 border border-[hsl(174_72%_56%/.4)] p-8 transition-all duration-300 [background:linear-gradient(160deg,hsl(174_72%_56%/.16),#17232e_55%)] hover:shadow-[0_0_0_1px_hsl(174_72%_56%/.3),0_30px_70px_-30px_hsl(174_72%_56%/.7)] max-md:p-6">
            <Marks opacity={1} />
            <div className="flex items-center justify-between">
              <img src={forzecito} alt="Forzecito" className="h-[60px] w-[60px] rounded-full" />
              <span className="flex items-center gap-[7px] border border-[rgba(148,190,220,.25)] px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-nav">
                <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-fw-online shadow-[0_0_8px_hsl(150_70%_50%)]" />
                En línea
              </span>
            </div>
            <h3 className="m-0 font-display text-[34px] font-semibold leading-none">Forzecito</h3>
            <p className="m-0 text-base leading-[1.55] text-fw-sec">Resuelve tus dudas al instante y te ayuda a encontrar el sistema correcto.</p>
            <button type="button" onClick={() => openForzecito()} className="fw-btn-aqua mt-auto h-[52px] gap-2.5 text-base">
              Preguntar a Forzecito <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] border border-[rgba(148,190,220,.16)] [&>*]:border-[rgba(148,190,220,.16)] [&>*:not(:last-child)]:border-b min-[1000px]:[&>*:not(:last-child)]:border-b-0 min-[1000px]:[&>*:not(:last-child)]:border-r">
          <a href={PHONE_HREF} onClick={() => trackContactClick("Teléfono - Contacto")} className={cellCls}>
            <Phone className={iconCls} strokeWidth={1.5} />
            <span className="flex flex-col gap-1.5">
              <span className={labelCls}>Teléfono</span>
              <span className="text-base font-medium leading-[1.3]">{PHONE_DISPLAY}</span>
            </span>
          </a>
          <a href={`mailto:${EMAIL_ADDRESS}`} onClick={() => trackContactClick("Correo - Contacto")} className={cellCls}>
            <Mail className={iconCls} strokeWidth={1.5} />
            <span className="flex min-w-0 flex-col gap-1.5">
              <span className={labelCls}>Correo</span>
              <span className="text-base font-medium leading-[1.3] [overflow-wrap:anywhere]">{EMAIL_ADDRESS}</span>
            </span>
          </a>
          <a href={OFFICE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={cellCls}>
            <MapPin className={iconCls} strokeWidth={1.5} />
            <span className="flex flex-col gap-1.5">
              <span className={labelCls}>Oficina CDMX</span>
              <span className="text-[15px] font-medium leading-[1.4]">{OFFICE_ADDRESS}</span>
            </span>
          </a>
          <div className="flex gap-3.5 p-[22px]">
            <Clock className={iconCls} strokeWidth={1.5} />
            <span className="flex flex-col gap-1.5">
              <span className={labelCls}>Horario</span>
              <span className="text-base font-medium leading-[1.3]">Lunes a Viernes, 9:00 a 18:00 hrs</span>
              <span className={`flex items-center gap-1.5 text-xs font-semibold leading-none ${open ? "text-[hsl(150_70%_55%)]" : "text-fw-ter"}`}>
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${open ? "bg-[hsl(150_70%_55%)]" : "bg-fw-ter"}`} />
                {open ? "Abierto ahora" : "Fuera de horario · Forzecito te atiende"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
