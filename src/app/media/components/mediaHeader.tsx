"use client";
import { MediaItem } from "@/context/mediaContext";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

type GridMediaProps = {
  media: MediaItem;
  activeTab: "chapters" | "overview";
  setActiveTab: (tab: "chapters" | "overview") => void;
};

const MediaHeader = ({ media, activeTab, setActiveTab }: GridMediaProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(true);
  const [animate, setAnimate] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    const container = document.getElementById("heart-container");
    if (!container) return;

    // Decide el tipo de corazón según liked
    const heartChar = liked ? "💔" : "❤️";

    for (let i = 0; i < 15; i++) { // más corazones para tormenta
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerText = heartChar;

      // Tamaño aleatorio
      const size = Math.random() * 20 + 24; // 24px a 44px
      heart.style.fontSize = `${size}px`;

      // Posición inicial dispersa
      const offsetX = Math.random() * 200 - 100; // -100 a +100px
      const offsetY = Math.random() * 60 - 30;   // -30 a +30px
      heart.style.left = `${e.currentTarget.offsetLeft + offsetX}px`;
      heart.style.top = `${e.currentTarget.offsetTop + offsetY}px`;

      // Rotación aleatoria
      const rotate = Math.random() * 120 - 60; // -60 a +60 grados
      heart.style.transform = `rotate(${rotate}deg)`;

      // Color: rojo o gris según corazón
      heart.style.color = liked ? "#ff4d4f" : "#999";

      container.appendChild(heart);

      // Eliminar después de la animación
      setTimeout(() => heart.remove(), 1800);
    }
  };


  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "Mark as Completed", icon: "✅" },
    { label: "Abandonado", icon: "❌" },
    { label: "Remove from List", icon: "🗑️" },
  ];

  return (
    <div data-v-5776f768 className="header-wrap">
      {media?.bannerImage && (
        <div data-v-5776f768 className="banner" style={{ backgroundImage: `url('${media.bannerImage}')` }}>
          <div data-v-5776f768 className="shadow"></div>
        </div>
      )}

      <div data-v-5776f768 className="header">
        <div data-v-5776f768 className="container" style={{ minHeight: "0px" }}>
          <div data-v-5776f768 className={`cover-wrap ${media?.bannerImage ? "overlap-banner" : ""}`}>
            <div data-v-5776f768 className="cover-wrap-inner" style={{ position: "absolute" }}>
              <img data-v-5776f768 src={media.coverImage.large} alt="" className="cover" />
              <div data-v-5776f768 className="actions">
                <div data-v-5776f768 className="list" ref={dropdownRef} style={{ display: "inline-flex", position: "relative" }}>
                  {/* Botón Add to List */}
                  <div
                    data-v-5776f768
                    className="add"
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Add to List
                  </div>

                  {/* Botón de flecha */}
                  <div
                    data-v-5776f768
                    className="dropdown el-dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                  >
                    <span
                      data-v-5776f768
                      className="el-dropdown-link el-dropdown-selfdefine"
                      aria-haspopup="list"
                      aria-controls="dropdown-menu-2690"
                      role="button"
                    >
                      <i
                        data-v-5776f768
                        className="el-icon-arrow-down el-icon--right"
                      ></i>
                    </span>
                  </div>

                  {/* Dropdown alineado al botón Add to List */}
                  {dropdownOpen && (
                    <ul
                      className="custom-dropdown"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0, // alineado al inicio del botón Add to List
                        marginTop: "2px",
                        background: "rgba(30, 30, 40, 0.95)",
                        borderRadius: "6px",
                        padding: "4px 0",
                        minWidth: "220px", // Aumenta este valor según prefieras
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        zIndex: 1000,
                        listStyle: "none",
                        whiteSpace: "nowrap", // evita que se corten los textos
                      }}
                    >
                      {options.map((option, idx) => (
                        <li
                          key={idx}
                          style={{
                            padding: "10px 16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          onClick={() => {
                            console.log(option.label);
                            setDropdownOpen(false);
                          }}
                        >
                          <span>{option.icon}</span>
                          <span>{option.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>


                <div data-v-0228dea0 data-v-5776f768 className="favourite">
                  <div
                    onClick={(e) => handleClick(e)}
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      transform: animate ? "scale(1.5)" : "scale(1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={liked ? faHeart : faHeartBroken}
                      size="1x"
                      color="white"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div data-v-5776f768 className="content">
            <h1 data-v-5776f768>{media.title.english || media.title.romaji}</h1>

            <p
              data-v-5776f768
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  media.description ||
                  `Este ${media?.format || "media"} no cuenta con una descripción, sé el primero en agregar una!`,
              }}
            />

            <div data-v-5776f768 className="nav pb-[20px]">
              <a
                href="#"
                className={`link ${activeTab === "chapters" ? "font-bold" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("chapters");
                }}
              >
                Chapters
              </a>
              <a
                href="#"
                className={`link ${activeTab === "overview" ? "font-bold" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("overview");
                }}
              >
                Overview
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor para corazones flotantes */}
      <div
        id="heart-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 9999,
        }}
      ></div>

    </div>

  );
};

export default MediaHeader;
