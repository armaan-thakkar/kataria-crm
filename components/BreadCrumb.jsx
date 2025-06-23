import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const path = usePathname();

  const pathSegments = path.split("/");

  const middleSegment = pathSegments[1];

  const formattedMiddleSegment = middleSegment
    ? middleSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  return <strong>{formattedMiddleSegment}</strong>;
};

export default BreadCrumb;
