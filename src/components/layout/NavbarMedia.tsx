'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import logo from "@/assets/logo.png";
import { MediaItem } from "@/context/mediaContext";

type GridMediaProps = {
  media: MediaItem;
};

const NavbarMedia = (media: GridMediaProps) => {
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
    <div data-v-62eacfff="" id="nav" className={media?.bannerImage ? "nav nav-unscoped transparent" : "nav nav-unscoped"} style={{ top: "0px" }}>
      <div data-v-17620a08="" data-v-62eacfff="" className="quick-search">
        <div data-v-17620a08="" className="input">
          <svg data-v-17620a08="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon left svg-inline--fa fa-search fa-w-16 fa-sm">
            <path data-v-17620a08="" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" className=""></path>
          </svg>
          <input data-v-17620a08="" type="text" placeholder="Search AniList"/>
            <svg data-v-17620a08="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className="icon right svg-inline--fa fa-times fa-w-11 fa-sm">
              <path data-v-17620a08="" fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" className=""></path>
            </svg>
            <div data-v-17620a08="" className="hint">Hint: Hit Ctrl-S to quickly toggle Quick Search</div>
        </div>
        <div data-v-17620a08="" className="results"></div>
      </div>
      <div data-v-62eacfff="" className="wrap guest">
        <a data-v-62eacfff="" href="/" className="logo router-link-active"><img data-v-62eacfff="" src="/img/icons/icon.svg"/></a>
        <div data-v-62eacfff="" className="links">
          <span data-v-62eacfff="" className="browse-wrap">
            <a data-v-62eacfff="" href="/search/anime" className="link">search</a>
            <div data-v-38edf8f8="" data-v-62eacfff="" className="dropdown">
              <div data-v-38edf8f8="" className="primary-links">
                <div data-v-38edf8f8="" className="primary-link">
                  <a data-v-38edf8f8="" href="/search/anime" className="">
                    <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon svg-inline--fa fa-play fa-w-14">
                      <path data-v-38edf8f8="" fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" className=""></path>
                    </svg>
                  </a>
                  <section data-v-38edf8f8="">
                    <a data-v-38edf8f8="" href="/search/anime" className="primary-link-text">
                      Anime
                    </a>
                    <div data-v-38edf8f8="" className="secondary-links"><a data-v-38edf8f8="" href="/search/anime/top-100" className="">Top 100</a> <a data-v-38edf8f8="" href="/search/anime/trending" className="">Trending</a> <a data-v-38edf8f8="" href="/search/anime/top-movies" className="">Top Movies</a></div>
                  </section>
                </div>
                <div data-v-38edf8f8="" className="primary-link">
                  <a data-v-38edf8f8="" href="/search/manga" className="">
                    <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon svg-inline--fa fa-book-open fa-w-18">
                      <path data-v-38edf8f8="" fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z" className=""></path>
                    </svg>
                  </a>
                  <section data-v-38edf8f8="">
                    <a data-v-38edf8f8="" href="/search/manga" className="primary-link-text">
                      Manga
                    </a>
                    <div data-v-38edf8f8="" className="secondary-links"><a data-v-38edf8f8="" href="/search/manga/top-100" className="">Top 100</a> <a data-v-38edf8f8="" href="/search/manga/trending" className="">Trending</a> <a data-v-38edf8f8="" href="/search/manga/top-manhwa" className="">Top Manhwa</a></div>
                  </section>
                </div>
              </div>
              <div data-v-38edf8f8="" className="footer">
                <a data-v-38edf8f8="" href="/search/staff" className="">
                  <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-tie" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon svg-inline--fa fa-user-tie fa-w-14">
                    <path data-v-38edf8f8="" fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" className=""></path>
                  </svg>
                  Staff
                </a>
                <a data-v-38edf8f8="" href="/search/characters" className="">
                  <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-astronaut" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon svg-inline--fa fa-user-astronaut fa-w-14">
                    <path data-v-38edf8f8="" fill="currentColor" d="M64 224h13.5c24.7 56.5 80.9 96 146.5 96s121.8-39.5 146.5-96H384c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-13.5C345.8 39.5 289.6 0 224 0S102.2 39.5 77.5 96H64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm40-88c0-22.1 21.5-40 48-40h144c26.5 0 48 17.9 48 40v24c0 53-43 96-96 96h-48c-53 0-96-43-96-96v-24zm72 72l12-36 36-12-36-12-12-36-12 36-36 12 36 12 12 36zm151.6 113.4C297.7 340.7 262.2 352 224 352s-73.7-11.3-103.6-30.6C52.9 328.5 0 385 0 454.4v9.6c0 26.5 21.5 48 48 48h80v-64c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64h80c26.5 0 48-21.5 48-48v-9.6c0-69.4-52.9-125.9-120.4-133zM272 448c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-96 0c-8.8 0-16 7.2-16 16v48h32v-48c0-8.8-7.2-16-16-16z" className=""></path>
                  </svg>
                  Characters
                </a>
                <a data-v-38edf8f8="" href="/reviews" className="">
                  <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon svg-inline--fa fa-star fa-w-18">
                    <path data-v-38edf8f8="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path>
                  </svg>
                  Reviews
                </a>
                <a data-v-38edf8f8="" href="/recommendations" className="">
                  <svg data-v-38edf8f8="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon svg-inline--fa fa-thumbs-up fa-w-16">
                    <path data-v-38edf8f8="" fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z" className=""></path>
                  </svg>
                  Recommendations
                </a>
              </div>
            </div>
          </span>
          <a data-v-62eacfff="" href="/social" className="link">social</a> <a data-v-62eacfff="" href="/forum/overview" className="link">forum</a> <a data-v-62eacfff="" href="/login" className="link login">Login</a> <a data-v-62eacfff="" href="/signup" className="link signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default NavbarMedia;
