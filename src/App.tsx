import { useEffect, useState } from 'react'
import Heroheader from './components/Hero/Heroheader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from './components/Team';
function App() {
 
  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/" element={<Heroheader  />} />
        <Route path="/team/:id" element={<Team />} />
      </Routes>
    </Router>
    </>
  )
}



// function App() {
  

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>{data.title}</h2>
//       <p>{data.body}</p>
//     </div>
//   );
// }

export default App;


