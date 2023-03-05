import { createContext, useCallback, useEffect, useState } from 'react';
import { API_KEY } from './secret';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenresMovies] = useState([]);
  const [related, setRealated] = useState([]);
  const [loading, setLoading] = useState(true);


  const getTrendingMovies = async () => {
    const r = await fetch(`https://api.themoviedb.org/3/trending/movie/day?${API_KEY}`)
    const data = await r.json()
    const { results } = data;
    setMovies(results);
    setLoading(false);
  };

  const getGenresMovies = async () => {
    const r = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`);
    const data = await r.json();
    const { genres } = data;
    setGenres(genres);
    setLoading(false);
  };


  const getMovie = useCallback(async (id) => {
    const request = await fetch(`https://api.themoviedb.org/3/movie/${id}?${API_KEY}`);
    const data = await request.json();
    setMovie(data);
    setLoading(false);
  }, []);

  const getCategory = useCallback(async (id) => {
    const request = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&${API_KEY}`);
    const data = await request.json();
    setGenresMovies(data);
    setLoading(false);
  }, []);

  const getRelatedMovies = useCallback( async (id) => {
    const request = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?${API_KEY}`);
    const data = await request.json();
    setRealated(data);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    getGenresMovies();
    getTrendingMovies();
  }, []);
  // ${movieId}

  // EDITAR NOMBRE PARA CADA GENERO (HAY UN TEXTO HARDCODEADO)
  // PONER QUE PARA RESPONSIVE LA FLECHA PARA VOLVER AL HOME SEA CENTER Y NO FLEX-END

  return (
    <UserContext.Provider
      value={{
        loading,
        movie,
        movies,
        getMovie,
        genres,
        getCategory,
        genreMovies,
        getRelatedMovies,
        related
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export { UserProvider };
