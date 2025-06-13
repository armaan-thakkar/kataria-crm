import { FiUsers } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import {
  // IoGridOutline,
  IoServerOutline,
} from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import { TiExportOutline } from "react-icons/ti";

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
    name: "Customer Data",
    route: PAGE_ROUTES.CUSTOMER_DATA,
    icon: <IoServerOutline />,
  },
  {
    name: "Import History",
    route: PAGE_ROUTES.IMPORT_HISTORY,
    icon: <MdDriveFolderUpload />,
  },
  {
    name: "Export History",
    route: PAGE_ROUTES.EXPORT_HISTORY,
    icon: <TiExportOutline />,
  },
  {
    name: "User Management",
    route: PAGE_ROUTES.USERS,
    icon: <FiUsers />,
  },
  {
    name: "Bulk Search",
    route: PAGE_ROUTES.DATA_CHECKER,
    icon: <AiOutlineFileSearch />,
  },
];

 