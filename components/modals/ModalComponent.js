import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";

const ModalComponent = ({
  show,
  onHide,
  title,
  onCancel,
  onSave,
  modalHeader,
  modalBody,
  modalFooter,
  cancelButtonLabel = "Cancel",
  saveButtonLabel = "Save",
  className,
  children,
  disableCancel = false,
  disableSave = false,
  hideFooter = false,
  centered,
  step,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className={className}
      centered={centered}
      backdrop="static"
    >
      {title && (
        <Modal.Header closeButton className={modalHeader}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className={modalBody}>{children}</Modal.Body>
      {!hideFooter && (onSave || onCancel) && (
        <Modal.Footer className={modalFooter}>
          {onCancel && step !== 1 && step !== 3 && (
            <CustomButton
              variant="outline-secondary"
              onClick={onCancel || onHide}
              disabled={disableCancel}
            >
              {cancelButtonLabel}
            </CustomButton>
          )}
          {onSave && (
            <CustomButton
              variant="primary"
              className={`${step === 3 ? "center-btn" : ""}`}
              onClick={onSave}
              disabled={disableSave}
            >
              {saveButtonLabel}
            </CustomButton>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalComponent;
