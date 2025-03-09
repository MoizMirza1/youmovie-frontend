import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/Home";
import ProtectedRoute from "../routes/ProtectedRoute";
import Profile from "../components/Profile/Profile";
import Admin from '../components/admin/adminBanner'
import PricingPage from "../pages/Pricing/PricingPage";
import GenrePage from "../components/GenresComponent/Genres";
import ServerError from "../NotAccessPage/ServerError";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UnauthorizedPage from "../NotAccessPage/UnauthorizedPage";
import NotFoundPage from "../NotAccessPage/NotFoundPage";
import MoviesPage from "../pages/MoviesPage";
import VideoPage from "../pages/VideoPage/VideoPage";
import WatchPage from "../pages/WatchPage/WatchPage";
import SeriesHome from "../pages/SeriesPage/SeriesHome";
import GenreSeriesPage from "../pages/GenrePage/GenreSeriesPage";
import SeriesWatchPage from "../pages/WatchPage/SeriesWatchPage";
import WatchList from "../components/Profile/WatchList";

const AuthRoutes = () => {


    const { serverDown } = useContext(AuthContext); // 🔹 Detect server status

    if (serverDown) {
        return <ServerError />; // ✅ Show error page if server is down
    }


    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage/>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><WatchList /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />


            <Route path="movies/genre/:id" element={<GenrePage />} />
            <Route path="/genre/:id" element={<GenrePage />} />


           




            <Route path="/movies" element={<ProtectedRoute><MoviesPage/></ProtectedRoute>} />


            <Route path="movies/video/:movieId" element={<ProtectedRoute><VideoPage/></ProtectedRoute>} />
            <Route path="movies/video/watch/:movieId" element={<ProtectedRoute><WatchPage/></ProtectedRoute>} />


            {/* Series Route */}

            <Route path="/series" element={<ProtectedRoute><SeriesHome/></ProtectedRoute>} />
            <Route path="/series/genre/:genreId" element={  <ProtectedRoute><GenreSeriesPage /></ProtectedRoute>} />
            <Route path="/series/watch/:movieId" element={  <ProtectedRoute><SeriesWatchPage /></ProtectedRoute>} />
              
          

            <Route path="/unauthorized" element={<ProtectedRoute><UnauthorizedPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AuthRoutes;
