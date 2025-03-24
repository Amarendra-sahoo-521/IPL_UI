import { useMutation } from "@tanstack/react-query";
import { image_path, menus } from "../../utils/constats";
import Navtab from "../Core_components/Navtab";
import { fetchPlayerData } from "./api";
import { useEffect, useState } from "react";
import PaginationTab from "../Core_components/PaginationTab";
import Dropdown from "../Core_components/Dropdown";
import Input from "../Core_components/Input";
import { ColumnDef } from "@tanstack/react-table";
import { formatToIndianShort } from "../../utils/functions";
import TableComponent from "../Core_components/TanstackTable";
// import Button from "../Core_components/Button"

function Player() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [payload, setpayload] = useState("");
  const [inVall, setInVall] = useState("");

  const { mutate, data } = useMutation({
    mutationFn: ({ page, payload }: { page: number; payload: string }) =>
      fetchPlayerData(page, payload),
  });
  useEffect(() => {
    mutate({ page, payload });
  }, [page, payload]);

  const columns: ColumnDef<any>[] = [
    {
      header: "name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="px-6 flex justify-start items-end">
          <img
            src={
              row.original.photo ? row.original.photo : image_path.DEFAULT_IMAGE
            }
            alt={row.original.name}
            className="h-10 w-10"
          />
          <p>{row.original.name}</p>
        </div>
      ),
    },
    {header:'skill',accessorKey:'designation',
      cell:({row})=>{
        const designationMap: Record<number, string> = {
          1: "Batsman",
          2: "Bowler",
          3: "All Rounder",
        };
  
        return designationMap[row.original.designation] ;
    }},
    { header: "team", accessorKey: "team.short_name" },
    { header: "Sell Price", accessorKey: "sell_price",
      cell:({row})=>{
        return formatToIndianShort(row.original.sell_price)
      }
     },

  ];

  const option = [
    { value: "name", label: "name" },
    { value: "skill", label: "skill" },
  ];
  const option2 = [
    { value: "1", label: "Batter" },
    { value: "2", label: "Boller" },
    { value: "3", label: "All Rounder" },
  ];
  const selectDb = (e: any) => {
    // console.log(e.target.value);
    setType(e.target.value);
    setInVall("");
  };
  const callByskill = (e: any) => {
    // console.log(`url :: &skill=${e.target.value}`);
    setpayload(`&skill=${e.target.value}`);
    setPage(1);
  };
  const callByname = (e: any) => {
    // console.log(`url :: &name=${e.target.value}`);
    setInVall(e.target.value);
    setpayload(`&name=${e.target.value}`);
    setPage(1);
  };

  // data && console.log(data);

  return (
    <>
      <Navtab menu={menus} />
      <div className="form w-[90%] mx-auto flex bg-gray-100 h-40 px-10 py-5">
        <div className="sildiv w-1/4">
          <Dropdown
            label="Filter By"
            name="criteria"
            options={option}
            onChange={(e) => selectDb(e)}
          />
        </div>
        <div className="div w-1/4 mx-5">
          {type === "skill" ? (
            <Dropdown
              label="Skill"
              name="skill"
              options={option2}
              onChange={(e) => callByskill(e)}
            />
          ) : (
            type === "name" && (
              <Input
                label="Name"
                name="Name"
                value={inVall}
                placeholder="Player name"
                onChange={(e) => callByname(e)}
              />
            )
          )}
        </div>
        {/* {['skill','name'].includes(type) && <div className="div w-1/4 mx-5 my-8">
      <Button label="Search" onClick={submit} /></div>} */}
      </div>
      <div>
        {data && (
          <>
            {/* <Table ths={ths} tds={data.data} /> */}
            <TableComponent data={data?.data || []} columns={columns} navigateTo={(row) => `/player/${row.id}`} />

            <PaginationTab
              currentPage={page}
              totalResults={data.totaldata}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Player;
