import React from "react";

import HistoryTable from "../components/Table/HistoryTable";
import getAppointment from "../api/appointment/get";
import { LinkButton } from "../components/ui/button";

type TAppointmentProps = {
  schedules: {
    id: number;
    date: string;
    place: string;
    time: string | null;
  }[];
};

export default async function HistoryPage() {
  const { schedules }: TAppointmentProps = await getAppointment();

  const filteredTimeMorning = schedules.filter(
    (s: any) => s.time === "Morning"
  );

  const filteredTimeAfternoon = schedules.filter(
    (s: any) => s.time === "Afternoon"
  );
  return (
    <div className="md:p-5 py-5">
      <div className="flex justify-between items-center px-3">
        <p className="font-semibold px-2 underline">History logs</p>
        <LinkButton href="/" text="Back" />
      </div>
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
}
