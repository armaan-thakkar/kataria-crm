import { FiUsers } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TiExportOutline } from "react-icons/ti";
import { CgEditMask } from "react-icons/cg";
import { GiMeditation } from "react-icons/gi";

export const PAGE_PARAMS = {
  CUSTOMER_ID: ":id",
  USER_ID: ":id",
};
export const PAGE_ROUTES = {
  DASHBOARD: "/dashboard",
  CUSTOMER_DATA: "/customer-data",
  CUSTOMER_DATA_DETAILS: `/customer-data/detail-page/${PAGE_PARAMS.CUSTOMER_ID}`,
  IMPORT_HISTORY: "/import-history",
  EXPORT_HISTORY: "/export-history",
  LOGIN: "/login",
  USERS: "/users",
  DATA_CHECKER: "/data-checker",
  EDIT_USERS: `/users/update/${PAGE_PARAMS.USER_ID}`,
  ADD_USERS: "/users/add",
};

export const DashboardMenu = [
  {
    name: "Customer Detail",
    route: PAGE_ROUTES.CUSTOMER_DATA,
    icon: <CgEditMask />,
    subMenu: [
      {
        name: "Customer Detail",
        route: "/customer-data/detail-page",
        icon: <TiExportOutline />,
      },
      {
        name: "Customer History",
        route: "/customer-data/history",
        icon: <TiExportOutline />,
      },
    ],
  },
  {
    name: "Search Customer",
    route: PAGE_ROUTES.IMPORT_HISTORY,
    icon: <GiMeditation />,
  },
  {
    name: "Export",
    route: PAGE_ROUTES.EXPORT_HISTORY,
    icon: <TiExportOutline />,
    subMenu: [
      {
        name: "Export Detail",
        route: "/export-history/1",
        icon: <TiExportOutline />,
      },
      {
        name: "Export History",
        route: "/export-history/age",
      },
    ],
  },
  {
    name: "Call Log",
    route: PAGE_ROUTES.USERS,
    icon: <FiUsers />,
  },
  {
    name: "Add Complaint",
    route: PAGE_ROUTES.DATA_CHECKER,
    icon: <AiOutlineFileSearch />,
  },
];

export const dummyCardData = {
  vehicle_info: {
    "Model and Variant": "Maruti Suzuki Baleno Zeta",
    "Vin Number": "MA3EWB12S00234567",
    "Registration Number": "MH12AB1234",
    "Engine Number": "K12N1234567",
    "Chassis Number": "MBHDE123456789012",
    Mileage: "12,345 km",
    "Sale Date": "2023-08-15",
    Location: "Pune",
    Dealer: "Wonder Cars Pvt Ltd",
    "Work Station Name": "Maruti Service Center",
    "Work Station Code": "MSC789",
  },

  next_due: {
    "Next Service Date": "2025-07-01",
    "Due in (days)": "12",
    "Service Type": "Free",
  },

  last_status: {
    "Last Serviced On": "2025-05-30",
    "Odometer Reading": "12,000 km",
    "Service Feedback": "Excellent",
  },

  service_history: {
    "Total Services": "3",
    "Last Workshop": "Wonder Cars, Pune",
    "Invoice Amount": "₹4,500",
  },

  insurance: {
    "Policy Number": "INS2025XYZ456",
    Provider: "ICICI Lombard",
    "Valid Till": "2026-08-15",
  },

  owner_details: {
    "Owner Name": "Rahul Sharma",
    "Mobile Number": "+91 9876543210",
    Address: "Bhandarkar Road, Pune",
    "Email ID": "rahul.sharma@email.com",
  },
};

