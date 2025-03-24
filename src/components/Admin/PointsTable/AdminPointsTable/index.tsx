import React, { useState } from "react";
import Navtab from "../../../Core_components/Navtab";
import { adminMenus } from "../../../../utils/constats";
import { useQuery } from "@tanstack/react-query";
import { PointsTableGetAll } from "../../../PointsTable/api";
import { ColumnDef } from "@tanstack/react-table";
import { API_URL, BASE_URL } from "../../../../utils/endpoint";
import TableComponent from "../../../Core_components/TanstackTable";
import PointEdit from "../PointEdit/index copy";

function AdminPointsTable() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const columns: ColumnDef<any>[] = [
    {
      header: "Team",
      accessorKey: "team_data.short_name",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <img
            src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
              row.original.team_data?.logo
            )}`}
            alt={row.original.team_data?.short_name}
            className="h-10 w-10"
          />
          <p className="ml-3">{row.original.team_data?.short_name}</p>
        </div>
      ),
    },
    { header: "Matches", accessorKey: "match" },
    { header: "Wins", accessorKey: "win" },
    { header: "Losses", accessorKey: "lose" },
    { header: "Points", accessorKey: "points" },
    { header: "Net Run Rate", accessorKey: "run_rate" },
    {
      header: "action",
      cell: ({ row }) => (
        <div className="h-full w-full flex justify-center items-center">
          <button
            className="h-8 w-20 bg-red-600 rounded text-black"
            onClick={() => setSelectedPoint(row.original)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const { data } = useQuery({
    queryKey: ["points table all data"],
    queryFn: PointsTableGetAll,
  });
  // data && console.log(data.data);

  return (
    <div>
      <Navtab menu={adminMenus} />
      <TableComponent data={data?.data || []} columns={columns} />
      {selectedPoint && (
          <PointEdit
            data={selectedPoint}
            onClose={() => setSelectedPoint(null)} 
          />
      )}
    </div>
  );
}

export default AdminPointsTable;
