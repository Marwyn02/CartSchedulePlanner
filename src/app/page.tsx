import { TablePage } from "./components/Table/TablePage";
import { LinkButton } from "./components/ui/button";

export default function Home() {
  return (
    <main className="py-5">
      <div className="mx-5 my-3">
        <LinkButton href={"./schedule"} text="Create a schedule" />
      </div>
      <TablePage />
    </main>
  );
}
