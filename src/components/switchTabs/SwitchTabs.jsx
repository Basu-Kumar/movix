import { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [left, setLeft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  console.log(data);

  const activeTab = (tab, index) => {
    setLeft(index * 100);

    setTimeout(() => {
      setSelectedTab(index);
    }, 300);

    onTabChange(tab);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            onClick={() => {
              activeTab(tab, index);
            }}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            key={index}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};
export default SwitchTabs;
