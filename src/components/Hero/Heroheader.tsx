import { getorangecap, getPostt, getPurpolCap } from "./api";
import { useQuery } from "@tanstack/react-query";
import SmoothOverlapSlider from "./Hero";
import Navtab from "../Core_components/Navtab";
import { menus } from "../../utils/constants";
import ToptenCards from "../TopBuys";
import PointsTable from "../PointsTable";
import CapTable from "../Cap";
import Loader from "../loader";

function Heroheader() {
  const { data: postData1, isLoading: loading1 } = useQuery({
    queryKey: ["post"],
    queryFn: getPostt,
  });
  const { data: postData2, isLoading: loading12 } = useQuery({
    queryKey: ["orangecap"],
    queryFn: getorangecap,
  });
  const { data: postData3, isLoading: loading13 } = useQuery({
    queryKey: ["purpulcap"],
    queryFn: getPurpolCap,
  });

  if (loading1 || loading12 || loading13) {
    return (
      <Loader fullScreen /> 
    );
  }

  return (
    <div className="w-full  overflow-hidden" style={{ overflowX: "hidden" }}>
      <Navtab menu={menus} />
      {postData1 && (
        <SmoothOverlapSlider cards={postData1.data} autoPlayInterval={5000} />
      )}
      <ToptenCards />
      <PointsTable />
      {postData2 && <CapTable data={postData2.data} title="ORANGE CAP LIST" />}
      {postData3 && <CapTable data={postData3.data} title="PURPLE CAP LIST" />}
    </div>
  );
}

export default Heroheader;
