"use client";

import ScrollableTabs from "@/components/ScrollableTabs";
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Container } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { FaBuilding, FaCar, FaCommentSms } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { VscCallOutgoing } from "react-icons/vsc";
import { BiSolidEdit } from "react-icons/bi";
import DynamicForm from "@/components/DynamicForm";
import { MdAlternateEmail, MdDoDisturbAlt } from "react-icons/md";
import CustomTable from "@/components/custom-table/CustomTable";
import CustomPagination from "@/components/custom-pagination/CustomPagination";
import PageLoader from "@/components/loader/PageLoader";
import ComponentLoader from "@/components/loader/ComponentLoader";

const leftTabs = [
  { key: "vehicle_info", title: "Vehicle Info" },
  { key: "last_status", title: "Last Service Status" },
  { key: "insurance", title: "Insurance" },
  { key: "interaction_history", title: "Interaction History" },
];

const rightTabs = [{ key: "disposition_form", title: "Disposition Form" }];

const dummyCardData = {
  vehicle_info: {
    "Model Name": "NEW ERTIGA",
    Variant: "MARUTI ERTIGA SMART HYBRID VXI (O) 1.5L 5MT",
    "Registration Number": "GJ27EC1429",
    "VIN Number": "MA3BNC72SPC601345",
    "Engine Number": "9204025",
    "Chassis Number": "601345",
    "Colour Code": "ZHJ",
    "Colour Name": "PEARL ARCTIC WHITE",
    "Fuel Type": "PET",
    "Vehicle Type": "IND",
    "Invoice Number": "VSL/22001536",
    "Manufacturing Year": "13-Mar-2023",
    "Delivery Date": "04-Feb-2025",
    "Sale Date": "25-Mar-2023",
    "Selling Dealer Name": "PEGASUS (A UNIT OF VISUAL MOTORS PVT LTD)",
    Channel: "NRM",
    "Selling DSE Name": "SONAL VASANTBHAI PARMAR",
    "Selling DSE Number": "9909039522",
    "Last Service Date": "04-Feb-2025",
    "Time since Last Service": "0 Years, 4 Months, 13 Days",
    "Avg. Running Per Year": "5576",
    "Last Service": "04-Feb-2025",
    "Odometer Reading": "10396",
    "Last Confirmed Mileage": "",
    "Predicted Odometer Reading": "",
  },

  last_status: {
    "Last Service": "2025-03-01",
    "Km at Service": "60200",
    "Last JCNumber": "JC123456",
    "Bill Number": "BN789012",
    "Bill Amount": "₹8,750",
    "Last ServiceType": "Periodic Maintenance",
    "Last ServiceLocation": "AutoCare Center, Mumbai",
    Mileage: "16.5 km/l",
    "Service AdvisorName": "Rahul Mehta",
    "Days Between Visit": "180",
  },

  insurance: {
    Provider: "ABC Insurance",
    expiry: "2025-11-30",
    ewStatus: "Active",
    "Ew ExpiryDate": "2026-03-15",
    "MCP Status": "Expired",
    "MCP ExpiryDate": "2024-12-31",
  },
};

const dummyForms = {
  disposition_form: (
    <Form>
      <Form.Check type="radio" label="Book My Service" name="disposition" checked/>
      <Form.Check
        type="radio"
        label="Service Not Required"
        name="disposition"
      />
      <Form.Check type="radio" label="Call Me Later" name="disposition" />
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="vehicleSelect">
            <Form.Label>Select Vehicle</Form.Label>
            <Form.Control as="select">
              <option>GJ27BB0818</option>
              <option>MH12AB1234</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="citySelect">
            <Form.Label>Select City</Form.Label>
            <Form.Control as="select">
              <option>Ahmedabad</option>
              <option>Pune</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="dateSelect">
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="timeSelect">
            <Form.Label>Select Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Submit</Button>
      </div>
    </Form>
  ),
  feedback_form: (
    <Form>
      <Form.Group>
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Write feedback here..."
        />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Submit</Button>
      </div>
    </Form>
  ),
  report_form: (
    <Form>
      <Form.Group>
        <Form.Label>Select Reason</Form.Label>
        <Form.Control as="select">
          <option>Issue</option>
          <option>Follow-up</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Report Notes</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Submit</Button>
      </div>
    </Form>
  ),
  callback_form: (
    <Form>
      <Form.Group>
        <Form.Label>Callback Time</Form.Label>
        <Form.Control type="time" />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Schedule</Button>
      </div>
    </Form>
  ),
  priority_form: (
    <Form>
      <Form.Group>
        <Form.Label>Priority Level</Form.Label>
        <Form.Control as="select">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Set Priority</Button>
      </div>
    </Form>
  ),
};

