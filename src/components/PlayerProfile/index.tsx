import { useParams } from "react-router-dom";
import Navtab from "../Core_components/Navtab";
import { image_path, menus } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getPlayerProfile } from "./api";
import { isLightColor } from "../../utils/functions";

function PlayerProfile() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["playerProfile"],
    queryFn: () => getPlayerProfile(id ?? ""),
  });
  console.log(data);

  return (
    data && (
      <div>
        <Navtab menu={menus} />
        <div
          className="cont w-screen flex justify-around "
          style={{ backgroundColor: data.data.team.them, height: "89.9vh" }}
        >
          <div
            className="h-full w-1/2 my-auto "
            style={{
              backgroundImage:
                "url(https://www.iplt20.com/assets/images/player-bomb-bg.svg)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="h-80 border-[10px] border-white w-80 mt-48 ml-60">
              <img
                src={data?.data?.photo ? data?.data?.photo :image_path.DEFAULT_IMAGE}
                alt=''
                style={{ 
                  transform: "scale(1.7) translateY(-35px)", 
                  zIndex: 2, 
                  marginTop: !data?.data?.photo ? '75px' :'',
                  marginLeft: !data?.data?.photo ? '70px' :''
                }}
              />
            </div>
            <div
              className="w-screen h-36 relative"
              style={{
                background: `linear-gradient(180deg,transparent, white )`,
                top: "-85px",
                zIndex: 0,
              }}
            >
              <div
                className="min-h-16 w-80 text-center font-bold text-4xl ml-60 flex align-middle justify-center"
                style={{
                  // backgroundColor: "#fff7",
                  position: "absolute",
                  marginTop: "60px",
                }}
              >
                <p
                  className="my-auto"
                  style={{
                    color: "#000",
                    // color: isLightColor(data.data.team.them) ? "#fff" : "#000",
                  }}
                >
                  {data?.data?.name}
                </p>
              </div>
            </div>
          </div>
          <div className="h-full  w-1/2 my-auto ">
            <div className="h-72 w-96 mt-48 ml-24 " style={{color: isLightColor(data?.data?.team?.them) ? "#fff" : "#000",}}>
              <p className="text-4xl font-bold mb-1">Player Overview</p>
              <div className="h-60 w-full  grid  grid-rows-2 ">
                <div className="text-center pt-5 border-t-2 border-black">
                  
                  <p className="text-3xl font-semibold">
                    {data?.data?.designation == 1
                      ? "Batsman"
                      : data?.data?.designation == 2
                      ? "Boller"
                      : "All Rounder"}
                  </p>
                  Specialization
                </div>
                <div className="flex">
                  <div className=" w-1/2 text-center ">
                  <p className="text-3xl font-semibold">{data?.data?.debut_year}</p>
                  IPL Debut
                  </div>
                  <div className=" w-1/2 text-center ">
                  <p className="text-3xl font-semibold">{data?.data?.from}</p>
                  Nationality 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PlayerProfile;
