import {  useState } from "react";
import { adminMenus } from "../../../../utils/constants"
import Navtab from "../../../Core_components/Navtab"
import TableComponent from "../../../Core_components/TanstackTable";
import { fatchAdminMatches,  } from "../../../matches/api";
import {  useQuery } from "@tanstack/react-query";
import { API_URL, BASE_URL } from "../../../../utils/endpoint";
import { ColumnDef } from "@tanstack/react-table";
import MatchEdit from "../MatchEdit";

function AdminMatches() {
    
    const columns: ColumnDef<any>[] = [
      { header: "match no", accessorKey: "id" },
      {
        header: "home team",
        cell: ({ row }) => (
          <div className="h-8  flex justify-center" style={{backgroundColor: row.original.wonTeam == row.original.homeTeam ? 'green':''}}>
            <img
              src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                row.original.hometeam_data.logo
              )}`}
              alt=""
              className="mx-2"
              style={{ marginLeft: "-25px" }}
            />
            <p className="my-auto " >
              {row.original.hometeam_data.short_name}
            </p>
          </div>
        ),
      },
      {
        header: "away team",
        cell: ({ row }) => (
            <div className="h-8  flex justify-center" style={{backgroundColor: row.original.wonTeam == row.original.awayTeam ? 'green':''}}>
            <p
              className=" my-auto"
              style={{ textAlign: "right" }}
            >
              {row.original.awayteam_data.short_name}
            </p>
            <img
              src={`${BASE_URL}${
                API_URL.TEAM.BANNER
              }/${encodeURIComponent(row.original.awayteam_data.logo)}`}
              alt=""
              className=" mx-2"
            />
          </div>
        ),
      },
      { header: "action", cell:({row})=>(
        <div className="h-full w-full flex justify-center items-center">
          <button 
          className="h-8 w-20 bg-red-600 rounded text-black"
          onClick={()=>(
            setSelectedMatch(row.original)
          )
          }
          >Edit</button>
        </div>
      ) },
    ];
      const [selectedMatch, setSelectedMatch] = useState(null);

      const {data} = useQuery({
        queryKey:['admin match all'],
        queryFn:fatchAdminMatches
      })
      
  return (
    <div>
      <Navtab menu={adminMenus} />
      <TableComponent data={data || []} columns={columns} />
      {selectedMatch && (
          <MatchEdit
            data={selectedMatch}
            onClose={() => setSelectedMatch(null)} 
          />
      )}
    </div>
  );
}
export default AdminMatches
