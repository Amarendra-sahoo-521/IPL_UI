import { ColumnDef } from "@tanstack/react-table";
import { image_path } from "../../utils/constants";
import TableComponent from "../Core_components/TanstackTable";

const columns1: ColumnDef<any>[] = [
  { header: "No", id: "serial", cell: ({ row }) => row.index + 1 },
  {
    header: "Player",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.original?.photo ? row.original?.photo : image_path.DEFAULT_IMAGE}
          className="h-10 w-10"
        />
        <p className="ml-5">{row.original?.name}</p>
        {row.index === 0 && (
          <img src={image_path.ORANGE_CAP} alt="Extra Image" className="h-8 w-12 ml-2" style={{transform: 'scaleX(-1)'}} />
        )}
      </div>
    ),
  },
  { header: "Matches", accessorKey: "match_played" },
  { header: "runs", accessorKey: "runs" },
  { header: "strike rate", accessorKey: "strike_rate" },
];
const columns2: ColumnDef<any>[] = [
  { header: "No", id: "serial", cell: ({ row }) => row.index + 1 },
  {
    header: "Player",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.original?.photo ? row.original?.photo : image_path.DEFAULT_IMAGE}
          className="h-10 w-10"
        />
        <p className="ml-5">{row.original?.name}</p>
        {row.index === 0 && (
          <img src={image_path.PURPLE_CAP} alt="Extra Image" className="h-8 w-12 ml-2" style={{transform: 'scaleX(-1)'}}/>
        )}
      </div>
    ),
  },
  { header: "Matches", accessorKey: "match_played" },
  { header: "wickets", accessorKey: "wickets" },
  { header: "economy", accessorKey: "economy" },
];

interface capprops {
  data: any[];
  title: string;
}

function CapTable({ data, title }: capprops) {
  return (
    <div className="h-auto my-12 mx-11">
      <h2
        className="text-3xl font-bold mb-5"
        style={{ color: title == "ORANGE CAP LIST" ? "#ff8100" : "#7007b4" }}
      >
        {title}
      </h2>
      <TableComponent data={data || []} columns={ title == "ORANGE CAP LIST"? columns1:columns2} sortable={false}/>
    </div>
  );
}

export default CapTable;
