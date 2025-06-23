import React, { useEffect, useState } from "react";
import { API_ERROR_CODES, FORMIK } from "@/utils/constants/default.constant";
import { FormInputField } from "../form-group/custom-input/FormInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  LOADING_KEYS,
  resetUserPassword,
  setShowResetPasswordModal,
} from "@/redux/user/action.user";
import { toastMessage } from "@/utils/helpers/common.helper";
import { userState } from "@/redux/user/reducer.user";
import CustomModal from "./CustomModal";

const ResetPasswordModal = ({ show, onHide, userId }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector(userState);

  function validatePassword() {
    if (!password) {
      setError(FORMIK.REQUIRED);
    } else if (password?.length < FORMIK.MIN_8.VALUE) {
      setError(FORMIK.MIN_8.MESSAGE);
    } else if (password?.length > FORMIK.MAX_32.VALUE) {
      setError(FORMIK.MAX_32.MESSAGE);
    } else if (!FORMIK.PASSWORD_UPPER_CASE.VALUE.test(password)) {
      setError(FORMIK.PASSWORD_UPPER_CASE.MESSAGE);
    } else if (!FORMIK.PASSWORD_NUMBER.VALUE.test(password)) {
      setError(FORMIK.PASSWORD_NUMBER.MESSAGE);
    } else if (!FORMIK.PASSWORD_SPECIAL_CHARACTER.VALUE.test(password)) {
      setError(FORMIK.PASSWORD_SPECIAL_CHARACTER.MESSAGE);
    } else if (!FORMIK.INVALID_PASSWORD.VALUE.test(password)) {
      setError(FORMIK.INVALID_PASSWORD.MESSAGE);
    } else {
      setError("");
    }
  }

  const handleSubmit = () => {
    if (password && !error && touched && userId) {
      dispatch(
        resetUserPassword({ id: userId, password }, (res) => {
          if (res?.code > 0) {
            dispatch(setShowResetPasswordModal({ show: false, data: null }));
            toastMessage(res?.message, "success");
          } else if (res?.code === API_ERROR_CODES.FIELD_ERROR) {
            setError(res?.error?.[0]?.message || "");
          } else {
            toastMessage(res?.message, "error");
          }
        }),
      );
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    if (!show) {
      setError("");
      setPassword("");
      setTouched(false);
    }
  }, [show]);

  return (
    <CustomModal
      show={show}
      cancelAction={onHide}
      closeAction={onHide}
      isFooter={true}
      centered={true}
      title="Password Reset"
      dialogClassName="reset-modal"
      submitAction={handleSubmit}
      size="sm"
      submitBtnText={"Update"}
      cancelBtnText={"Cancel"}
      loading={loading[LOADING_KEYS.RESET_USER_PASSWORD_LOADING]}
      isSubmitDisabled={loading[LOADING_KEYS.RESET_USER_PASSWORD_LOADING]}
      isCancelDisabled={loading[LOADING_KEYS.RESET_USER_PASSWORD_LOADING]}
    >
      <div className="mb-3">
        <FormInputField
          label={"Reset Password"}
          type="password"
          value={password}
          placeholder="Enter new password"
          handleChange={(e) => {
            setTouched(true);
            setPassword(e?.target?.value?.trimStart?.() || "");
          }}
          errors={error}
          touched={touched}
        />
      </div>
    </CustomModal>
  );
};

export default ResetPasswordModal;
