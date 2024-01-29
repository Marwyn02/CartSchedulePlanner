import { TablePage } from "./components/Table/TablePage";
import { LinkButton } from "./components/ui/button";
import getAppointment from "./api/appointment/get";

type TScheduleProps = {
  schedules: {
    id: number;
    username: string;
    date: string;
  }[];
};

export default async function Home() {
  const schedules: TScheduleProps = await getAppointment();

  return (
    <main className="py-5">
      <div className="mx-5 my-3">
        <LinkButton href={"./schedule"} text="Create a schedule" />
      </div>
      <TablePage appointments={schedules} />
    </main>
  );
}
