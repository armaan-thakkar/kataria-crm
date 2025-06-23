import React from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const DateRangePicker = ({
  onChange,
  value,
  allowClear,
  disabledDate,
  placeholder = ["Start Date", "End Date"],
}) => {
  return (
    <div>
      <RangePicker
        onChange={onChange}
        value={value}
        className="w-100"
        allowClear={allowClear}
        disabledDate={disabledDate}
        format="DD-MM-YYYY"
        placeholder={placeholder}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      />
    </div>
  );
};

export default DateRangePicker;
