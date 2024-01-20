import Link from "next/link";
import { TablePage } from "./components/Table/TablePage";

export default function Home() {
  return (
    <main className="py-5">
      <Link href="./schedule" className="m-5 font-semibold text-sm px-5 py-2">
        Create a schedule
      </Link>
      <TablePage />
    </main>
  );
}
