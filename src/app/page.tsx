import { FormPage } from "./components/Form/page";
import { TablePage } from "./components/Table/TablePage";

export default function Home() {
  return (
    <main>
      <section className="p-5">
        <FormPage />
      </section>
      <TablePage />
    </main>
  );
}
