import { useParams } from "react-router-dom"
import { menus } from "../../utils/constants";
import Navtab from "../Core_components/Navtab"
import { useQuery } from "@tanstack/react-query";
import { fetchMatchDetails } from "./api";
import { Scale } from "lucide-react";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { image_path } from "../../utils/constants";


function MatchProfile() {
    const {id} = useParams();
    let {data} = useQuery({
        queryKey:['match details'],
        queryFn: () => id && fetchMatchDetails(parseInt(id))
    })
    data= data &&  data.data;
    data && console.log(data);
  return (
    <div>
        <Navtab menu={menus} />
      {data && 
      <div className=" w-screen text-white flex" style={{height: "89.9vh" ,
        background: `linear-gradient(90deg, ${data?.hometeam_data?.them},${data?.hometeam_data?.them},${data?.hometeam_data?.them},${data?.awayteam_data?.them},${data?.awayteam_data?.them},${data?.awayteam_data?.them} )`
      }}>
        <div className="absolute top-36 left-[645px] text-3xl font-bold p-2" >{data?.matchOrder}</div>
        <div className="absolute top-60 left-[635px] text-8xl font-extrabold p-2 text-white" >VS</div>
        <div className="absolute bottom-40 left-[545px] text-lg font-semibold p-2 h-24 w-80 text-center" >
          <p>{data?.groundName}</p> 
          <p>{data?.matchDate},&nbsp;{data?.matchTime}</p>
          </div>
        <div className="absolute bottom-8 left-[470px] w-[480px] h-36" >
          <div className="h-1/2  w-full flex justify-between items-center ">
          <div className="font-bold text-3xl">{data?.homeTeamScore}</div>
          <div className="font-bold text-3xl">{data?.awayTeamScore}</div>
          </div>
          <div className="text-center text-lg font-semibold">{data?.win_desc}</div>
        </div>
        <div className="h-full w-1/2 ">
        <img src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(data?.hometeam_data?.banner)}`} alt="" className="h-28 w-28"/>
        <div className="absolute  h-72 w-56 top-60 left-52 text-center">
          <img src={data?.home_team_captain?.photo} style={{transform:'Scale(1.8)'}} /> 
          <h2 className="z-10 mt-24 font-bold text-5xl">{data?.hometeam_data?.short_name}</h2>
        </div>

        </div>
        <div className="h-full w-1/2 ">
        <img src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(data?.awayteam_data?.banner)}`} alt="" className="h-28 w-28 absolute right-0"/>
        <div className="absolute  h-72 w-56 top-60 right-52 text-center">
          <img src={data?.away_team_captain?.photo ? data?.away_team_captain?.photo : image_path?.DEFAULT_IMAGE} style={{transform:'Scale(1.8)'}} /> 
          <h2 className="z-10 mt-24 font-bold text-5xl">{data?.awayteam_data?.short_name}</h2>
        </div>

        </div>
      </div>
      }
    </div>
  )
}

export default MatchProfile
