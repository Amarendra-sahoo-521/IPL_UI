import  { useState, useEffect, CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL, BASE_URL } from '../../utils/endpoint';
import { useNavigate } from 'react-router-dom';
import { isLightColor } from '../../utils/functions';

interface CustomCSSProperties extends CSSProperties {
    // Add any custom properties if needed
    transition?: string; // Optional if you want to define specific transitions
  }
 


type SmoothOverlapSliderProps = {
  cards: any[];
  title?: string;
  autoPlayInterval?: number;
};

const SmoothOverlapSlider = ({ cards, title, autoPlayInterval}: SmoothOverlapSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  
  localStorage.setItem("allData", JSON.stringify(cards));

 
  const navigate = useNavigate();

  const handleClick = (id:number) => {
    navigate(`/team/${id}`);  
  };
  

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

   

  // Helper function to get card at specific position relative to current index
  const getCardAtOffset = (offset: number) => {
    const index = (currentIndex + offset + cards.length) % cards.length;
    
    return cards[index];
  };

  // Determine card classes and styles based on position
  const getCardStyles = (offset: number) => {
    if (offset === 0) {
      return {
        transform: 'scale(1.2)',
        zIndex: 20,
        opacity: 1,
        position: 'relative'
      };
    }
    
    if (offset === -1) {
      return {
        transform: 'translateX(-50%) scale(0.8)',
        zIndex: 10,
        opacity: 0.6,
        position: 'absolute',
        left: 0
      };
    }
    
    if (offset === 1) {
      return {
        transform: 'translateX(50%) scale(0.8)',
        zIndex: 10,
        opacity: 0.6,
        position: 'absolute',
        right: 0
      };
    }
    
    return {
      opacity: 0,
      display: 'none'
    };
  };


  return (
    <div className="w-screen py-8 bg-[#bddad295] overflow-hidden top-16 ">
      <div className="container relative ">
      
        <button 
          onClick={handlePrev} 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 hover:bg-black/70"
        >
          <ChevronLeft color="white" size={24} />
        </button>
        
        <button 
          onClick={handleNext} 
          className="absolute -right-[125px] top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 hover:bg-black/70"
        >
          <ChevronRight color="white" size={24} />
        </button>

        {/* Slider Container */}
        <div className="flex items-center justify-center w-screen relative h-96  ">
          {/* Render cards with dynamic positioning */}
          {[...Array(3)].map((_, i) => {
            const card:any = getCardAtOffset(i - 1); 
            const cardStyles = getCardStyles(i - 1);
            const font = isLightColor(card.them);
            // console.log('font----------->',font);
            
            
            
            return (
              <div 
                key={card.id}
                className="absolute w-full flex justify-center transition-all duration-500 ease-in-out " style={{
                    ...cardStyles,
                    transition: 'all 500ms ease-in-out'
                  } as CustomCSSProperties} 
              >
               
                <div className="w-2/5 h-56 cursor-pointer rounded-xl overflow-hidden shadow-2xl" 
                onClick={()=>handleClick(card.id)}
                style={{backgroundColor: card.them, }}
                >
                  <img 
                  src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(card.banner)}`}
                  alt= {card.name}
                 
                  className="w-40 h-40 mx-auto overflow-hidden object-cover"  /> 
                  <div className="p-4 w-full  flex justify-center">
                    <h2 className="text-black font-bold text-2xl" style={{color: font ? "#fff" : "#000",}} >
                      {card.name}
                    </h2>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SmoothOverlapSlider