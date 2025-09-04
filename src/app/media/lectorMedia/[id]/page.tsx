"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const mockPages = [
  "https://i.pinimg.com/1200x/5d/04/61/5d0461d3f99138155a9c2e3a54d9f524.jpg",
  "https://i.pinimg.com/1200x/5d/04/61/5d0461d3f99138155a9c2e3a54d9f524.jpg",
  "https://i.pinimg.com/1200x/5d/04/61/5d0461d3f99138155a9c2e3a54d9f524.jpg",
  "https://i.pinimg.com/1200x/5d/04/61/5d0461d3f99138155a9c2e3a54d9f524.jpg",
];

const mockUserSettings: { userId: number; username: string; defaultDisplayMode: DisplayMode; imageFitMode: ImageFitMode } = {
  userId: 1,
  username: "AzutaMagh",
  defaultDisplayMode: "paginada",
  imageFitMode: "no-limit"
};

const sharedGroup = {
  name: "Mi Scan",
};

const mockChapterNavigation = {
  hasPrev: true,
  hasNext: true,
};

const socialNetworks = [
  { name: "Facebook", url: "https://facebook.com/miscan" },
  { name: "Twitter", url: "https://twitter.com/miscan" },
  { name: "Discord", url: "https://discord.gg/miscan" },
  { name: "Telegram", url: "" }, // si está vacío NO se renderiza
  { name: "Info", url: "https://miscan.org" },
];

type DisplayMode = "paginada" | "cascada" | "completa";
type ImageFitMode = "no-limit" | "fit-height" | "fit-both";

