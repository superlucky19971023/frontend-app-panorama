import React from "react";
import { Link } from "react-router-dom";

function DashboardPanels() {

  return (
    <div className="content-terms">
      <div className="homeWelcome">
        <Link to="/" className="button-contact">
          Back
        </Link>
      </div>
    </div>
  );
}

export default DashboardPanels;
