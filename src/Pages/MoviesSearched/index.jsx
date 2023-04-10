import React, { useContext } from 'react';
import { UserContext } from '../../useContext/userProvider';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { PopularMovies } from '../../components/PopularsMovies';
import { Unavailable } from '../../components/Unavailable';
import { MapMovies } from '../../components/MapMovies';
import { IoIosArrowBack } from 'react-icons/io';
import './styles.css';

const MoviesSearched = () => {

  const { moviesSearch, showQuery, popularsMovies } = useContext(UserContext);

  return (
    <div className='movies_searched--searched'>
      <div className='header--searched d-flex align-items-center justify-content-between'>
        <Link to={'/'} className='arrow_at_home d-flex justify-content-center align-items-center'>
          <IoIosArrowBack className='icon_arrow fs-1' />
        </Link>
        <Link to={'/'} className='title--searched my-4 fs-1'>MoviesApp</Link>
        <div className='disable_icon'></div>
      </div>
      <Navbar />
      {showQuery && <>
        {
          moviesSearch.length ? <div className='movies--searched d-flex justify-content-center flex-wrap'>
            <MapMovies
              dataToMap={moviesSearch}
            />
          </div> :
            <>
              <Unavailable unavailable='movie searched' element={`"${showQuery}"`} />
              <PopularMovies
                popularsMovies={popularsMovies}
              />
            </>
        }
      </>}
    </div>
  );
};

export { MoviesSearched };