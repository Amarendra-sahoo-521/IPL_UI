import Heroheader from "../components/Hero/Heroheader";
import Matches from "../components/matches";
import Player from "../components/Player";
import Team from "../components/Team";
import { NavbarProvider } from "../context/navbarcontext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APP_PATH } from "../utils/constants";
import AdminDashboard from "../components/Admin/Player/AdminPlayer";
import AdminMatches from "../components/Admin/Match/AdminMatch";
import AdminPointsTable from "../components/Admin/PointsTable/AdminPointsTable";
import PlayerProfile from "../components/PlayerProfile";
import MatchProfile from "../components/MatchProfile";


function AppRoute() {
  return (
      <NavbarProvider >
      <Router>
      <Routes>
        <Route path={APP_PATH.HERO} element={<Heroheader  />} />
        <Route path={APP_PATH.TEAM} element={<Team />} />
        <Route path={APP_PATH.PLAYER} element={<Player />} />
        <Route path={APP_PATH.PLAYER_PROFILE} element={<PlayerProfile />} />
        <Route path={APP_PATH.MATCHE} element={<Matches />} />
        <Route path={APP_PATH.MATCHE_PROFILE} element={<MatchProfile />} />
        <Route path={APP_PATH.ADMIN_PLAYER} element={<AdminDashboard />} />
        <Route path={APP_PATH.ADMIN_MATCH} element={<AdminMatches />} />
        <Route path={APP_PATH.ADMIN_POINTS_TABLE} element={<AdminPointsTable />} />
      </Routes>
    </Router>
    </NavbarProvider>
  )
}

export default AppRoute
