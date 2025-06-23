import React from "react";
import ModalComponent from "./ModalComponent";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CK, LS } from "@/utils/constants/default.constant";
import { PAGE_ROUTES } from "@/utils/constants/routes.constant";
import { clearDetails } from "@/redux/authentication/action.authentication";
import Cookies from "js-cookie";

const LogoutModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearDetails());
    localStorage.removeItem(LS.ACCESS_TOKEN);
    Cookies.remove(CK.ACCESS_TOKEN);
    router.push(PAGE_ROUTES.LOGIN);
  };
  return (
    <ModalComponent
      show={show}
      onHide={onHide}
      title="Logout"
      onCancel={onHide}
      onSave={handleLogout}
      cancelButtonLabel="Cancel"
      saveButtonLabel="Logout"
      modalHeader="logout-header"
      modalBody="logout-body"
      modalFooter="logout-footer"
      centered
    >
      <p>Are you sure you want to logout?</p>
    </ModalComponent>
  );
};

export default LogoutModal;
