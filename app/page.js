import { redirect } from "next/navigation";
import { PAGE_ROUTES } from "@/utils/constants/routes.constant";

export default function Home() {
  return redirect(PAGE_ROUTES.CUSTOMER_DATA);
}
