import { getorangecap, getPostt, getPurpolCap } from './api';
import { useQuery } from '@tanstack/react-query';
import SmoothOverlapSlider from './Hero';
import Navtab from '../Core_components/Navtab';
import { image_path, menus } from '../../utils/constants';
import ToptenCards from '../TopBuys';
import PointsTable from '../PointsTable';
import CapTable from '../Cap';
import TanStackTableApiExample from '../Core_components/TanstackTable';

function Heroheader() {

    const { data: postData1 } = useQuery({
        queryKey: ["post"],  
        queryFn: getPostt,
      });
    const { data: postData2 } = useQuery({
        queryKey: ["orangecap"],  
        queryFn: getorangecap,
      });
    const { data: postData3 } = useQuery({
        queryKey: ["purpulcap"],  
        queryFn: getPurpolCap,
      });

    const orange_cap_ths = [
      'No',
      'Player',
      'Matches',
      'Runs',
      'Strike Rate'
    ]
    const purple_cap_ths = [
      'No',
      'Player',
      'Matches',
      'Wickets',
      'Economy'
    ]
     
      
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navtab menu = {menus}/>
      {postData1 && <SmoothOverlapSlider cards={postData1.data}  autoPlayInterval = {5000} />}
      <ToptenCards />
      <PointsTable />
      {postData2 && <CapTable data={postData2.data} title="ORANGE CAP LIST"/>}
      {postData3 && <CapTable data={postData3.data} title="PURPLE CAP LIST"/>}
    </div>
  )
}

export default Heroheader
