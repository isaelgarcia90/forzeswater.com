import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import logo from "@/assets/forzes-water-logo.jpeg";

interface LogoDialogProps {
  className?: string;
  bgWhite?: boolean;
}

const LogoDialog = ({ className, bgWhite }: LogoDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ver logo de Forzes Water en grande"
        className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
      >
        <img
          src={logo}
          alt="Forzes Water"
          className={`w-10 h-10 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity ${
            bgWhite ? "bg-white" : ""
          } ${className ?? ""}`}
        />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md p-4 sm:p-6 flex flex-col items-center bg-background">
          <DialogTitle className="sr-only">Logo de Forzes Water</DialogTitle>
          <DialogDescription className="sr-only">
            Vista ampliada del logo de Forzes Water
          </DialogDescription>
          <img
            src={logo}
            alt="Logo de Forzes Water ampliado"
            className="w-full h-auto max-w-[80vw] sm:max-w-sm max-h-[70vh] object-contain rounded-xl"
          />
          <p className="mt-4 text-base sm:text-lg font-semibold text-foreground">Forzes Water</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoDialog;
