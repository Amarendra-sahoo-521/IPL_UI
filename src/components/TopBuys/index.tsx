import {  useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTopPlayer } from "./api";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { formatToIndianShort } from "../../utils/functions";
import { image_path } from "../../utils/constats";

const ToptenCards = () => {
  
  const { data } = useQuery({
    queryKey: ["topBuy"],
    queryFn: getTopPlayer,
    
  });
  const array = data && data?.data;
  

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    array && (
      <div className="h-auto my-8 mx-11" style={{width:'97vw'}} >
        <h2 className="text-3xl font-bold ">TOP 10 BUYS</h2>
        <div className="h-80 w-auto flex items-center justify-start">
          {array.map((item: any, index: number) => (
            <div
              key={index}
              className="absolute pcard w-48 h-64 bg-white rounded-lg shadow-lg text-base font-bold "
              style={{
                zIndex: hoveredCard === index ? 20 : 10 - index,
                transform: `translateX(${index * 126}px) scale(${
                  hoveredCard === index ? 1.2 : 1
                })`,
                backgroundColor: item.team.them,
                border: "2px solid white",
                transition: "all 1s",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(
                  item?.team?.banner
                )}`}
                alt=""
                className="absolute h-10 left-36 "
              />
              <img
                src={
                  item?.photo
                    ? item?.photo
                    : image_path.DEFAULT_IMAGE
                }
                alt=""
                className="mt-5"
              />
              <p className="text-center absolute top-52 w-full">{formatToIndianShort(item?.sell_price)}</p>
              <p className="text-center absolute top-56 w-full">{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ToptenCards;
