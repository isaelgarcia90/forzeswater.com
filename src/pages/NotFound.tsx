import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página no encontrada (404) — Forzes Water</title>
        <meta
          name="description"
          content="La página que buscas no existe o fue movida. Vuelve al inicio de Forzes Water para explorar nuestros sistemas de tratamiento de agua."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Página no encontrada (404) — Forzes Water" />
        <meta
          property="og:description"
          content="La página que buscas no existe o fue movida. Vuelve al inicio de Forzes Water."
        />
        <meta property="og:url" content="https://www.forzeswater.com/404" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
