import { useNavigate } from "react-router-dom";
import { image_path } from "../../utils/constants";

type prop = {
    title:string,
    players: any[]
}
function SquardSection({title, players}:prop) {
console.log(players);

  const navigate = useNavigate();

  const handleClick = (id:number) => {
    navigate(`/player/${id}`);  
  };
  return (
    <>
    <div className="h-auto w-auto  m-10">
      <h2 className="text-3xl font-medium">{title}</h2>
      <div className="pcont flex flex-wrap px-3">
      {players.map((item:any)=>(
        <div 
        className="card h-72 w-60 m-2 text-center bg-white border border-black cursor-pointer"
        key={item.id}
        onClick={()=>handleClick(item.id)}
        > 
        
       {item?.from != "India"  && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" style={{position:'absolute',transform:'scale(1.2)',margin:'3px'}} />}
             <img
                  src={
                    item.photo
                      ? item.photo
                      : image_path.DEFAULT_IMAGE
                  }
                  alt={item.name}
                  className="h-60  mx-auto"
                  
                />

            <p 
            className="name text-xl h-12 py-2 font-medium overflow-hidden"
            >{item.name}</p>
        </div>
      ))}
      </div>
    </div>
    </>
  )
}

export default SquardSection
