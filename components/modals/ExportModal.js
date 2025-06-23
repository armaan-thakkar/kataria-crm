import { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import CustomSelect from "../form-group/custom-select/CustomSelect";
import OTPModal from "./OTPModal";
import CustomButton from "../CustomButton";
import ExportStepper from "../form-group/custom-stepper/ExportStepper";
import CustomModal from "./CustomModal";
import { convertDataToOptions } from "@/utils/helpers/common.helper";
import { useDispatch, useSelector } from "react-redux";
import { templateDetaisAction } from "@/redux/import/action.import";
import { generateOtp, getOtpRecipients } from "@/redux/user/action.user";
import { exportServiceData, LOADING_KEYS } from "@/redux/export/action.export";
import { CiEdit } from "react-icons/ci";
import { exportState } from "@/redux/export/reducer.export";
import { FILTER_PARAMS } from "@/app/(auth)/customer-data/page";
import useQueryParam from "@/hooks/useQueryParams";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/utils/constants/default.constant";

// Keys you can modify
const EXPORT_DATA_KEYS = {
  TEMPLATE_NAME: "templateName",
  COLUMN_NAMES: "columnNames",
  OTP_RECORD_ID: "otpRecordId",
  OTP: "otp",
};
// Inital Object state
const exportInitalState = {
  [EXPORT_DATA_KEYS.TEMPLATE_NAME]: null,
  [EXPORT_DATA_KEYS.COLUMN_NAMES]: [],
  [EXPORT_DATA_KEYS.OTP_RECORD_ID]: "",
  [EXPORT_DATA_KEYS.OTP]: ["", "", "", "", "", ""],
};

const ERROR_KEYS = {
  OTP_ERROR: "OTP_ERROR",
  EXPORT_DATA_VALIDATION: "EXPORT_DATA_VALIDATION",
};
const INITIAL_ERRORS_STATE = {
  [ERROR_KEYS.OTP_ERROR]: "",
  [ERROR_KEYS.EXPORT_DATA_VALIDATION]: [],
};

const ExportModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1);
  const [showPersonnel, setShowPersonnel] = useState(null);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [otpUsersOptions, setOtpUsersOptions] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    showExportConfirmModal: false,
    showOtpModal: false,
  });
  const [exportData, setExportData] = useState(exportInitalState);
  const [errors, setErrors] = useState(INITIAL_ERRORS_STATE);
  const { loading } = useSelector(exportState);
  const router = useQueryParam();
  const searchParams = useSearchParams();

  const resetState = () => {
    setShowPersonnel(null);
    setExportData(exportInitalState);
    setStep(1);
    setModal({
      showExportConfirmModal: false,
      showOtpModal: false,
    });
    setErrors(INITIAL_ERRORS_STATE);
  };

  const handleTemplateChange = (selectedOption) => {
    setExportData({
      ...exportData,
      [EXPORT_DATA_KEYS.TEMPLATE_NAME]: selectedOption,
      [EXPORT_DATA_KEYS.COLUMN_NAMES]: [],
    });
  };

  const handleSelectAllChange = (e) => {
    let cols = [];
    if (e.target.checked) {
      cols = selectedTemplate?.[0]?.columns?.map?.((e) => e?.columnName) || [];
    } else {
      cols = [];
      // cols =
      //   selectedTemplate?.[0]?.columns
      //     ?.filter?.((e) => e?.required)
      //     ?.map?.((e) => e?.columnName) || [];
    }
    setExportData({
      ...exportData,
      [EXPORT_DATA_KEYS.COLUMN_NAMES]: cols,
    });
  };
  const handleColumnSelection = (column) => {
    let cols = [];
    if (exportData?.[EXPORT_DATA_KEYS.COLUMN_NAMES]?.includes(column)) {
      cols = exportData?.[EXPORT_DATA_KEYS.COLUMN_NAMES]?.filter?.(
        (item) => item !== column,
      );
    } else {
      cols = [...exportData[EXPORT_DATA_KEYS.COLUMN_NAMES], column];
    }
    setExportData({
      ...exportData,
      [EXPORT_DATA_KEYS.COLUMN_NAMES]: cols,
    });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
    if (step === 2) {
      exportApiCall();
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const exportApiCall = () => {
    dispatch(
      exportServiceData(
        {
          templateName:
            exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME]?.value || "",
          otp: exportData?.[EXPORT_DATA_KEYS.OTP]?.join?.(""),
          columnNames: exportData?.[EXPORT_DATA_KEYS.COLUMN_NAMES] || [],
          otpRecordId: exportData?.[EXPORT_DATA_KEYS.OTP_RECORD_ID] || "",
          filters: {
            ...router.getAllQueryParams(),
            [FILTER_PARAMS.CURRENT_PAGE]:
              +searchParams.get(FILTER_PARAMS.CURRENT_PAGE) || 1,
            [FILTER_PARAMS.PAGE_SIZE]:
              +searchParams.get(FILTER_PARAMS.PAGE_SIZE) || PAGE_SIZE[0],
            [FILTER_PARAMS.MODEL]: searchParams
              .get(FILTER_PARAMS.MODEL)
              ?.split?.(","),
            [FILTER_PARAMS.VARIANT]: searchParams
              .get(FILTER_PARAMS.VARIANT)
              ?.split?.(","),
            [FILTER_PARAMS.SALES_CITY]: searchParams
              .get(FILTER_PARAMS.SALES_CITY)
              ?.split?.(","),
            [FILTER_PARAMS.SERVICE_CITY]: searchParams
              .get(FILTER_PARAMS.SERVICE_CITY)
              ?.split?.(","),
            [FILTER_PARAMS.CHANNEL]: searchParams
              .get(FILTER_PARAMS.CHANNEL)
              ?.split?.(","),
            [FILTER_PARAMS.LAST_SERVICE_LOCATION]: searchParams
              .get(FILTER_PARAMS.LAST_SERVICE_LOCATION)
              ?.split?.(","),
            [FILTER_PARAMS.SALE_DEALEARS]: searchParams
              .get(FILTER_PARAMS.SALE_DEALEARS)
              ?.split?.(","),
            [FILTER_PARAMS.LAST_SERVICE_TYPE]: searchParams
              .get(FILTER_PARAMS.LAST_SERVICE_TYPE)
              ?.split?.(","),
            [FILTER_PARAMS.INSURANCE_STATUS]: searchParams
              .get(FILTER_PARAMS.INSURANCE_STATUS)
              ?.split?.(","),
          },
        },
        (res) => {
          if (res?.file) {
            setModal({ showExportConfirmModal: false });
            handleClose();
            setShowPersonnel(null);
            setExportData({
              ...exportData,
              [EXPORT_DATA_KEYS.TEMPLATE_NAME]: null,
              [EXPORT_DATA_KEYS.OTP]: ["", "", "", "", "", ""],
            });
            setStep(1);
            setModal({
              showExportConfirmModal: false,
              showOtpModal: false,
            });
          } else if (res?.code < 0) {
            if (res?.code === -1) {
              setErrors({
                [ERROR_KEYS.EXPORT_DATA_VALIDATION]: res?.error || [],
              });
            } else {
              setErrors({
                [ERROR_KEYS.OTP_ERROR]: res?.message || "Otp Error",
              });
            }
          }
        },
      ),
    );
  };

  const handlePersonnelChange = (e) => {
    setShowPersonnel(e);
    if (!e) {
      setModal({ showOtpModal: false });
    }
  };

  function generateOtpApiCall(cb) {
    if (showPersonnel?.value) {
      dispatch(
        generateOtp(
          {
            userId: showPersonnel?.value,
            otpRecordId: exportData?.[EXPORT_DATA_KEYS.OTP_RECORD_ID],
          },
          (res, error) => {
            if (!res || error) {
              console.warn("Error Fetching Data : ", error);
              return;
            }
            if (res?.code > 0) {
              cb?.();
              setExportData({
                ...exportData,
                [EXPORT_DATA_KEYS.OTP]: ["", "", "", "", "", ""],
                [EXPORT_DATA_KEYS.OTP_RECORD_ID]: res?.data,
              });
            } else {
              setErrors({
                ...error,
                [ERROR_KEYS.OTP_ERROR]: res?.message,
              });
            }
            // In else handle error scenario example limit reach
          },
        ),
      );
      setModal({ showOtpModal: true });
    }
  }

  const isOtpComplete = exportData?.[EXPORT_DATA_KEYS.OTP]?.every?.(
    (digit) => digit !== "",
  );

  const selectedTemplate = useMemo(() => {
    const selected =
      templateOptions?.filter(
        (item) =>
          item?.templateName ===
          exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME]?.value,
      ) || [];
    const selectAllColumns =
      selected?.[0]?.columns?.map?.((e) => e?.columnName) || [];
    setExportData({
      ...exportData,
      [EXPORT_DATA_KEYS.COLUMN_NAMES]: selectAllColumns,
    });
    return selected;
  }, [templateOptions, exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME]]);

  useEffect(() => {
    if (show) {
      const fetchData = () => {
        dispatch(
          templateDetaisAction((error, res) => {
            if (error) {
              console.error("Error fetching data: ", error);
            } else if (res?.code > 0) {
              setTemplateOptions(res.data);
            }
          }),
        );
        dispatch(
          getOtpRecipients((res, err) => {
            if (err) {
              console.error("Error fetching data: ", err);
            } else if (res?.code > 0 && res?.data?.length) {
              setOtpUsersOptions(
                res?.data?.map?.((e) => ({ label: e?.name, value: e?.userId })),
              );
            }
          }),
        );
      };

      fetchData();
    } else {
      resetState();
    }
  }, [show]);

  useEffect(() => {
    setExportData({ ...exportData, [EXPORT_DATA_KEYS.OTP_RECORD_ID]: "" });
  }, [showPersonnel]);

  return (
    <>
      <CustomModal
        show={show}
        closeAction={() => {
          if (step === 1) {
            handleClose();
            resetState();
          }
          if (step === 2) {
            setModal({
              showCloseConfirmation: true,
              showOtpModal: modal.showOtpModal,
            });
          }
        }}
        isFooter={true}
        centered={true}
        title="Export Options"
        modalHeader="custom-modal-header"
        modalBody="custom-modal-body"
        modalFooter="custom-modal-footer"
        submitAction={handleNext}
        cancelAction={handlePrevious}
        cancelBtnText={step === 2 && !modal.showOtpModal ? "Previous" : ""}
        submitBtnText={step === 1 ? "Next" : "Export"}
        className="custom-modal"
        loading={loading?.[LOADING_KEYS.EXPORT_DATA_LOADING]}
        isSubmitDisabled={
          (step === 1 && !exportData[EXPORT_DATA_KEYS.COLUMN_NAMES]?.length) ||
          (step === 2 && !isOtpComplete) ||
          (step === 2 &&
            !isOtpComplete &&
            loading?.[LOADING_KEYS.EXPORT_DATA_LOADING])
        }
      >
        <ExportStepper currentStep={step} />

        {step === 1 && (
          <Form className="px-4 py-2">
            <div className="modal-react-select">
              <CustomSelect
                options={convertDataToOptions(
                  templateOptions,
                  "templateName",
                  "templateDisplayName",
                )}
                placeholder="Select Template"
                onChange={handleTemplateChange}
                value={exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME]}
              />
            </div>

            {exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME] && (
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  id="select-all"
                  checked={
                    exportData?.[EXPORT_DATA_KEYS.COLUMN_NAMES]?.length ===
                    templateOptions.find(
                      (col) =>
                        col.templateName ===
                        exportData?.[EXPORT_DATA_KEYS.TEMPLATE_NAME]?.value,
                    )?.columns?.length
                  }
                  onChange={handleSelectAllChange}
                  className="me-2 cursor-pointer"
                />
                <label htmlFor="select-all" className="mb-0">
                  <div>Select All</div>
                </label>
              </div>
            )}

            <div className="checkbox-group export-modal-check">
              <div className="d-flex flex-wrap">
                {selectedTemplate?.[0]?.columns?.map?.((column) => (
                  <div key={column.columnName} className="col-container">
                    <Form.Check
                      type="checkbox"
                      id={column.columnName}
                      checked={
                        exportData?.[EXPORT_DATA_KEYS.COLUMN_NAMES]?.includes?.(
                          column?.columnName,
                        )
                        // || column?.required
                      }
                      onChange={() => handleColumnSelection(column.columnName)}
                      label={column.columnDisplayName}
                      // disabled={column?.required}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}

        {step === 2 && (
          <div className="export-otp-wrapper">
            <div className="d-flex gap-2">
              <div className="custom-filter-select">
                <CustomSelect
                  className="row-select"
                  placeholder="Select Users"
                  options={otpUsersOptions}
                  value={showPersonnel}
                  onChange={handlePersonnelChange}
                  disabled={modal.showOtpModal}
                />
              </div>
              <div>
                <CustomButton
                  variant="primary"
                  disabled={!showPersonnel?.value || modal.showOtpModal}
                  onClick={() => {
                    generateOtpApiCall();
                  }}
                >
                  Generate OTP
                </CustomButton>
              </div>
              {modal.showOtpModal ? (
                <div
                  className="align-content-center text-primary "
                  role="button"
                  onClick={() => {
                    setExportData({
                      ...exportData,
                      [EXPORT_DATA_KEYS.OTP]: ["", "", "", "", "", ""],
                    });
                    setErrors(INITIAL_ERRORS_STATE);
                    setModal({ showOtpModal: false });
                  }}
                >
                  Change User <CiEdit />
                </div>
              ) : null}
            </div>
            {modal.showOtpModal && (
              <OTPModal
                show={modal.showOtpModal}
                onHide={() => {
                  setModal({ showOtpModal: false });
                }}
                otp={exportData?.[EXPORT_DATA_KEYS.OTP]}
                setOtp={(val) => {
                  setExportData({
                    ...exportData,
                    [EXPORT_DATA_KEYS.OTP]: val,
                  });
                }}
                resendLink={
                  errors[INITIAL_ERRORS_STATE[ERROR_KEYS.OTP_ERROR]]
                    ? false
                    : (cb) => {
                        setExportData({
                          ...exportData,
                          [EXPORT_DATA_KEYS.OTP]: ["", "", "", "", "", ""],
                        });
                        generateOtpApiCall(cb);
                      }
                }
              />
            )}

            {/* Errors */}
            <div className="text-danger show-errors">
              <ul className="list-group">
                {errors?.[ERROR_KEYS.OTP_ERROR] ? (
                  <li className="list-group-item list-group-item-danger">
                    {errors?.[ERROR_KEYS.OTP_ERROR] || "OTP Error"}
                  </li>
                ) : null}

                {errors?.[ERROR_KEYS.EXPORT_DATA_VALIDATION]?.length
                  ? errors?.[ERROR_KEYS.EXPORT_DATA_VALIDATION]?.map?.((e) => {
                      return (
                        <li
                          className="list-group-item list-group-item-danger"
                          key={e?.field}
                        >
                          {e?.message}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        )}
        {modal.showCloseConfirmation && (
          <div className="confirm-container">
            <h5 className="confirm-modal-ttile">
              Are you sure you want to close?
            </h5>
            <div className="confirm-modal-div">
              <CustomButton
                variant="outline-secondary"
                onClick={() => {
                  setModal({
                    showCloseConfirmation: false,
                    showOtpModal: modal.showOtpModal,
                  });
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                onClick={() => {
                  handleClose();
                  resetState();
                }}
              >
                Yes
              </CustomButton>
            </div>
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default ExportModal;
