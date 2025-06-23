"use client";

import { useRef } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import CustomButton from "./CustomButton";

export default function ScrollableTabs({
  tabs,
  activeKey,
  onSelect,
  maxVisibleTabs,
  showScroll = true,
}) {
  const tabsRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const showScrollButtons = tabs.length > maxVisibleTabs;

  return (
    <div className="d-flex align-items-center">
      {showScrollButtons && showScroll && (
        <CustomButton
          variant="light"
          onClick={() => scrollTabs("left")}
          className="me-2 tab-btn"
        >
          ◀
        </CustomButton>
      )}

      <div
        ref={tabsRef}
        className="tabs-ref"
        style={{ whiteSpace: "nowrap", scrollBehavior: "smooth" }}
      >
        <Tabs
          activeKey={activeKey}
          onSelect={onSelect}
          className="mb-0 custom-tabs"
          style={{
            display: "inline-flex",
            flexWrap: "nowrap",
            minWidth: "max-content",
          }}
        >
          {tabs.map((tab) => (
            <Tab eventKey={tab.key} title={tab.title} key={tab.key} />
          ))}
        </Tabs>
      </div>

      {showScrollButtons && showScroll && (
        <CustomButton
          variant="light"
          onClick={() => scrollTabs("right")}
          className="ms-2 tab-btn"
        >
          ▶
        </CustomButton>
      )}
    </div>
  );
}