const ChapterPage = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(mockUserSettings.defaultDisplayMode);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageFitMode, setImageFitMode] = useState<ImageFitMode>(mockUserSettings.imageFitMode ?? "no-limit");

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const observer = useRef<IntersectionObserver>();

  // Lazy load
  const observePage = useCallback(
    (node: HTMLDivElement, idx: number) => {
      if (!node) return;
      if (!observer.current) {
        observer.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisiblePages((prev) => {
                  if (!prev.includes(idx)) return [...prev, idx];
                  return prev;
                });
              }
            });
          },
          { root: containerRef.current, threshold: 0.5 }
        );
      }
      observer.current.observe(node);
    },
    []
  );

  useEffect(() => {
    setPages(mockPages);
  }, []);

  // Reset currentPage según modo
  useEffect(() => {
    if (displayMode === "paginada") {
      setCurrentPage(0);
      setTimeout(() => pageRefs.current[0]?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      setCurrentPage(-1);
    }
  }, [displayMode]);

  const handleNext = () => {
    if (displayMode === "paginada") {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
    }
  };

  const handlePrev = () => {
    if (displayMode === "paginada") {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  // Ciclar ImageFitMode
  const cycleImageFitMode = () => {
    setImageFitMode((prev) => {
      if (prev === "no-limit") return "fit-height";
      if (prev === "fit-height") return "fit-both";
      return "no-limit";
    });
  };

  // Estilo de imagen según modo
  const getImageStyle = () => {
    switch (imageFitMode) {
      case "fit-height":
        return { height: "100vh", width: "auto", maxWidth: "100%", margin: "0 auto", display: "block" };
      case "fit-both":
        return { maxHeight: "100vh", maxWidth: "100vw", width: "auto", height: "auto", margin: "0 auto", display: "block" };
      case "no-limit":
      default:
        return { width: "auto", height: "auto", maxWidth: "90%", margin: "0 auto", display: "block" };
    }
  };

  return (
    <div className="chapter-page">
      <header className="header-controls">
        <button onClick={() => window.history.back()}>Volver</button>

        {displayMode === "paginada" ? (
          <button onClick={() => setDisplayMode("cascada")}>Cascada</button>
        ) : (
          <button onClick={() => setDisplayMode("paginada")}>Paginada</button>
        )}

        <button
          onClick={() => {
            setDisplayMode("completa");
            if (!document.fullscreenElement) {
              const elem = document.documentElement;
              if (elem.requestFullscreen) elem.requestFullscreen();
              else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen;
              else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen;
            } else {
              if (document.exitFullscreen) document.exitFullscreen();
              else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen;
              else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen;
            }
          }}
        >
          Completa
        </button>

        <button onClick={cycleImageFitMode}>
          {imageFitMode === "no-limit" && "No Limit"}
          {imageFitMode === "fit-height" && "Fit Height"}
          {imageFitMode === "fit-both" && "Fit Both"}
        </button>

        {displayMode === "paginada" && (
          <>
            <button onClick={handlePrev}>Anterior</button>
            <button onClick={handleNext}>Siguiente</button>
          </>
        )}
      </header>


      <div className={`chapter-container ${displayMode}`} ref={containerRef}>
        {pages.map((src, idx) => (
          <div
            key={idx}
            className={`page ${displayMode === "paginada" && idx !== currentPage ? "hidden" : ""}`}
            ref={(el) => {
              if (el) pageRefs.current[idx] = el;
              observePage(el!, idx);
            }}
          >
            {visiblePages.includes(idx) ? (
              <img src={src} alt={`Page ${idx + 1}`} style={getImageStyle()} />
            ) : (
              <div className="placeholder">Cargando...</div>
            )}
          </div>
        ))}

        {/* Controles de navegación */}
        <div
          className="bg-[#151F2E] chapter-nav flex justify-center gap-12 my-6"
          style={{ height: "10%" }}
        >
          {mockChapterNavigation.hasPrev && (
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              ◀ Cap. anterior
            </button>
          )}

          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            ⬆ Inicio
          </button>

          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            ⬅ Volver
          </button>

          {mockChapterNavigation.hasNext && (
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              Cap. siguiente ▶
            </button>
          )}
        </div>

        {/* Footer de apoyo */}
        <div className="support-wrap text-center my-10 text-lg">
          <p className="support-text text-white mb-4">
            Comparte esta serie
            <br />
            ¡y muestra tu apoyo al scan!
            <br />
            Scan: {sharedGroup.name}
          </p>

          <ul className="spi_area flex justify-center gap-4">
            {socialNetworks
              .filter((n) => n.url)
              .map((n) => (
                <li key={n.name}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spi_link block"
                    title={n.name}
                  >
                    {n.name === "Facebook" && (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                        <path fill="white" d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
                      </svg>
                    )}

                    {n.name === "Twitter" && (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                        <path fill="white" d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
                      </svg>
                    )}

                    {n.name === "Discord" && (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                        <path fill="white" d="M 18.90625 7 C 18.90625 7 12.539063 7.4375 8.375 10.78125 C 8.355469 10.789063 8.332031 10.800781 8.3125 10.8125 C 7.589844 11.480469 7.046875 12.515625 6.375 14 C 5.703125 15.484375 4.992188 17.394531 4.34375 19.53125 C 3.050781 23.808594 2 29.058594 2 34 C 1.996094 34.175781 2.039063 34.347656 2.125 34.5 C 3.585938 37.066406 6.273438 38.617188 8.78125 39.59375 C 11.289063 40.570313 13.605469 40.960938 14.78125 41 C 15.113281 41.011719 15.429688 40.859375 15.625 40.59375 L 18.0625 37.21875 C 20.027344 37.683594 22.332031 38 25 38 C 27.667969 38 29.972656 37.683594 31.9375 37.21875 L 34.375 40.59375 C 34.570313 40.859375 34.886719 41.011719 35.21875 41 C 36.394531 40.960938 38.710938 40.570313 41.21875 39.59375 C 43.726563 38.617188 46.414063 37.066406 47.875 34.5 C 47.960938 34.347656 48.003906 34.175781 48 34 C 48 29.058594 46.949219 23.808594 45.65625 19.53125 C 45.007813 17.394531 44.296875 15.484375 43.625 14 C 42.953125 12.515625 42.410156 11.480469 41.6875 10.8125 C 41.667969 10.800781 41.644531 10.789063 41.625 10.78125 C 37.460938 7.4375 31.09375 7 31.09375 7 C 31.019531 6.992188 30.949219 6.992188 30.875 7 C 30.527344 7.046875 30.234375 7.273438 30.09375 7.59375 C 30.09375 7.59375 29.753906 8.339844 29.53125 9.40625 C 27.582031 9.09375 25.941406 9 25 9 C 24.058594 9 22.417969 9.09375 20.46875 9.40625 C 20.246094 8.339844 19.90625 7.59375 19.90625 7.59375 C 19.734375 7.203125 19.332031 6.964844 18.90625 7 Z M 18.28125 9.15625 C 18.355469 9.359375 18.40625 9.550781 18.46875 9.78125 C 16.214844 10.304688 13.746094 11.160156 11.4375 12.59375 C 11.074219 12.746094 10.835938 13.097656 10.824219 13.492188 C 10.816406 13.882813 11.039063 14.246094 11.390625 14.417969 C 11.746094 14.585938 12.167969 14.535156 12.46875 14.28125 C 17.101563 11.410156 22.996094 11 25 11 C 27.003906 11 32.898438 11.410156 37.53125 14.28125 C 37.832031 14.535156 38.253906 14.585938 38.609375 14.417969 C 38.960938 14.246094 39.183594 13.882813 39.175781 13.492188 C 39.164063 13.097656 38.925781 12.746094 38.5625 12.59375 C 36.253906 11.160156 33.785156 10.304688 31.53125 9.78125 C 31.59375 9.550781 31.644531 9.359375 31.71875 9.15625 C 32.859375 9.296875 37.292969 9.894531 40.3125 12.28125 C 40.507813 12.460938 41.1875 13.460938 41.8125 14.84375 C 42.4375 16.226563 43.09375 18.027344 43.71875 20.09375 C 44.9375 24.125 45.921875 29.097656 45.96875 33.65625 C 44.832031 35.496094 42.699219 36.863281 40.5 37.71875 C 38.5 38.496094 36.632813 38.84375 35.65625 38.9375 L 33.96875 36.65625 C 34.828125 36.378906 35.601563 36.078125 36.28125 35.78125 C 38.804688 34.671875 40.15625 33.5 40.15625 33.5 C 40.570313 33.128906 40.605469 32.492188 40.234375 32.078125 C 39.863281 31.664063 39.226563 31.628906 38.8125 32 C 38.8125 32 37.765625 32.957031 35.46875 33.96875 C 34.625 34.339844 33.601563 34.707031 32.4375 35.03125 C 32.167969 35 31.898438 35.078125 31.6875 35.25 C 29.824219 35.703125 27.609375 36 25 36 C 22.371094 36 20.152344 35.675781 18.28125 35.21875 C 18.070313 35.078125 17.8125 35.019531 17.5625 35.0625 C 16.394531 34.738281 15.378906 34.339844 14.53125 33.96875 C 12.234375 32.957031 11.1875 32 11.1875 32 C 10.960938 31.789063 10.648438 31.699219 10.34375 31.75 C 9.957031 31.808594 9.636719 32.085938 9.53125 32.464844 C 9.421875 32.839844 9.546875 33.246094 9.84375 33.5 C 9.84375 33.5 11.195313 34.671875 13.71875 35.78125 C 14.398438 36.078125 15.171875 36.378906 16.03125 36.65625 L 14.34375 38.9375 C 13.367188 38.84375 11.5 38.496094 9.5 37.71875 C 7.300781 36.863281 5.167969 35.496094 4.03125 33.65625 C 4.078125 29.097656 5.0625 24.125 6.28125 20.09375 C 6.90625 18.027344 7.5625 16.226563 8.1875 14.84375 C 8.8125 13.460938 9.492188 12.460938 9.6875 12.28125 C 12.707031 9.894531 17.140625 9.296875 18.28125 9.15625 Z M 18.5 21 C 15.949219 21 14 23.316406 14 26 C 14 28.683594 15.949219 31 18.5 31 C 21.050781 31 23 28.683594 23 26 C 23 23.316406 21.050781 21 18.5 21 Z M 31.5 21 C 28.949219 21 27 23.316406 27 26 C 27 28.683594 28.949219 31 31.5 31 C 34.050781 31 36 28.683594 36 26 C 36 23.316406 34.050781 21 31.5 21 Z M 18.5 23 C 19.816406 23 21 24.265625 21 26 C 21 27.734375 19.816406 29 18.5 29 C 17.183594 29 16 27.734375 16 26 C 16 24.265625 17.183594 23 18.5 23 Z M 31.5 23 C 32.816406 23 34 24.265625 34 26 C 34 27.734375 32.816406 29 31.5 29 C 30.183594 29 29 27.734375 29 26 C 29 24.265625 30.183594 23 31.5 23 Z"></path>
                      </svg>
                    )}

                    {n.name === "Telegram" && (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                        <path fill="white" d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
                      </svg>
                    )}

                    {n.name === "Info" && (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                        <path fill="white" d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
          </ul>

          {/* Texto debajo */}
          <p className="text-xs text-gray-400 text-center max-w-md mt-2" style={{ justifySelf: "center" }}>
            Todas estas redes pertenecen al grupo.
            Si alguna red redirige a un lugar sospechoso o peligroso por favor reportar aquí:
          </p>

          {/* Botón reportar */}
          <button className="reportBtn mt-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Reportar
          </button>
        </div>

      </div>


      <style jsx>{`
        .chapter-page {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .header-controls {
          display: flex;
          justify-content: center; /* centra todos los botones */
          flex-wrap: wrap;         /* permite varias líneas si hay muchos botones */
          gap: 1rem; /* más espacio entre botones */
          padding: 1rem 1.5rem; /* header más grande */
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(30, 41, 59, 0.95); /* fondo semitransparente */
          border-bottom: 1px solid #444;
          backdrop-filter: blur(5px); /* efecto glass */
        }

        .reportBtn{
          padding: 0.4rem 0.8rem;
          border: none;
          background: #bf941f;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .reportBtn:hover {
          background: #ccc;
        }


        .header-controls button {
    padding: 0.6rem 1.2rem; /* botones más grandes */
          border: none;
    border-radius: 10px; /* un poco más redondeados */
          background: #bf941f;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .header-controls button:hover {
          background: #d4af37;
    transform: scale(1.08); /* efecto hover un poco más evidente */
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        }

        .chapter-container {
          overflow-y: auto;
          flex: 1;
          scroll-behavior: smooth;
          padding: 1rem;
        }

        .page {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .page.hidden {
          display: none;
        }

        .placeholder {
          width: 60%;
          height: 60vh;
          background: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }

        /* Asegurar centrado en cascada y completa */
        .chapter-container.cascada .page img,
        .chapter-container.completa .page img {
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default ChapterPage;
