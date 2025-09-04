'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Cerrar al dar click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      className="relative top-0 left-0 w-full h-[75px] z-[9999] flex justify-center sm:justify-around items-center 
                 bg-graynav shadow-lg text-txnav"
    >
      <div>
        <Link href={`/`}>
          <Image alt="logo" width={56} height={56} src={logo} />
        </Link>
      </div>

      <div className="flex justify-center sm:justify-between items-center sm:gap-24">
        <div className="flex items-center gap-4 relative">
          {/* Contenedor Login + Popover */}
          <div ref={popoverRef} className="relative">
            <span
              className="cursor-pointer hover:text-hovnav ml-4 sm:ml-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              Login
            </span>

            {/* Ventana debajo de Login */}
            {isOpen && (
              <div style={{ backgroundColor: "rgb(43 45 66 / var(--tw-bg-opacity))" }} className="absolute top-full left-0 mt-2 w-[300px] sm:w-[250px] bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 z-50 max-h-[80vh] overflow-y-auto">

                {/* Perfil */}
                <div className="flex flex-col items-center mb-4">
                  <img
                    src="https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg"
                    alt="Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="text-center font-bold text-xl mt-2">Dymedis</div>
                  <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded mt-1">
                    Member
                  </div>
                </div>

                <hr className="my-2" />

                {/* Opciones */}
                <a href="/user/me" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>👤</span> My Profile
                </a>
                <a href="/titles/follows" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>📚</span> My Follows
                </a>
                <a href="/my/lists" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>📂</span> My Lists
                </a>
                <a href="/my/groups" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>👥</span> My Groups
                </a>
                <a href="/my/reports" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>📑</span> My Reports
                </a>
                <a href="/announcements" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>ℹ️</span> Announcements
                </a>
                <a href="/announcements" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>❤️</span> Me gusta
                </a>

                <hr className="my-2" />

                {/* Configuración */}
                <div className="grid grid-cols-2 gap-2">
                  <a href="/settings" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                    <span>⚙️</span> Settings
                  </a>
                </div>

                <a href="/settings?tab=cat_blocks" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded">
                  <span>🚫 Content Filter</span>
                </a>

                <hr className="my-2" />

                {/* Cerrar sesión */}
                <button className="flex items-center gap-2 px-2 py-2 hover:bg-red-100 text-red-600 rounded">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            )}

          </div>

          {/* Botón con icono */}
          <button className="transition ease-in-out delay-150 hover:scale-105 duration-300 px-2 sm:px-4 py-2 bg-royal hover:bg-blue-50 hover:shadow-filterblue active:bg-blue-50 rounded-md text-white cursor-pointer flex items-center gap-1">
            <FiUpload size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
