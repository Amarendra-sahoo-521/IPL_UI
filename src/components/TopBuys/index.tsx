import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTopPlayer } from "./api";
import { API_URL, BASE_URL } from "../../utils/endpoint";
import { formatToIndianShort } from "../../utils/functions";
import { image_path } from "../../utils/constants";

const ToptenCards = () => {
  const { data } = useQuery({
    queryKey: ["topBuy"],
    queryFn: getTopPlayer,
  });
  const array = data && data?.data;

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    array && (
      <div className="h-auto my-8 mx-2 sm:mx-11">
        <h2 className="text-3xl font-bold">TOP 10 BUYS</h2>

        {/* Scrollable row container */}
        <div
          className="flex overflow-x-auto overflow-y-visible items-center gap-3 py-10 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {array.map((item: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 relative w-48 h-64 bg-white rounded-lg shadow-lg text-base font-bold"
              style={{
                zIndex: hoveredCard === index ? 20 : 10 - index,
                backgroundColor: item.team.them,
                border: "2px solid white",
                transform: hoveredCard === index ? "scale(1.2)" : "scale(1)",
                transition: "all 0.3s",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Team banner */}
              <img
                src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(item?.team?.banner)}`}
                alt=""
                className="absolute h-10 right-2 top-2"
              />

              {/* Player photo */}
              <img
                src={item?.photo ? item?.photo : image_path.DEFAULT_IMAGE}
                alt=""
                className="mt-5 w-full object-contain"
              />

              {/* Price & name — positioned inside the card, not outside */}
              <p className="text-center absolute bottom-6 w-full text-sm">
                {formatToIndianShort(item?.sell_price)}
              </p>
              <p className="text-center absolute bottom-1 w-full text-sm truncate px-1">
                {item?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ToptenCards;