const data = {
  name: "CHAUHAN PRAMODBHAI RAMNIKLALBHAI",
  email: "chauhanprmod12@gmail.com",
  mobile: ["9574889334", "9123456789", "9876543210"],
  address: "801, kataria arcade, Sg Highway, Makarba, Ahmedabad 385001",
  registrationNumber: "GJ06PN8231",
  outletName: null,
  dnd: true,
  vehicle: {
    model: "EECO",
    serviceType: "FR1",
    technician: null,
    insuranceStatus: null,
    insuranceRenewalDate: null,
  },
};

const interactionSubTabs = [
  { key: "service", title: "Service" },
  { key: "sms", title: "SMS" },
  { key: "emails", title: "Emails" },
  { key: "followups", title: "Follow-ups" },
  { key: "feedback", title: "Feedback" },
  { key: "reminders", title: "Reminders" },
  { key: "visits", title: "Visits" },
];
const columnsMap = {
  service: [
    { key: "assignId", title: "AssignID", width: "120px" },
    { key: "callDate", title: "Call Date", width: "120px" },
    { key: "callTime", title: "Call Time", width: "100px" },
    { key: "cre", title: "CRE", width: "100px" },
    { key: "campaign", title: "Campaign", width: "150px" },
    { key: "serviceType", title: "ServiceType", width: "130px" },
    {
      key: "secondaryDisposition",
      title: "Secondary Disposition",
      width: "160px",
    },
    { key: "details", title: "Details", width: "200px" },
    { key: "creRemarks", title: "CRE Remarks", width: "150px" },
    { key: "feedback", title: "Feedback", width: "100px" },
    { key: "callMadeType", title: "CallMade Type", width: "130px" },
    { key: "isCallInitiated", title: "IsCallinitiated?", width: "130px" },
  ],
  default: [
    { key: "date", title: "Date", width: "120px" },
    { key: "type", title: "Type", width: "120px" },
    { key: "notes", title: "Notes", width: "200px" },
  ],
};

