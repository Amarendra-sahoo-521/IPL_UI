import { useEffect } from 'react';
import { useNavbar } from '../../context/navbarcontext';
import { isLightColor } from '../../utils/functions';
type prop = {
bgc:string
}
const NavBar = ({bgc}:prop) => {
    const { activeItem, setActiveItem } = useNavbar();  
    useEffect(()=>{
      setActiveItem('SQUAD')
    },[])
  const navItems = [
    'SQUAD',
    'FIXTURES',
    'HOMEGAME',
     'VIDEOS',
    // 'NEWS',
    // 'ARCHIVE'
  ];
  const colortype = isLightColor(bgc);
  const handleClick = (item:string) => {
    setActiveItem(item);
  };
  
  return (
    <>
    <div className="w-auto  flex justify-center py-2">
      <div className="mx-auto">
        <nav className="flex items-center rounded-lg overflow-hidden h-10" style={{backgroundColor: '#00091a'}}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`px-4 py-1 font-medium text-sm transition-colors ${
                activeItem === item
                  ? ' rounded-lg mx-1'
                  : 'text-gray-300 hover:text-white mx-1'
              }`}
              style={{backgroundColor: activeItem === item ? bgc ? bgc : 'blue' : '#00091a',
                color : activeItem === item ? colortype ? '#fff' : '#000' : '#fff'
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </div>
    
    </>
  );
};

export default NavBar;