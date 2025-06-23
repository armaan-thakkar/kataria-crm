const ExportStepper = ({ currentStep }) => {
  const steps = ["Select Template", "Enter Otp"];

  return (
    <div className="stepper-container">
      <div className="export-steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div
              className={`circle ${currentStep >= index + 1 ? "completed" : ""} ${currentStep === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </div>
            <div className="step-content">{step}</div>
            {index < steps.length - 1 && (
              <div
                className={`line ${currentStep > index + 1 ? "completed" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportStepper;
