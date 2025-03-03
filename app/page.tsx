"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CarsSection from "./components/CarsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("light"); // Default to light

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const preferredTheme = savedTheme || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

      setTheme(preferredTheme);
    }
  }, []); // Runs only once after mount

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <Navbar darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />

      <Button
        onClick={toggleTheme}
        className="fixed right-4 top-4 w-10 h-10 hover:cursor-pointer flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full z-50"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500 transition-transform duration-300" />
        ) : (
          <Moon className="h-[1.5rem] w-[1.5rem] text-gray-800 transition-transform duration-300" />
        )}
      </Button>

      <main>
        <HeroSection />
        <CarsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}


export default App;