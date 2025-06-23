import React, { useRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline, IoDocumentText } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const UploadComponent = (props) => {
  const {
    id = "",
    name = "",
    handleChange,
    logoFontSize = "h5",
    iconCover = 40,
    title = "Drag & Drop or Browse to Upload",
    fileContainer = "file-upload-container",
    fileZise = 35,
    selectedFile,
    setSelectedFile,
  } = props;

  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const maxFileSize = (fileZise ? fileZise : 10) * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [], // for .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // for xlsx
    },
    maxSize: maxFileSize,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          setErrorMessage(`File is too large. Maximum size allowed is 10 MB.`);
        } else if (error.code === "file-invalid-type") {
          setErrorMessage("Invalid File Type");
        } else {
          setErrorMessage("Failed to Upload");
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file.name);
        handleChange?.({ target: { files: [file] } });
        setErrorMessage("");
      }
    },
  });

  const handleIconClick = (e) => {
    if (selectedFile) {
      e.stopPropagation();
      return;
    }
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  }, [fileInputRef]);

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="upload-container">
      <div
        {...getRootProps()}
        className="file-wrapper"
        onClick={(e) => handleIconClick(e)}
      >
        <input
          {...getInputProps()}
          id={id}
          ref={fileInputRef}
          key={selectedFile ? selectedFile.name : "file-input"}
        />
        <div className={`file-input-container ${fileContainer}`}>
          {selectedFile ? (
            <IoDocumentText size={iconCover} color="#28a745" />
          ) : (
            <IoCloudUploadOutline
              size={iconCover}
              color={isDragActive ? "#0066cc" : "#4b89ba"}
              onClick={(e) => handleIconClick(e)}
            />
          )}
          {selectedFile ? (
            <>
              <label className={logoFontSize} htmlFor={name}>
                {selectedFile?.name}
              </label>
              <button
                type="button"
                onClick={(e) => handleRemoveFile(e)}
                className="remove-file-btn"
              >
                <MdCancel />
              </button>
            </>
          ) : (
            <label className={logoFontSize} htmlFor={name}>
              {title}
            </label>
          )}
        </div>
      </div>
      <div className="upload-files">
        <span className="upload-files-title">Supported Files :</span>
        <span>xls , xlsx </span>{" "}
      </div>
      <div>
        <div className={`err-msg ${errorMessage ? "visible" : "hidden"}`}>
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
