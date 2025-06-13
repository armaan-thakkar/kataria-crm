import { usePathname } from "next/navigation";
import Link from "next/link";
import { DashboardMenu } from "@/utils/constants/routes.constant";

export default function NavbarVertical({ isOpen }) {
  const pathname = usePathname();

  const getLink = (link) => {
    return `${isOpen ? "open" : "close"} ${pathname.startsWith(link) ? "active" : ""}`;
  };

  const getIcon = (link) => {
    return `nav-icons ${pathname.startsWith(link) ? "active-icon" : ""}`;
  };

  return (
    <div className={`sideNav ${isOpen ? "open" : "close"}`}>
      <ul>
        {DashboardMenu.map((item, index) => (
          <li key={index}>
            <Link href={item.route} className={getLink(item.route)}>
              <span className={getIcon(item.route)}>{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
