"use client";
import { useState } from "react";
 import '@/assets/scss/main.scss';
import NavbarVertical from "@/layout/navbars/NavbarVertical";
import NavbarTop from "@/layout/navbars/NavbarTop";
 
 export default function Home({children}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  const handleSidebarToggle = (status) => {
    setIsSideNavOpen(status);
  };
  
  return(
      <div className="dashboard-wrapper">
      <NavbarVertical isOpen={isSideNavOpen} />
      <div>
        <NavbarTop
          onSidebarToggle={handleSidebarToggle}
          isSideNavOpen={isSideNavOpen}
        />
        <main
          id="main-content"
          className={isSideNavOpen ? "shifted" : "shifted-closed"}
        >
          {children}
          {/* <div className="px-6 mt-5 pt-3 container-fluid">{children}</div> */}
        </main>
      </div>
    </div>
  );
}
