import React from "react";

export const TableData = ({
  schedules,
  currentDate,
}: {
  schedules: any;
  currentDate: string;
}) => {
  const filteredSchedule = schedules.filter((s: any) => s.date === currentDate);

  const data = filteredSchedule.map((s: any, i: any) => (
    <div key={i}>
      <p>
        {i + 1}. {s.user[0].name}
      </p>
    </div>
  ));
  return (
    <td className="py-2 px-2 md:py-4 md:px-6 text-gray-800 font-medium">
      {data}
    </td>
  );
};
