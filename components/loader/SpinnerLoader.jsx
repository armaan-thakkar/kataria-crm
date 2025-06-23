import { Spinner } from "react-bootstrap";

const SpinnerLoader = (props) => {
  return (
    <div className={`d-flex align-items-center justify-content-center gap-3 ${props.height || "h-95vh"}`}>
      <Spinner animation="border" variant={props.variant} />
    </div>
  );
};

export default SpinnerLoader;
