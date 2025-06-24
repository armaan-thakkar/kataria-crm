"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { DashboardMenu } from "@/utils/constants/routes.constant";

export default function NavbarVertical({ isOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState({});

  const toggleSubMenu = (name) => {
    setOpenSubMenu((prev) => {
      const newState = Object.fromEntries(
        Object.keys(prev).map((key) => [key, false])
      );
      return { ...newState, [name]: !prev[name] };
    });
  };

  const isSubRouteActive = (subMenu) =>
    subMenu?.some((sub) => pathname.startsWith(sub.route));

  const getLink = (link) =>
    `${isOpen ? "open" : "close"} ${pathname.startsWith(link) ? "active" : ""}`;

  const getIcon = (link) =>
    `nav-icons ${pathname.startsWith(link) ? "active-icon" : ""}`;

  return (
    <div className={`sideNav ${isOpen ? "open" : "close"}`}>
      <ul>
        {DashboardMenu.map((item, idx) => {
          const { name, route, icon, subMenu = [] } = item;
          const hasSubmenu = subMenu.length > 0;
          const isSubmenuOpen = openSubMenu[name];
          const isActive =
            pathname.startsWith(route) || isSubRouteActive(subMenu);

          return (
            <li key={idx} className="menu-item">
              {/* Top-level with submenu and sidebar open */}
              {hasSubmenu && isOpen ? (
                <a
                  className={`icon-with-tooltip ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (subMenu.length > 0) {
                      router.push(subMenu[0].route);
                      toggleSubMenu(name);
                    }
                  }}
                  role="button"
                >
                  <span className={getIcon(route)}>{icon}</span>
                  <span className="nav-text">{name}</span>
                </a>
              ) : (
                <Link
                  href={route}
                  className={`icon-with-tooltip ${getLink(route)}`}
                  onClick={() => setOpenSubMenu({})}
                >
                  <div>
                    <span className={getIcon(route)}>{icon}</span>

                    {hasSubmenu && !isOpen && (
                      <div className="submenu-tooltip">
                        {subMenu.map((sub, subIdx) => (
                          <Link
                            href={sub.route}
                            key={subIdx}
                            className={`submenu-link ${pathname.startsWith(sub.route) ? "active-submenu" : ""}`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {isOpen && <span className="nav-text">{name}</span>}
                </Link>
              )}

              {/* Render submenu if open */}
              {hasSubmenu && isOpen && (
                <div
                  className={`submenu-inline ${isSubmenuOpen ? "show" : ""}`}
                >
                  {subMenu.map((sub, subIdx) => (
                    <Link
                      href={sub.route}
                      key={subIdx}
                      className={`submenu-link-inline ${
                        pathname.startsWith(sub.route) ? "active-submenu" : ""
                      }`}
                    >
                      <span className={`${getIcon(sub.route)}`}>{sub.icon}</span>
                      <span className="ms-2">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
