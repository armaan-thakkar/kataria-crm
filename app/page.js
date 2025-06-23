"use client";
import { PAGE_ROUTES } from "@/utils/constants/routes.constant";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(PAGE_ROUTES.CUSTOMER_DATA);
}
