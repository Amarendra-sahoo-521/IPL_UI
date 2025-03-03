import Heroheader from './components/Hero/Heroheader';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Team from './components/Team';
import { NavbarProvider } from "./context/navbarcontext";
function App() {
 
  return (
    <>
    <NavbarProvider >
      <Router>
      <Routes>
        <Route path="/" element={<Heroheader  />} />
        <Route path="/team/:id" element={<Team />} />
      </Routes>
    </Router>
    </NavbarProvider>
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


