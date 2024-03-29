import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../useContext/userProvider';
import { Link, useLocation } from 'react-router-dom';
import { MapMovies } from '../../components/MapMovies';
import { Unavailable } from '../../components/Unavailable';
import { IoIosArrowBack } from 'react-icons/io';
import './styles.css';

const Genres = () => {

  const { loading, getCategory, genreMovies } = useContext(UserContext);
  
  let { state } = useLocation();
  
  useEffect(() => {
    getCategory(state.id);
  }, [getCategory, state.id]);

  if (loading) {
    return <div>Cargando...</div>;
  };

  return (
    <article className='genre d-flex flex-column'>
      <header className='header--genre d-flex justify-content-between align-items-center'>
        <Link to={'/'} className='arrow_at_home d-flex justify-content-center align-items-center'>
          <IoIosArrowBack className='icon_arrow fs-1' />
        </Link>
        <div className='title--genre fs-4'>
          {state.name}
        </div>
        <div className='disable_icon'></div>
      </header>
      <section className='movies--genre d-flex justify-content-center flex-wrap'>
        {
          genreMovies ? <MapMovies
            dataToMap={genreMovies}
          /> :
            <Unavailable unavailable='genres' />
        }
      </section>
    </article>
  );
};

export { Genres };
