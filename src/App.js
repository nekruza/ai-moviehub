import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';
import Movie from "./pages/Movie";
import MovieByGenre from "./pages/Genres/MovieByGenre";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/Home/HomePage";
import Footer from "./pages/Footer";
import MovieListByGenre from "./pages/Genres/MovieListByGenre";
import Alan from "./pages/Alan";
import SearchResult from "./pages/SearchResult/SearchResult";
import { fetchToken, createSessionId, moviesApi } from "./auth/auth";
import useMovieStore from "./Zustand";
import FavouriteList from "./pages/Favourite/Favourite";
import WatchList from "./pages/Favourite/Watchlist";
import EmptyState from './components/EmptyState.jsx'
const queryClient = new QueryClient()



function App() {
  const [searchQuery, setSearchQuery] = React.useState()
  // const [user, setUser] = React.useState({})
  const { user, setUser } = useMovieStore()

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');


  React.useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          setUser(userData)
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          setUser(userData)
        }
      }
    }

    logInUser();

  }, [token])



  return (
    <QueryClientProvider client={queryClient}>
      <Alan />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} fetchToken={fetchToken} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorite" element={<FavouriteList />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="genres" element={<MovieByGenre />} >
          <Route path=":id" element={<MovieListByGenre />} />
        </Route>
        <Route path="*" element={<div style={{ height: '70vh', width: '100vw' }}><EmptyState title="Page not found :/" /></div>} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
