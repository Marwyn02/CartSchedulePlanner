import React from "react";
import Link from "next/link";

export const TableData = ({
  schedules,
  currentDate,
}: {
  schedules: any;
  currentDate: string;
}) => {
  const filteredSchedule = schedules.filter(
    (s: { date: string }) => s.date === currentDate
  );

  return (
    <td className="py-2 px-2 md:py-4 md:px-6 text-gray-800 font-medium">
      {filteredSchedule.map(
        (
          s: {
            id: number;
            user: { name: string; id: string }[];
            time: string;
            place: string;
            date: string[];
          },
          i: number
        ) => (
          <div key={s.id}>
            <Link
              href={{
                pathname: "/schedule",
                query: {
                  id: s.id,
                  userId: s.user[0].id,
                  name: s.user[0].name,
                  time: s.time,
                  place: s.place,
                  date: s.date,
                },
              }}
            >
              <p className="text-sm hover:text-gray-400 duration-300">
                {i + 1}. {s.user[0].name}
              </p>
            </Link>
          </div>
        )
      )}
    </td>
  );
};
