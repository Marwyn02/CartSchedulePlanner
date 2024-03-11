import { TablePage } from "./components/Table/TablePage";
import { LinkButton } from "./components/ui/button";
import { ModeToggle } from "./components/darkmode-button";
import { IconHistory } from "@tabler/icons-react";

import getAppointment from "./api/appointment/get";
import Link from "next/link";

type TScheduleProps = {
  schedules: {
    id: number;
    date: string;
    place: string;
    time: string | null;
  }[];
};

export default async function Home() {
  const { schedules }: TScheduleProps = await getAppointment();

  const filteredTimeMorning = schedules.filter(
    (s: any) => s.time === "Morning"
  );
  const filteredTimeAfternoon = schedules.filter(
    (s: any) => s.time === "Afternoon"
  );

  const date = new Date().toDateString();

  return (
    <main className="py-5">
      <div className="flex justify-between items-center mx-5 gap-x-5 my-3">
        <LinkButton href={"./schedule"} text="Create a schedule" />
        <div className="flex items-center gap-x-3 font-semibold">
          <p className=" px-5 py-1.5 bg-violet-800 text-white text-sm rounded-md">
            {date}
          </p>
          <ModeToggle />
          <Link href={"/history"}>
            <IconHistory />
          </Link>
        </div>
      </div>
      {/* Morning Table */}
      <TablePage
        key={"morning"}
        appointments={filteredTimeMorning}
        selectedTime={"Morning"}
      />

      {/* Afternoon Table */}
      <TablePage
        key={"afternoon"}
        appointments={filteredTimeAfternoon}
        selectedTime={"Afternoon"}
      />
    </main>
  );
}
