import { useParams } from "react-router-dom";
import { menus } from "../../utils/constants";
import Navtab from "../Core_components/Navtab";
import { useQuery } from "@tanstack/react-query";
import { fetchMatchDetails } from "./api";
import { Scale } from "lucide-react";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { image_path } from "../../utils/constants";

function MatchProfile() {
  const { id } = useParams();
  let { data } = useQuery({
    queryKey: ["match details"],
    queryFn: () => id && fetchMatchDetails(parseInt(id)),
  });
  data = data && data.data;
  data && console.log(data);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navtab menu={menus} />
      {data && (
        <>
          <div
            className=" w-screen text-white hidden sm:flex"
            style={{
              height: "89.9vh",
              background: `linear-gradient(90deg, ${data?.hometeam_data?.them},${data?.hometeam_data?.them},${data?.hometeam_data?.them},${data?.awayteam_data?.them},${data?.awayteam_data?.them},${data?.awayteam_data?.them} )`,
            }}
          >
            <div className="absolute top-36 left-[645px] text-3xl font-bold p-2">
              {data?.matchOrder}
            </div>
            <div className="absolute top-60 left-[635px] text-8xl font-extrabold p-2 text-white">
              VS
            </div>
            <div className="absolute bottom-40 left-[545px] text-lg font-semibold p-2 h-24 w-80 text-center">
              <p>{data?.groundName}</p>
              <p>
                {data?.matchDate},&nbsp;{data?.matchTime}
              </p>
            </div>
            <div className="absolute bottom-8 left-[470px] w-[480px] h-36">
              <div className="h-1/2  w-full flex justify-between items-center ">
                <div className="font-bold text-3xl">{data?.homeTeamScore}</div>
                <div className="font-bold text-3xl">{data?.awayTeamScore}</div>
              </div>
              <div className="text-center text-lg font-semibold">
                {data?.win_desc}
              </div>
            </div>
            <div className="h-full w-1/2 ">
              <img
                src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(data?.hometeam_data?.banner)}`}
                alt=""
                className="h-28 w-28"
              />
              <div className="absolute  h-72 w-56 top-60 left-52 text-center">
                <img
                  src={data?.home_team_captain?.photo}
                  style={{ transform: "Scale(1.8)" }}
                />
                <h2 className="z-10 mt-24 font-bold text-5xl">
                  {data?.hometeam_data?.short_name}
                </h2>
              </div>
            </div>
            <div className="h-full w-1/2 ">
              <img
                src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(data?.awayteam_data?.banner)}`}
                alt=""
                className="h-28 w-28 absolute right-0"
              />
              <div className="absolute  h-72 w-56 top-60 right-52 text-center">
                <img
                  src={
                    data?.away_team_captain?.photo
                      ? data?.away_team_captain?.photo
                      : image_path?.DEFAULT_IMAGE
                  }
                  style={{ transform: "Scale(1.8)" }}
                />
                <h2 className="z-10 mt-24 font-bold text-5xl">
                  {data?.awayteam_data?.short_name}
                </h2>
              </div>
            </div>
          </div>
          <div
            className="w-screen sm:hidden flex flex-col text-white pt-2 bg-[#1A1F2B]"
            // style={{ minHeight: "100vh" }}
          >
            {/* Top: two team panels side by side */}
            <div className="flex">
              {/* Home team */}
              <div
                className="flex-1 flex flex-col items-center px-2 pt-5 pb-4"
                style={{ background: data?.hometeam_data?.them }}
              >
                <img
                  src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                    data?.hometeam_data?.banner,
                  )}`}
                  alt=""
                  className="h-9 w-9 self-start"
                />
                {/* <div className="h-24 w-24 mt-2 rounded-full overflow-hidden flex items-end justify-center bg-black/10"> */}
                <img
                  src={data?.home_team_captain?.photo}
                  alt=""
                  className="h-24 w-24"
                  style={{ transform: "scale(1.15)" }}
                />
                {/* </div> */}
                <h2 className="mt-2 font-bold text-lg">
                  {data?.hometeam_data?.short_name}
                </h2>
                <p className="mt-1 font-semibold text-base">
                  {data?.homeTeamScore}
                </p>
              </div>

              {/* Away team */}
              <div
                className="flex-1 flex flex-col items-center px-2 pt-5 pb-4"
                style={{ background: data?.awayteam_data?.them }}
              >
                <img
                  src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                    data?.awayteam_data?.banner,
                  )}`}
                  alt=""
                  className="h-9 w-9 self-end"
                />
                {/* <div className="h-24 w-24 mt-2 rounded-full overflow-hidden flex items-end justify-center bg-black/10"> */}
                <img
                  src={
                    data?.away_team_captain?.photo
                      ? data?.away_team_captain?.photo
                      : image_path?.DEFAULT_IMAGE
                  }
                  alt=""
                  className="h-24 w-24"
                  style={{ transform: "scale(1.15)" }}
                />
                {/* </div> */}
                <h2 className="mt-2 font-bold text-lg">
                  {data?.awayteam_data?.short_name}
                </h2>
                <p className="mt-1 font-semibold text-base">
                  {data?.awayTeamScore}
                </p>
              </div>
            </div>

            {/* Bottom: match info band */}
            <div className="bg-[#1A1F2B] px-4 py-4 flex-1">
              <div className="flex justify-center mb-2">
                <span className="text-xs font-medium text-gray-300 border border-gray-600 px-2 py-0.5 rounded-md">
                  {data?.matchOrder}
                </span>
              </div>

              <p className="text-sm font-medium text-center mb-1">
                {data?.groundName}
              </p>
              <p className="text-xs text-gray-400 text-center mb-3">
                {data?.matchDate}, {data?.matchTime}
              </p>

              <p className="text-sm font-medium text-amber-400 text-center">
                {data?.win_desc}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MatchProfile;
