"use client";
import React from "react";

const SocialSection: React.FC = () => {
  return (
    <div className="social-section">
      <h2>Social</h2>
      <p>Here you can display social links, comments, or fan interactions.</p>
      <div className="social-links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Reddit
        </a>
      </div>

      <style jsx>{`
        .social-section {
          padding: 1rem;
          background-color: rgb(245, 245, 245);
          border-radius: 0.3rem;
        }
        .social-section h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-links a {
          text-decoration: none;
          color: rgb(61, 180, 242);
          font-weight: 500;
        }
        .social-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SocialSection;
