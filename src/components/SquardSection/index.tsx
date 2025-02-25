
type prop = {
    title:string,
    players: any[]
}
function SquardSection({title, players}:prop) {
  return (
    <>
    <div className="h-auto w-auto  m-10">
      <h2 className="text-3xl font-medium">{title}</h2>
      <div className="pcont flex flex-wrap px-3">
      {players.map((item:any)=>(
        <div 
        className="card h-72 w-60 m-2 text-center bg-white border border-black"
        key={item.id}
        >
             <img
                  src={
                    item.photo
                      ? item.photo
                      : "https://www.iplt20.com/assets/images/default-headshot.png"
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
