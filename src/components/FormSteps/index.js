import React from "react";
import { Stepper } from "react-form-stepper";

const FormSteps = ({ count }) => {
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Stepper
        steps={[
          { label: "Personal Details" },
          { label: "Supportive Documents" },
          { label: "Clinical References" },
          { label: "Bank Details" },
        ]}
        activeStep={count}
        styleConfig={{
          activeBgColor: "#FFBF00",
          completedBgColor: "#31C26B",
          fontWeight: "600",
        }}
      />
    </div>
  );
};

export default FormSteps;
