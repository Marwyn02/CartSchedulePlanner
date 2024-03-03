import React from "react";

import HistoryTable from "../components/Table/HistoryTable";
import getAppointment from "../api/appointment/get";

const page = async () => {
  const { schedules } = await getAppointment();

  const filteredTimeMorning = schedules.filter(
    (s: any) => s.time === "Morning"
  );

  const filteredTimeAfternoon = schedules.filter(
    (s: any) => s.time === "Afternoon"
  );
  return (
    <div>
      This is the page
      <HistoryTable
        key={"morning"}
        selectedTime={"Morning"}
        appointments={filteredTimeMorning}
      />
      <HistoryTable
        key={"afternoon"}
        selectedTime={"Afternoon"}
        appointments={filteredTimeAfternoon}
      />
    </div>
  );
};

export default page;
