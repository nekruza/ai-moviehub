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

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="genres" element={<MovieByGenre />} >
          <Route path=":id" element={<MovieListByGenre />} />
        </Route>
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
