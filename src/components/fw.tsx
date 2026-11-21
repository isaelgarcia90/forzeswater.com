import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Marcas de registro "+" en las esquinas del contenedor (que debe ser relative). */
export const Marks = ({ opacity = 0.7, corners = "all" }: { opacity?: number; corners?: "all" | "diagonal" }) => {
  const style = { opacity };
  return (
    <>
      <i aria-hidden className="fw-mark -left-1.5 -top-1.5" style={style} />
      {corners === "all" && <i aria-hidden className="fw-mark -right-1.5 -top-1.5" style={style} />}
      {corners === "all" && <i aria-hidden className="fw-mark -bottom-1.5 -left-1.5" style={style} />}
      <i aria-hidden className="fw-mark -bottom-1.5 -right-1.5" style={style} />
    </>
  );
};

export const Eyebrow = ({ children, line = true, lineClass }: { children: ReactNode; line?: boolean; lineClass?: string }) => (
  <p className="fw-eyebrow">
    {children}
    {line && <span aria-hidden className={cn("fw-eyebrow-line", lineClass)} />}
  </p>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const CloseButton = ({ className, label = "Cerrar" }: { className?: string; label?: string }) => (
  <DialogPrimitive.Close
    aria-label={label}
    className={cn(
      "flex h-9 w-9 items-center justify-center border border-[rgba(148,190,220,.25)] bg-transparent text-fw-text transition-colors hover:border-fw-cyan",
      className
    )}
  >
    <X className="h-4 w-4" strokeWidth={1.5} />
  </DialogPrimitive.Close>
);

/** Modal centrado con el estilo del rediseño (sobre Radix Dialog). */
export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  className,
  children,
  zIndex = "z-[85]",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  zIndex?: string;
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 bg-[rgba(6,10,14,.72)] backdrop-blur-[4px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          zIndex
        )}
      />
      <div className={cn("pointer-events-none fixed inset-0 flex items-center justify-center p-5", zIndex)}>
        <DialogPrimitive.Content
          className={cn(
            "pointer-events-auto relative max-h-[90vh] w-full overflow-y-auto border border-[hsl(188_94%_43%/.35)] bg-fw-modal text-fw-text shadow-modal outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{description ?? title}</DialogPrimitive.Description>
          {children}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
