import { useQuery } from "@tanstack/react-query";
import { fetchMyHomeMatches, fetchMyMatches } from "./api";
import { API_URL, BASE_URL } from "../../utils/endpoint";

type prop = {
  id: number;
  homematch :boolean;
  
};
function Matches({ id, homematch }: prop) {
  
  const { data } = !homematch ?  useQuery({
    queryKey: ["mymatches"],
    queryFn: () => fetchMyMatches(id),
  }) : useQuery({
    queryKey: ["myhomematches"],
    queryFn: () => fetchMyHomeMatches(id),
  });
  data && console.log('match api data--->',data);

  return (
    <>
      {data && (
        <div className="m-10 h-auto w-auto">
          <p className="bold font-medium text-3xl">Matches</p>
          {data.map((item: any) => (
            <div className="mx-10 my-5 h-28 w-auto  flex" key={item.id} style={{borderBottom:'1px solid black'}}>
              <div className="chl h-24 w-40 my-auto">
                <span className="border border-orange-500 px-2 py-1 ">
                  {item.matchOrder}
                </span>{" "}
                <br />
                <p className="mt-2 font-medium text-center">{item.matchDate}</p>
                <p className=" text-gray-700 scale-75 text-center">
                  {item.matchTime == "7:30 pm IST" ? (
                    <i
                      className="fa-solid fa-moon text-gray-700"
                     
                    ></i>
                  ) : ( 
                    <i
                      className="fa-solid fa-sun text-black-700"
                      
                    ></i>
                  )}&nbsp;{item.matchTime}
                </p>
              </div>
              <div className="chl h-24 w-1/2  mx-8 my-auto flex justify-between">
              <div className="hometeam  w-2/5  flex ">
              <img src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                              item.hometeam_data.logo
                            )}`} 
              alt="" 
              className="scale-50"
              style={{marginLeft:'-25px'}}
              />
              <p className="my-auto scale-95"
              style={{marginLeft:'-20px'}}
              >{item.hometeam_data.name}</p>
              </div>
              <p className="my-auto bold font-medium text-xl"
              style={{fontStyle:'italic'}}
              >v/s</p>
              <div className="awaayteam  w-2/5  flex justify-end">
              <p className="my-auto scale-95 "
              style={{textAlign:'right'}}
              >{item.hometeam_data.name}</p>
              <img src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                              item.awayteam_data.logo
                            )}`} 
              alt="" 
              className="h-1/2 my-auto"
              style={{}}
              />
              </div>
              </div>
              <div className="chl h-24 w-1/3  my-auto  flex justify-center">
                <p className="my-auto text-center bold font-medium">
                  {item.groundName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Matches;
