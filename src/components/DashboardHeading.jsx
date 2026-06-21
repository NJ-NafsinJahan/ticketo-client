import React from "react";

const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-amber-50/10 pb-6">
      <h1 className="text-3xl font-extrabold text-white">{title}</h1>
      <p className="text-muted">{description}</p>
    </div>
  );
};

export default DashboardHeading;
