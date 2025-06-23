import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";

const CustomModal = ({
  show,
  closeAction,
  size,
  centered,
  className,
  dialogClassName,
  hideCloseButton,
  modalHeader,
  title,
  modalBody,
  isFooter,
  modalFooter,
  cancelBtnText,
  cancelAction,
  isCancelDisabled,
  submitBtnText,
  submitAction,
  loading,
  isSubmitDisabled,
  children,
  isDisabledHeader = false,
}) => {
  return (
    <Modal
      show={show}
      onHide={closeAction}
      backdrop="static"
      size={size}
      centered={centered}
      className={className}
      dialogClassName={dialogClassName}
    >
      {isDisabledHeader ? null : (
        <Modal.Header closeButton={!hideCloseButton} className={modalHeader}>
          {" "}
          <Modal.Title className="h4">{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className={modalBody}>{children}</Modal.Body>
      {isFooter ? (
        <Modal.Footer className={modalFooter}>
          {cancelBtnText && (
            <CustomButton
              type="button"
              variant="outline-secondary"
              onClick={cancelAction}
              disabled={isCancelDisabled}
            >
              {cancelBtnText}
            </CustomButton>
          )}
          {submitBtnText && (
            <CustomButton
              type="button"
              variant="primary"
              onClick={submitAction}
              loading={loading}
              disabled={isSubmitDisabled}
            >
              {submitBtnText}
            </CustomButton>
          )}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default CustomModal;
