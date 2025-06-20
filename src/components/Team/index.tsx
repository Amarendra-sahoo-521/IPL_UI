import { useMutation } from "@tanstack/react-query";
import {  useParams } from "react-router-dom";
import { fetchCardDetails } from "./api";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { isLightColor } from "../../utils/functions";
import { useEffect, useState } from "react";
import SquardSection from "../SquardSection";
import Matches from "../matches";
import NavBar from "../Navbar";
import { useNavbar } from "../../context/navbarcontext";
import Navtab from "../Core_components/Navtab";
import { image_path, menus } from "../../utils/constants";

function Team() {
  const { id } = useParams();
  const [idd, setIdd] = useState(id && parseInt(id));
  const { activeItem } = useNavbar();

  // api calls
  const { mutate, data } = useMutation({
    mutationFn: (id: number) => fetchCardDetails(id),
  });
  useEffect(() => {
    if (idd) {
      mutate(idd);
    }
  }, [idd]);
  if (data) {
    const res = data.data;

    // local storage variable
    let allData: any = localStorage.getItem("allData");
    if (allData) {
      allData = JSON.parse(allData);
    }
    allData = allData.filter((item: any) => item.id != res.id);

    // console.log(res);

    // variable innitialization
    const trophy = res.winning_year ? res.winning_year.split(",") : [];
    const font = isLightColor(res.them);
    const batter = res.players.filter((item: any) => item.designation == 1);
    const bowler = res.players.filter((item: any) => item.designation == 2);
    const allRounder = res.players.filter((item: any) => item.designation == 3);
    return (
      <>
        <Navtab menu = {menus}/>
        <div className="pannel h-24 w-full left-0 top-0 flex justify-evenly bg-[#bddad295]">
          {allData &&
            allData.map((item: any, index: number) => (
              <div
                key={index}
                className="h-20 w-20 bg-black m-2 rounded-md cursor-pointer capimg"
                style={{
                  backgroundImage: `url(${BASE_URL}${
                    API_URL.TEAM.BANNER
                  }/${encodeURIComponent(item.banner)})`,
                  backgroundSize: "cover",
                  backgroundColor: item.them,
                }}
                onClick={() => setIdd(item.id)}
              ></div>
            ))}
        </div>
        <div
          className="maincont h-72 w-full flex justify-evenly "
          style={{
            // background: `linear-gradient(90deg, ${res.them},${res.them},${res.them} , white )`,
            background: `linear-gradient(55deg, ${res.them} 70%, rgba(255, 255, 255, 0.8) 30%)`,
            color: font ? "#fff" : "#000",
            // height: '350px'
          }}
        >
          <div className="left  h-72 w-1/2 my-auto flex ">
            <img
              src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                res.logo
              )}`}
              // src='https://documents.iplt20.com/ipl/IPLHeadshot2024/102.png'
              alt="logo"
              className="h-40 w-40 my-auto ml-16 coin"
              style={{ transformStyle: "preserve-3d" }}
            />

            <div className="right my-auto">
              <h1 className="text-5xl font-bold">{res.name}</h1>
              <p className="flex mt-2 h-16 w-auto overflow-hidden">
                {trophy.map((item: any, index: number) => (
                  <img
                    key={index}
                    src="https://www.iplt20.com/assets/images/teams-trophy.svg"
                    alt={item}
                    title={item}
                    className="cup h-16 w-12 mx-1"
                  />
                ))}

                {/* <span className='mt-4 text-xl font-bold  '>{res.winning_year} </span> */}
              </p>
            </div>
          </div>
          <div className="right flex  h-72 w-1/2  my-auto ">
            <div className="cont h-48 w-80  my-12 ml-2 mr-24 ">
              <div className="row h-16  w-full mt-16   ">
                <p className="  mx-auto font-bold text-2xl text-center ">
                  Home Ground :
                </p>
                <p className="   font-bold text-2xl text-center">
                  {" "}
                  {res.venue}
                </p>
              </div>
              <div className="cap flex">
                <p className="  mx-auto font-bold text-2xl text-center">
                  Captain
                </p>
                <i
                  className="fa-solid fa-arrow-right fa-flip text-3xl "
                  style={{ marginTop: "5px", marginLeft: "5px " }}
                ></i>
              </div>
            </div>
            {/* captain image section */}
            <div className="cont h-48 w-52   my-12 ">
              <div className="capimg h-auto w-auto ">
                <img
                  src={
                    res?.captainData?.photo
                      ? res?.captainData?.photo
                      : image_path.DEFAULT_IMAGE
                  }
                  alt={res?.captainData?.name}
                />
              </div>
              <div className="capname h-10 w-52 flex justify-center flex-wrap items-center text-2xl font-bold text-black ">
                <p>{res.captainData.name}</p>
              </div>
            </div>
          </div>
        </div>
        <NavBar bgc={res.them}/>
        {activeItem == "SQUAD" ? (
          <div className="body">
            {batter.length > 0 && (
              <SquardSection title="Batter" players={batter} />
            )}
            {allRounder.length > 0 && (
              <SquardSection title="All Rounder" players={allRounder} />
            )}
            {bowler.length > 0 && (
              <SquardSection title="Bowler" players={bowler} />
            )}
          </div>
        ) : activeItem == "FIXTURES" ? (
          <div className="matches">
            <Matches id={res.id} homematch={false}  />
          </div>
        ) : activeItem == "HOMEGAMES" ? (
          <div className="matches">
            <Matches id={res.id} homematch={true} />
          </div> ): null}
      </>
    );
  }
}

export default Team;
