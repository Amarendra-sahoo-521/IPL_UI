import { useMutation, useQuery } from "@tanstack/react-query";
import { fatchAllMatches, fetchMyHomeMatches, fetchMyMatches } from "./api";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { useEffect, useState } from "react";
import PaginationTab from "../Core_components/PaginationTab";
import Navtab from "../Core_components/Navtab";
import { menus } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

type Prop = {
  id?: number;
  homematch?: boolean;
};

function Matches({ id = 0, homematch = false }: Prop) {
  const [page, setPage] = useState(1);

  // Fetch data based on conditions
  const matchQuery = useQuery({
    queryKey: ["mymatches"],
    queryFn: () => fetchMyMatches(id),
    enabled: id !== 0 && !homematch,
  });

  const homeMatchQuery = useQuery({
    queryKey: ["myhomematches"],
    queryFn: () => fetchMyHomeMatches(id),
    enabled: id !== 0 && homematch,
  });

  const matchMutation = useMutation({
    mutationFn: (page: number) => fatchAllMatches(page),
  });
  const navigate = useNavigate();
  const goToMatchProfile = (id: number) => {
    navigate(`/matches/${id}`);
  };

  useEffect(() => {
    if (id === 0) {
      matchMutation.mutate(page);
    }
  }, [page, id]);

  const data =
    id === 0
      ? matchMutation.data
      : homematch
        ? homeMatchQuery.data
        : matchQuery.data;

  return (
    <div className="">
      {id === 0 && <Navtab menu={menus} />}
      {data && (
        <div className="sm:p-10 p-2 h-auto w-auto">
          <p className="bold font-medium text-xl sm:text-3xl">Matches</p>
          {data.map((item: any) => (
            <>
              <div
                className="mx-10 my-5 h-28 w-auto hidden sm:flex"
                key={item.id}
                style={{ borderBottom: "1px solid black", cursor: "pointer" }}
                onClick={() => goToMatchProfile(item.id)}
              >
                <div className="chl h-24 w-40 my-auto">
                  <span className="border border-orange-500 px-2 py-1">
                    {item.matchOrder}
                  </span>{" "}
                  <br />
                  <p className="mt-2 font-medium text-center">
                    {item.matchDate}
                  </p>
                  <p className="text-gray-700 scale-75 text-center">
                    {item.matchTime === "7:30 pm IST" ? (
                      <i className="fa-solid fa-moon text-gray-700"></i>
                    ) : (
                      <i className="fa-solid fa-sun text-black-700"></i>
                    )}
                    &nbsp;{item.matchTime}
                  </p>
                </div>
                <div className="chl h-24 w-1/2 mx-8 my-auto flex justify-between">
                  <div className="hometeam w-2/5 flex">
                    <img
                      src={`${BASE_URL}${
                        API_URL.TEAM.BANNER
                      }/${encodeURIComponent(item.hometeam_data.logo)}`}
                      alt=""
                      className="scale-50"
                      style={{ marginLeft: "-25px" }}
                    />
                    <p
                      className="my-auto scale-95"
                      style={{ marginLeft: "-20px" }}
                    >
                      {item.hometeam_data.name}
                    </p>
                  </div>
                  <p
                    className="my-auto bold font-medium text-xl"
                    style={{ fontStyle: "italic" }}
                  >
                    v/s
                  </p>
                  <div className="awaayteam w-2/5 flex justify-end">
                    <p
                      className="my-auto scale-95"
                      style={{ textAlign: "right" }}
                    >
                      {item.awayteam_data.name}
                    </p>
                    <img
                      src={`${BASE_URL}${
                        API_URL.TEAM.BANNER
                      }/${encodeURIComponent(item.awayteam_data.logo)}`}
                      alt=""
                      className="h-1/2 my-auto"
                    />
                  </div>
                </div>
                <div className="chl h-24 w-1/3 my-auto flex justify-center">
                  <p className="my-auto text-center bold font-medium">
                    {item.groundName}
                  </p>
                </div>
              </div>
              <div
                key={item.id}
                onClick={() => goToMatchProfile(item.id)}
                className="rounded-xl p-4 mx-3 my-3 block sm:hidden cursor-pointer active:scale-[0.98] transition-transform"
                style={{
                  background: "#0B1220",
                  border: "0.5px solid #2A3344",
                }}
              >
                {/* Top row: match order badge + date/time */}
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className="text-[11px] font-medium px-2.5 py-[3px] rounded-md"
                    style={{ border: "1px solid #EF9F27", color: "#FAC775" }}
                  >
                    Match {item.matchOrder}
                  </span>
                  <div className="text-right">
                    <p
                      className="text-[13px] font-medium m-0"
                      style={{ color: "#F1EFE8" }}
                    >
                      {item.matchDate}
                    </p>
                    <p
                      className="text-[11px] m-0 flex items-center justify-end gap-1"
                      style={{ color: "#B4B2A9" }}
                    >
                      <i
                        className={`fa-solid ${item.matchTime === "7:30 pm IST" ? "fa-moon" : "fa-sun"}`}
                        style={{ fontSize: "12px" }}
                      ></i>
                      {item.matchTime}
                    </p>
                  </div>
                </div>

                {/* Team vs team hero */}
                <div className="flex items-center justify-between py-2 pb-4">
                  <div className="flex flex-col items-center w-[38%] gap-2">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: "#1A2332",
                        border: "1px solid #2A3344",
                      }}
                    >
                      <img
                        src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                          item.hometeam_data.logo,
                        )}`}
                        alt={item.hometeam_data.name}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <p
                      className="text-[13px] font-medium text-center leading-tight m-0"
                      style={{ color: "#F1EFE8" }}
                    >
                      {item.hometeam_data.name}
                    </p>
                  </div>

                  <p
                    className="text-[15px] font-medium m-0"
                    style={{ fontStyle: "italic", color: "#888780" }}
                  >
                    v/s
                  </p>

                  <div className="flex flex-col items-center w-[38%] gap-2">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: "#1A2332",
                        border: "1px solid #2A3344",
                      }}
                    >
                      <img
                        src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                          item.awayteam_data.logo,
                        )}`}
                        alt={item.awayteam_data.name}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <p
                      className="text-[13px] font-medium text-center leading-tight m-0"
                      style={{ color: "#F1EFE8" }}
                    >
                      {item.awayteam_data.name}
                    </p>
                  </div>
                </div>

                {/* Ground */}
                <div
                  className="flex items-center justify-center gap-1.5 pt-2.5"
                  style={{ borderTop: "0.5px solid #2A3344" }}
                >
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ fontSize: "12px", color: "#888780" }}
                  ></i>
                  <p
                    className="text-[12px] text-center m-0"
                    style={{ color: "#B4B2A9" }}
                  >
                    {item.groundName}
                  </p>
                </div>
              </div>
            </>
          ))}
          {id === 0 && (
            <PaginationTab
              currentPage={page}
              totalResults={75}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Matches;
