import { lazy, Suspense } from 'react';
import './App.css'

import { Routes, Route } from 'react-router-dom';
// import HomePage from '../pages/HomePage/HomePage';
// import MoviesPage from '../pages/MoviesPage/MoviesPage';
// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from "./Navigation/Navigation";
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));


export default function App() {

  return (
    <>
      <div className='container'>
        <Navigation />
        
        <Suspense fallback={null}>
         <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/movies" element={<MoviesPage/>} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
            <Route path="cast" element={<MovieCast/>} />
            <Route path="reviews" element={<MovieReviews/>} />
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </Suspense>
{/* 
        <SearchBar onSearch={handleSearch} />
        {isError && <ErrorMessage/>}
        <ImageModal isOpen={modalIsOpen} onClose={closeModal} imageUrl={selectedImage} />
        {images.length > 0 && <ImageGallery photos={images} onImageClick={openModal} />}
        {isLoading && <Loader/>}
        {images.length > 0 && !isLoading && currentPage !== totalPages && <LoadMoreBtn nextPage={incrementPage} />} */}
    </div>
    </>
  );
};