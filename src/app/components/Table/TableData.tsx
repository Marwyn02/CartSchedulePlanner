import React from "react";

export const TableData = ({
  schedules,
  currentDate,
}: {
  schedules: any;
  currentDate: string;
}) => {
  const filteredSchedule = schedules.filter(
    (schedule: any) => schedule.date === currentDate
  );

  const data =
    filteredSchedule.length > 0 ? (
      filteredSchedule.map((s: any, i: any) => (
        <div key={i}>
          <p>
            {i + 1}. {s.username}
          </p>
        </div>
      ))
    ) : (
      <div></div>
    );

  return (
    <td className="py-2 px-2 md:py-4 md:px-6 text-gray-800 font-medium">
      {data}
    </td>
  );
};