const interactionHistoryData = {
  service: [
    {
      assignId: "A123",
      callDate: "2025-06-22",
      callTime: "10:30 AM",
      cre: "John",
      campaign: "Summer Campaign",
      serviceType: "PMS",
      secondaryDisposition: "Completed",
      details: "Routine service completed",
      creRemarks: "All good",
      feedback: "Satisfied",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A124",
      callDate: "2025-06-21",
      callTime: "02:15 PM",
      cre: "Alice",
      campaign: "Monsoon Checkup",
      serviceType: "AMC",
      secondaryDisposition: "Completed",
      details: "Filter changed",
      creRemarks: "Customer happy",
      feedback: "Very satisfied",
      callMadeType: "Auto",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A125",
      callDate: "2025-06-20",
      callTime: "11:00 AM",
      cre: "Bob",
      campaign: "Annual Maintenance",
      serviceType: "Repair",
      secondaryDisposition: "Pending",
      details: "Parts not available",
      creRemarks: "Rescheduled",
      feedback: "Neutral",
      callMadeType: "Manual",
      isCallInitiated: "No",
    },
    {
      assignId: "A126",
      callDate: "2025-06-19",
      callTime: "09:45 AM",
      cre: "Emma",
      campaign: "Summer Campaign",
      serviceType: "Installation",
      secondaryDisposition: "Completed",
      details: "New unit installed",
      creRemarks: "Smooth installation",
      feedback: "Satisfied",
      callMadeType: "Auto",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A127",
      callDate: "2025-06-18",
      callTime: "03:30 PM",
      cre: "Liam",
      campaign: "Winter Offer",
      serviceType: "PMS",
      secondaryDisposition: "Cancelled",
      details: "Customer unavailable",
      creRemarks: "Will follow up",
      feedback: "N/A",
      callMadeType: "Manual",
      isCallInitiated: "No",
    },
    {
      assignId: "A128",
      callDate: "2025-06-17",
      callTime: "01:00 PM",
      cre: "Sophia",
      campaign: "Referral Bonus",
      serviceType: "AMC",
      secondaryDisposition: "Completed",
      details: "Routine check",
      creRemarks: "Everything OK",
      feedback: "Satisfied",
      callMadeType: "Auto",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A129",
      callDate: "2025-06-16",
      callTime: "04:15 PM",
      cre: "Ethan",
      campaign: "Maintenance Week",
      serviceType: "Repair",
      secondaryDisposition: "Completed",
      details: "Replaced compressor",
      creRemarks: "Explained warranty",
      feedback: "Very satisfied",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A130",
      callDate: "2025-06-15",
      callTime: "12:30 PM",
      cre: "Olivia",
      campaign: "Summer Campaign",
      serviceType: "Installation",
      secondaryDisposition: "Pending",
      details: "Site inspection done",
      creRemarks: "Awaiting customer decision",
      feedback: "Pending",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A131",
      callDate: "2025-06-14",
      callTime: "10:00 AM",
      cre: "Mason",
      campaign: "Warranty Call",
      serviceType: "Repair",
      secondaryDisposition: "Completed",
      details: "Repaired wiring",
      creRemarks: "Customer satisfied",
      feedback: "Good",
      callMadeType: "Auto",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A132",
      callDate: "2025-06-13",
      callTime: "09:00 AM",
      cre: "Ava",
      campaign: "Monsoon Checkup",
      serviceType: "PMS",
      secondaryDisposition: "Completed",
      details: "Gas top-up done",
      creRemarks: "Performance improved",
      feedback: "Very satisfied",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A133",
      callDate: "2025-06-12",
      callTime: "05:00 PM",
      cre: "Noah",
      campaign: "Referral Bonus",
      serviceType: "AMC",
      secondaryDisposition: "Cancelled",
      details: "Duplicate entry",
      creRemarks: "No action needed",
      feedback: "N/A",
      callMadeType: "Auto",
      isCallInitiated: "No",
    },
    {
      assignId: "A134",
      callDate: "2025-06-11",
      callTime: "11:45 AM",
      cre: "Isabella",
      campaign: "Maintenance Week",
      serviceType: "Repair",
      secondaryDisposition: "Completed",
      details: "Fan motor replaced",
      creRemarks: "Explained usage tips",
      feedback: "Satisfied",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A135",
      callDate: "2025-06-10",
      callTime: "02:00 PM",
      cre: "James",
      campaign: "Summer Campaign",
      serviceType: "PMS",
      secondaryDisposition: "Completed",
      details: "General maintenance",
      creRemarks: "Customer cooperative",
      feedback: "Good",
      callMadeType: "Manual",
      isCallInitiated: "Yes",
    },
    {
      assignId: "A136",
      callDate: "2025-06-09",
      callTime: "03:00 PM",
      cre: "Charlotte",
      campaign: "Annual Maintenance",
      serviceType: "AMC",
      secondaryDisposition: "Pending",
      details: "Follow-up required",
      creRemarks: "Parts ordered",
      feedback: "Pending",
      callMadeType: "Auto",
      isCallInitiated: "Yes",
    },
  ],
  calls: [
    { date: "2025-06-10", type: "Incoming", notes: "Discussed service" },
    { date: "2025-06-09", type: "Outgoing", notes: "Customer inquiry" },
    { date: "2025-06-08", type: "Missed", notes: "No response" },
    { date: "2025-06-07", type: "Incoming", notes: "Follow-up call" },
    { date: "2025-06-06", type: "Outgoing", notes: "Confirmed appointment" },
  ],
  sms: [
    { date: "2025-06-05", type: "Reminder", notes: "Service due" },
    { date: "2025-06-04", type: "Promo", notes: "Discount offer" },
    { date: "2025-06-03", type: "Follow-up", notes: "Feedback request" },
    { date: "2025-06-02", type: "Info", notes: "Insurance expiry info" },
    { date: "2025-06-01", type: "Reminder", notes: "Appointment reminder" },
  ],
  emails: [
    { date: "2025-05-30", type: "Notification", notes: "Invoice emailed" },
    { date: "2025-05-28", type: "Promo", notes: "New service plans" },
    { date: "2025-05-26", type: "Reminder", notes: "Upcoming service" },
    { date: "2025-05-24", type: "Feedback", notes: "Requested feedback" },
    { date: "2025-05-22", type: "Alert", notes: "Insurance expiring soon" },
  ],
  followups: [
    { date: "2025-06-20", type: "Call", notes: "Requested callback" },
    { date: "2025-06-19", type: "SMS", notes: "Pending response" },
    { date: "2025-06-18", type: "Call", notes: "Customer unavailable" },
    { date: "2025-06-17", type: "Visit", notes: "Walk-in" },
    { date: "2025-06-16", type: "Call", notes: "Confirmed appointment" },
  ],
  feedback: [
    { date: "2025-06-15", type: "Rating", notes: "4 stars" },
    { date: "2025-06-14", type: "Comment", notes: "Good service" },
    { date: "2025-06-13", type: "Complaint", notes: "Delay in delivery" },
    { date: "2025-06-12", type: "Suggestion", notes: "Add pickup option" },
    { date: "2025-06-11", type: "Rating", notes: "5 stars" },
  ],
  reminders: [
    { date: "2025-06-25", type: "MCP", notes: "MCP renewal" },
    { date: "2025-06-24", type: "Service", notes: "Upcoming service" },
    { date: "2025-06-23", type: "Insurance", notes: "Policy expiry" },
    { date: "2025-06-22", type: "Call", notes: "Call reminder" },
    { date: "2025-06-21", type: "General", notes: "Checkup reminder" },
  ],
  visits: [
    { date: "2025-03-01", type: "Service", notes: "Routine service done" },
    { date: "2025-02-15", type: "Checkup", notes: "General checkup" },
    { date: "2025-01-10", type: "Repair", notes: "Brake issue fixed" },
    { date: "2024-12-05", type: "Service", notes: "Oil change" },
    { date: "2024-11-20", type: "Inspection", notes: "Pre-inspection" },
  ],
};

