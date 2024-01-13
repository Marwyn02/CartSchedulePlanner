import { CalendarPage } from "./components/Calendar/CalendarPage";
import { TablePage } from "./components/Table/TablePage";

export default function Home() {
  return (
    <main>
      <TablePage />

      <CalendarPage />
    </main>
  );
}
