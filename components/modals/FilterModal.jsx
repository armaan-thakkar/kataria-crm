import CustomInput from "@/components/form-group/custom-input/CustomInput";
import CustomModal from "@/components/modals/CustomModal";
import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import CustomButton from "@/components/CustomButton";
import { FILTER_PARAMS } from "@/app/(auth)/customer-data/page";
import DateRangePicker from "../form-group/custom-datePicker/CustomDatePicker";
import dayjs from "dayjs";
import MultiSelect from "../CustomMultiSelect";
import { MASTERS_KEY } from "@/utils/constants/default.constant";
import { INSURANCE_STATUS_OPTIONS } from "@/utils/constants/options.constant";
import { PAGE_ROUTES } from "@/utils/constants/routes.constant";
import useQueryParam from "@/hooks/useQueryParams";
import { handleMultipleOptionsApiValues } from "@/utils/helpers/common.helper";

const FilterModal = ({
  show,
  handleClose,
  filterParams,
  handleFilterChange,
  handleDateChange,
  masters,
  // setFilterParams,
}) => {
  const router = useQueryParam();
  // const searchParams = useSearchParams();

  return (
    <CustomModal
      show={show}
      className="filter-modal"
      title={"Advance Filters"}
      closeAction={handleClose}
    >
      <section className="filter-body">
        <Card className="px-2 py-2">
          <Row className="mb-2">
            <Col md={2}>
              <label htmlFor="" className="form-label">
                Created On
              </label>
              <DateRangePicker
                placeholderText="Select Dates"
                onChange={(value) =>
                  handleDateChange(
                    value,
                    FILTER_PARAMS.CREATED_AT_START,
                    FILTER_PARAMS.CREATED_AT_END,
                  )
                }
                value={[
                  filterParams[FILTER_PARAMS.CREATED_AT_START]
                    ? dayjs(filterParams[FILTER_PARAMS.CREATED_AT_START])
                    : null,
                  filterParams[FILTER_PARAMS.CREATED_AT_END]
                    ? dayjs(filterParams[FILTER_PARAMS.CREATED_AT_END])
                    : null,
                ]}
              />
            </Col>
            <Col md={2}>
              <label htmlFor="" className="form-label">
                Updated On
              </label>
              <DateRangePicker
                placeholderText="Select Dates"
                onChange={(value) =>
                  handleDateChange(
                    value,
                    FILTER_PARAMS.UPDATED_AT_START,
                    FILTER_PARAMS.UPDATED_AT_END,
                  )
                }
                value={[
                  filterParams[FILTER_PARAMS.UPDATED_AT_START]
                    ? dayjs(filterParams[FILTER_PARAMS.UPDATED_AT_START])
                    : null,
                  filterParams[FILTER_PARAMS.UPDATED_AT_END]
                    ? dayjs(filterParams[FILTER_PARAMS.UPDATED_AT_END])
                    : null,
                ]}
              />
            </Col>
          </Row>
        </Card>

        <Accordion className="mt-3">
          <Accordion.Item>
            <Accordion.Header>Vehicle </Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Vin
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams[FILTER_PARAMS.VEHICLE_NO_SEARCH]}
                    onChange={(e) => {
                      handleFilterChange(
                        FILTER_PARAMS.VEHICLE_NO_SEARCH,
                        e?.target?.value,
                        true,
                      );
                    }}
                    onClear={() =>
                      handleFilterChange(
                        FILTER_PARAMS.VEHICLE_NO_SEARCH,
                        "",
                        true,
                      )
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Vehicle Reg No
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.VEHICLE_REG_SEARCH]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.VEHICLE_REG_SEARCH,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(
                        FILTER_PARAMS.VEHICLE_REG_SEARCH,
                        "",
                        true,
                      )
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Chassis No
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.CHASSIS_NO]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.CHASSIS_NO,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.CHASSIS_NO, "", true)
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Engine No
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.ENGINE_NO]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.ENGINE_NO,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.ENGINE_NO, "", true)
                    }
                    clearable={true}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Sale Date/Reg Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.SALE_DATE_START,
                        FILTER_PARAMS.SALE_DATE_END,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.SALE_DATE_START]
                        ? dayjs(filterParams[FILTER_PARAMS.SALE_DATE_START])
                        : null,
                      filterParams[FILTER_PARAMS.SALE_DATE_END]
                        ? dayjs(filterParams[FILTER_PARAMS.SALE_DATE_END])
                        : null,
                    ]}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Channel
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    options={masters?.[MASTERS_KEY.CHANNEL] || []}
                    value={filterParams[FILTER_PARAMS.CHANNEL]}
                    onChange={(selected) => {
                      handleFilterChange(FILTER_PARAMS.CHANNEL, selected, true);
                    }}
                    count={filterParams?.[FILTER_PARAMS.CHANNEL]?.length}
                    isMulti
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Model Name
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    onChange={(selected) => {
                      handleFilterChange(FILTER_PARAMS.MODEL, selected, true);
                    }}
                    options={masters?.[MASTERS_KEY.MODEL] || []}
                    value={filterParams[FILTER_PARAMS.MODEL]}
                    count={filterParams?.[FILTER_PARAMS.MODEL]?.length}
                    isMulti
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Varient Name
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    onChange={(selected) => {
                      handleFilterChange(FILTER_PARAMS.VARIANT, selected, true);
                    }}
                    options={masters?.[MASTERS_KEY.VARIANT] || []}
                    value={filterParams[FILTER_PARAMS.VARIANT]}
                    count={filterParams?.[FILTER_PARAMS.VARIANT]?.length}
                    isMulti
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Fuel Type
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.FUEL_TYPE]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.FUEL_TYPE,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.FUEL_TYPE, "", true)
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Seating
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.SEATING_SEARCH]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.SEATING_SEARCH,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.SEATING_SEARCH, "", true)
                    }
                    clearable={true}
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="mt-3">
          <Accordion.Item>
            <Accordion.Header>Customer </Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Customer Name
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.CUSTOMER_NAME]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.CUSTOMER_NAME,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.CUSTOMER_NAME, "", true)
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    City (Reg Addr)
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.SALES_CITY,
                        selected,
                        true,
                      );
                    }}
                    options={masters?.[MASTERS_KEY.CITY] || []}
                    value={filterParams[FILTER_PARAMS.SALES_CITY]}
                    count={filterParams?.[FILTER_PARAMS.SALES_CITY]?.length}
                    isMulti
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    City (Curr Addr)
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.SERVICE_CITY,
                        selected,
                        true,
                      );
                    }}
                    options={masters?.[MASTERS_KEY.CITY] || []}
                    value={filterParams[FILTER_PARAMS.SERVICE_CITY]}
                    count={filterParams?.[FILTER_PARAMS.SERVICE_CITY]?.length}
                    isMulti
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          {/* <h3>Customer Filters</h3> */}
        </Accordion>

        <Accordion className="mt-3">
          <Accordion.Item>
            <Accordion.Header>Service </Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Last JC No
                  </label>
                  <CustomInput
                    placeholder="Search"
                    value={filterParams?.[FILTER_PARAMS.JOB_CARD_NUMBER]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.JOB_CARD_NUMBER,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(
                        FILTER_PARAMS.JOB_CARD_NUMBER,
                        "",
                        true,
                      )
                    }
                    clearable={true}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Last Service Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.LAST_SERVICE_START,
                        FILTER_PARAMS.LAST_SERVICE_END,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.LAST_SERVICE_START]
                        ? dayjs(filterParams[FILTER_PARAMS.LAST_SERVICE_START])
                        : null,
                      filterParams[FILTER_PARAMS.LAST_SERVICE_END]
                        ? dayjs(filterParams[FILTER_PARAMS.LAST_SERVICE_END])
                        : null,
                    ]}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Last Service Type
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.LAST_SERVICE_TYPE,
                        selected,
                        true,
                      );
                    }}
                    options={masters?.[MASTERS_KEY.SERVICE_TYPE] || []}
                    value={filterParams[FILTER_PARAMS.LAST_SERVICE_TYPE]}
                    count={
                      filterParams?.[FILTER_PARAMS.LAST_SERVICE_TYPE]?.length
                    }
                    isMulti
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Last Service Location
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    options={masters?.[MASTERS_KEY.SERVICE_STATION] || []}
                    value={filterParams[FILTER_PARAMS.LAST_SERVICE_LOCATION]}
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.LAST_SERVICE_LOCATION,
                        selected,
                        true,
                      );
                    }}
                    count={
                      filterParams?.[FILTER_PARAMS.LAST_SERVICE_LOCATION]
                        ?.length
                    }
                    isMulti
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Next Service Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.NEXT_SERVICE_START_DATE,
                        FILTER_PARAMS.NEXT_SERVICE_END_DATE,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.NEXT_SERVICE_START_DATE]
                        ? dayjs(
                            filterParams[FILTER_PARAMS.NEXT_SERVICE_START_DATE],
                          )
                        : null,
                      filterParams[FILTER_PARAMS.NEXT_SERVICE_END_DATE]
                        ? dayjs(
                            filterParams[FILTER_PARAMS.NEXT_SERVICE_END_DATE],
                          )
                        : null,
                    ]}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Dealer City
                  </label>
                  <CustomInput
                    placeholder="Search"
                    clearable={true}
                    value={filterParams?.[FILTER_PARAMS.DEALER_CITY]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.DEALER_CITY,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.DEALER_CITY, "", true)
                    }
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    WS Code/WS Name
                  </label>
                  <CustomInput
                    placeholder="Search"
                    clearable={true}
                    value={filterParams?.[FILTER_PARAMS.WS_CODE]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.WS_CODE,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.WS_CODE, "", true)
                    }
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Sold By
                  </label>
                  <CustomInput
                    placeholder="Search"
                    clearable={true}
                    value={filterParams?.[FILTER_PARAMS.SOLD_BY]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.SOLD_BY,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.SOLD_BY, "", true)
                    }
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    Sale Dealer
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    options={masters?.[MASTERS_KEY.SALE_DEALER] || []}
                    value={filterParams[FILTER_PARAMS.SALE_DEALEARS]}
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.SALE_DEALEARS,
                        selected,
                        true,
                      );
                    }}
                    count={filterParams?.[FILTER_PARAMS.SALE_DEALEARS]?.length}
                    isMulti
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="mt-3">
          <Accordion.Item>
            <Accordion.Header>Insurance </Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Insurance Status
                  </label>
                  <MultiSelect
                    placeholder="Select"
                    options={INSURANCE_STATUS_OPTIONS}
                    value={filterParams[FILTER_PARAMS.INSURANCE_STATUS]}
                    onChange={(selected) => {
                      handleFilterChange(
                        FILTER_PARAMS.INSURANCE_STATUS,
                        selected,
                        true,
                      );
                    }}
                    count={filterParams[FILTER_PARAMS.INSURANCE_STATUS]?.length}
                    isMulti
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    Insurance Renewal Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.INSURANCE_RENEWAL_START_DATE,
                        FILTER_PARAMS.INSURANCE_RENEWAL_END_DATE,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.INSURANCE_RENEWAL_START_DATE]
                        ? dayjs(
                            filterParams[
                              FILTER_PARAMS.INSURANCE_RENEWAL_START_DATE
                            ],
                          )
                        : null,
                      filterParams[FILTER_PARAMS.INSURANCE_RENEWAL_END_DATE]
                        ? dayjs(
                            filterParams[
                              FILTER_PARAMS.INSURANCE_RENEWAL_END_DATE
                            ],
                          )
                        : null,
                    ]}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    OEM Warranty Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.OEM_WARRANTY_DATE_START,
                        FILTER_PARAMS.OEM_WARRANTY_DATE_END,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.OEM_WARRANTY_DATE_START]
                        ? dayjs(
                            filterParams[FILTER_PARAMS.OEM_WARRANTY_DATE_START],
                          )
                        : null,
                      filterParams[FILTER_PARAMS.OEM_WARRANTY_DATE_END]
                        ? dayjs(
                            filterParams[FILTER_PARAMS.OEM_WARRANTY_DATE_END],
                          )
                        : null,
                    ]}
                  />
                </Col>
                <Col md={3}>
                  <label htmlFor="vin" className="form-label">
                    MCP Status Date
                  </label>
                  <DateRangePicker
                    placeholderText="Select Dates"
                    onChange={(value) =>
                      handleDateChange(
                        value,
                        FILTER_PARAMS.MCP_STATUS_DATE_START,
                        FILTER_PARAMS.MCP_STATUS_DATE_END,
                      )
                    }
                    value={[
                      filterParams[FILTER_PARAMS.MCP_STATUS_DATE_START]
                        ? dayjs(
                            filterParams[FILTER_PARAMS.MCP_STATUS_DATE_START],
                          )
                        : null,
                      filterParams[FILTER_PARAMS.MCP_STATUS_DATE_END]
                        ? dayjs(filterParams[FILTER_PARAMS.MCP_STATUS_DATE_END])
                        : null,
                    ]}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>
                  <label htmlFor="" className="form-label">
                    BI Code
                  </label>
                  <CustomInput
                    placeholder="Search"
                    clearable={true}
                    value={filterParams?.[FILTER_PARAMS.BI_CODE]}
                    onChange={(e) =>
                      handleFilterChange(
                        FILTER_PARAMS.BI_CODE,
                        e?.target?.value,
                        true,
                      )
                    }
                    onClear={() =>
                      handleFilterChange(FILTER_PARAMS.BI_CODE, "", true)
                    }
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Row className="mt-3">
          <div className="d-flex gap-2">
            {/* <CustomButton className="bg-warning text-dark">Reset</CustomButton> */}

            <CustomButton
              className="bg-success text-light"
              onClick={() => {
                // Options
                const keysToTransform = [
                  FILTER_PARAMS.MODEL,
                  FILTER_PARAMS.VARIANT,
                  FILTER_PARAMS.SALES_CITY,
                  FILTER_PARAMS.SERVICE_CITY,
                  FILTER_PARAMS.CHANNEL,
                  FILTER_PARAMS.LAST_SERVICE_LOCATION,
                  FILTER_PARAMS.SALE_DEALEARS,
                  FILTER_PARAMS.LAST_SERVICE_TYPE,
                  FILTER_PARAMS.INSURANCE_STATUS,
                ];
                const transformedParams = Object.fromEntries(
                  Object.entries(filterParams).map(([key, value]) => {
                    const newValue = keysToTransform.includes(key)
                      ? handleMultipleOptionsApiValues(value).join(",")
                      : value;
                    return [key, encodeURIComponent(newValue)];
                  }),
                );
                router.push(PAGE_ROUTES.CUSTOMER_DATA, {
                  query: transformedParams,
                });
                handleClose();
              }}
            >
              Apply
            </CustomButton>
            <CustomButton variant="primary" onClick={handleClose}>
              Cancel
            </CustomButton>
          </div>
        </Row>
      </section>
    </CustomModal>
  );
};

export default FilterModal;
