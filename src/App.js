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

const queryClient = new QueryClient()


function App() {
  const [searchQuery, setSearchQuery] = React.useState()


  return (
    <QueryClientProvider client={queryClient}>
      <Alan />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="genres" element={<MovieByGenre />} >
          <Route path=":id" element={<MovieListByGenre />} />
        </Route>
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
