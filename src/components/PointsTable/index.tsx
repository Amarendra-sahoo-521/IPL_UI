import { ColumnDef } from "@tanstack/react-table";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { image_path } from "../../utils/constats";
import { useQuery } from "@tanstack/react-query";
import { PointsTableGetAll } from "./api";
import TableComponent from "../Core_components/TanstackTable";

const columns: ColumnDef<any>[] = [
  {
    header: "Team",
    accessorKey: "team_data.short_name",
    cell: ({ row }) => (
      <div className="flex items-center justify-center" >
        <img
          src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(row.original.team_data?.logo)}`}
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
    header: "Last 5 Matches",
    accessorKey: "last_five_match",
    cell: ({ row }) => {
      const matchResults = row.original.last_five_match?.replace(/^,/, "").split(",").slice(-5) || [];
          return (
        <div className="flex justify-center items-center h-full">
          {[...Array(5)].map((_, index: number) => {
            const backgroundImage =
            matchResults[index] === "1"
                ? `url(${image_path.WIN})`
                : matchResults[index]  === "2"
                ? `url(${image_path.LOSE})`
                : matchResults[index]  === "3"
                ? `url(${image_path.DRAW})`
                : "";

            return (
              <div
                key={index}
                className="h-6 w-6 rounded-full border-2 border-black m-1"
                style={{
                  backgroundImage,
                  backgroundSize: "139% 139%",
                  backgroundPosition: "center",
                }}
              ></div>
            );
          })}
        </div>
      );
    },
  },
];
const PointsTable = () => {
  const { data } = useQuery({
    queryKey: ["pointstable"],
    queryFn: PointsTableGetAll,
    refetchOnWindowFocus:true
  });

  return (
    <div className="h-auto my-8 mx-11">
      <h2 className="text-3xl font-bold mb-5">POINTS TABLE</h2>
      <TableComponent data={data?.data || []} columns={columns} sortable={false}/>
    </div>
  );
};

export default PointsTable;