export default function DynamicTabView() {
  const [activeLeft, setActiveLeft] = useState("vehicle_info");
  const [activeRight, setActiveRight] = useState("disposition_form");
  const [selectedMobile, setSelectedMobile] = useState(data.mobile[0]);
  const [activeInteractionSubTab, setActiveInteractionSubTab] =
    useState("service");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = ({ selected }) => setPage(selected + 1);
  const handleMobileChange = (e) => setSelectedMobile(e.target.value);

  const subTabData = interactionHistoryData[activeInteractionSubTab] || [];
  const paginatedData = subTabData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const meta = {
    totalElements: subTabData.length,
    totalPages: Math.ceil(subTabData.length / pageSize),
    pageSize,
  };
   return (
    <Container fluid className="px-6 pt-3">
      <div className="detail-page sticky-header">
        <div className="header">
          <div className="header-item">
            <div className="header-detail">
              <FaUserAlt className="icon" size={22} />
              <span>{data.name}</span>
            </div>
            <div className="header-detail">
              <MdAlternateEmail className="icon" size={22} />
              <span>{data.email}</span>
            </div>
            <div className="header-detail">
              <IoMdCall className="icon" size={22} />
              <select value={selectedMobile} onChange={handleMobileChange}>
                {data.mobile.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="header-item">
            <div className="header-detail">
              <IoLocationSharp className="icon" size={22} />
              <span style={{width:"250px"}}>{data.address}</span>
            </div>
          </div>

          <div className="header-item">
            <div className="header-detail">
              <FaBuilding className="icon" size={22} />
              <span>{data.registrationNumber}</span>
            </div>
            <div className="header-detail">
              <FaCar className="icon" size={22} />
              <span>{data.vehicle.model}</span>
            </div>
            <div className="header-detail">
              <MdDoDisturbAlt className="icon" size={22} />
              {data.dnd && <span className="dnd-detail">DND</span>}
            </div>
          </div>

          <div className="header-icon">
            <BiSolidEdit size={30} />
          </div>
          <div className="header-icon">
            <VscCallOutgoing size={30} />
          </div>
          <div className="header-icon">
            <FaCommentSms size={30} />
          </div>
        </div>
      </div>
      <div className="detail-page">
        <div className="service-dates-wrap">
          <div className="header-item">
            <div className="header-detail">
              <span className="font-charcoal">NSD predicted by Date:</span>
              <span className="font-primary font-bold">20-7-2025</span>
            </div>
            <div className="header-detail">
              <span className="font-charcoal">NSD predicted by Mileage :</span>
              <span className="font-primary font-bold">12000 km</span>
            </div>
          </div>
          <div className="header-item">
            <div className="header-detail">
              <span className="font-charcoal">
                Next Service Type (FR/ PMS):
              </span>
              <span className="font-primary font-bold">PMS20</span>
            </div>
            <div className="header-detail">
              <span className="font-charcoal">
                Workshop:
              </span>
              <span className="font-primary font-bold">AHM Maninagar</span>
            </div>
           
          </div>
          <div className="header-item">
            <div className="header-detail">
              <span className="font-charcoal">Avg. Km per day:</span>
              <span className="font-primary font-bold">43930 Km</span>
            </div>
            <div className="header-detail">
              <span className="font-charcoal">Predicted Mileage:</span>
              <span className="font-primary font-bold">500 Km</span>
            </div>
          </div>
          <div className="header-item">
           <div className="header-detail">
              <span className="font-charcoal">Current Mileage and Date:</span>
              <input type="text" placeholder="Enter Km" className="w-50"/>
            </div>
          </div>
        </div>
      </div>
      <Row className="mt-2">
        <Col md={7}>
          <ScrollableTabs
            tabs={leftTabs}
            activeKey={activeLeft}
            onSelect={setActiveLeft}
            maxVisibleTabs={8}
          />
          <Card className="custom-card">
            <Card.Body className="custom-card-body">
              {activeLeft === "interaction_history" ? (
                <>
                  <ScrollableTabs
                    tabs={interactionSubTabs}
                    activeKey={activeInteractionSubTab}
                    onSelect={(key) => {
                      setActiveInteractionSubTab(key);
                      setPage(1);
                    }}
                    maxVisibleTabs={7}
                  />
                  <CustomTable
                    columns={
                      columnsMap[activeInteractionSubTab] || columnsMap.default
                    }
                    data={paginatedData}
                    isLoading={false}
                    tableClass="max-height-300"
                  />
                  <CustomPagination
                    metaData={meta}
                    currentPage={page}
                    handlePageClick={handlePageChange}
                    handlePageSizeChange={setPageSize}
                  />
                </>
              ) : (
                dummyCardData[activeLeft] && (
                  <Row className="gx-4 gy-2">
                    {Object.entries(dummyCardData[activeLeft]).map(
                      ([label, value], idx) => (
                        <Col key={idx} md={6}>
                          <div className="d-flex">
                            <span className="me-2 font-12">{label}:</span>
                            <strong className="font-12 text-end">
                              {value || "-"}
                            </strong>
                          </div>
                        </Col>
                      )
                    )}
                  </Row>
                )
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <ScrollableTabs
            tabs={rightTabs}
            activeKey={activeRight}
            onSelect={setActiveRight}
            maxVisibleTabs={7}
          />
          <Card className="custom-card">
            <Card.Body className="custom-card-body">
              {dummyForms[activeRight]}
            </Card.Body>
          </Card>
        </Col>
      </Row>
     
    </Container>
  );
}
