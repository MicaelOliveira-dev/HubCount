import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "components/fixeds/Header";
import Footer from "components/fixeds/Footer";
import Sidebar from "components/fixeds/Sidebar";

import React from "react";
const GenreMovies = React.lazy(() => import("views/genreMovies"));
const Cadastro = React.lazy(() => import("views/Cadastro"));
const VideoTrailer = React.lazy(() => import("views/VideoTrailer"));
import ProtectedRoute from "components/ProtectedRoute";
import LoginContext from "contexts/LoginContext";
import Loading from "views/Loading";
const LoginPage = React.lazy(() => import("views/Login"));
const HomePage = React.lazy(() => import("views/Home"));
const MoviePage = React.lazy(() => import("views/Movie"));
const ChatPage = React.lazy(() => import("views/chat"));
const ProfilePage = React.lazy(() => import("views/Profile"));
const ProfilePageUsers = React.lazy(() => import("views/ProfileUsers"));
const LoadingPage = React.lazy(() => import("views/Loading"));
const Cinefilos = React.lazy(() => import("views/Cinefilos"));

function App() {
  const { isLoggedIn, loading } = React.useContext(LoginContext);
  const location = window.location;
  const [isOnTop, setIsOnTop] = React.useState<boolean>(true);
  const [showNavAndFooter, setShowNavAndFooter] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (location.pathname === "/login") setShowNavAndFooter(false);
    else setShowNavAndFooter(true);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOnTop(true);
      } else if (window.scrollY > 25) {
        setIsOnTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (loading) {
    return <Loading big />;
  }
  return (
    <React.Suspense fallback={<LoadingPage big />}>
      <BrowserRouter>
        <div className="font-body">
          <Header showNav={showNavAndFooter} isOnTop={isOnTop} />
          <Sidebar />
          <div className="text-newWhite">
            <Routes>
              <Route index path="/" Component={HomePage} />
              <Route path="/movie/:movieId" Component={MoviePage} />
              <Route path="/genre/:movieGenre" Component={GenreMovies} />
              <Route path="/login" Component={LoginPage} />
              <Route path="/cadastro" Component={Cadastro} />
              <Route path="/profile" Component={ProfilePage} />
              <Route path="/profile/:Id" Component={ProfilePageUsers} />
              <Route path="/trailer/:movieName" element={<VideoTrailer />} />
              <Route path="/cinefilos" Component={Cinefilos} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute
                    isAccessible={isLoggedIn}
                    redirectPath="/login"
                  >
                    <ChatPage chatsUsers={[]} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isAccessible={isLoggedIn}
                    redirectPath="/login"
                  >
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer showFooter={showNavAndFooter} />
        </div>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
