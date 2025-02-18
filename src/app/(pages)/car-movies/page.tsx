"use client";
import Fuse from "fuse.js";
import { carMovies } from "@/shared/contents/carMovies/carMovies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import {
  setFilteredMovies,
  setLoading,
  setSearchQuery,
} from "@/shared/store/slices/moviesSlice";
import Loading from "@/app/components/loader/Loader";

export default function CarMovies() {
  const { loading, filteredMovies, searchQuery } = useSelector(
    (state: RootState) => state.movies
  );
  const dispatch = useDispatch();
  const fuse = new Fuse(carMovies, {
    keys: ["title", "description"],
    includeScore: true,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
    dispatch(setLoading(true)); // Start loading when search begins
    if (event.target.value.trim() === "") {
      dispatch(setFilteredMovies(carMovies));
      dispatch(setLoading(false)); // End loading when no search query
    } else {
      const result = fuse.search(event.target.value).map((result) => result.item);
      dispatch(setFilteredMovies(result));
      dispatch(setLoading(false)); // End loading after search is completed
    }
  };

  const handleLearnMoreClick = (movieTitle: string) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      window.open(`https://www.imdb.com/find?q=${movieTitle}`, "_blank");
      dispatch(setLoading(false));
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-blue-700">
          Top Car Movies
        </h2>

        {/* Loading Spinner for the entire movies section */}
        {loading ? (
          <Loading/>
        ) : (
          <>
            <div className="mb-8 text-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for movies..."
                className="py-2 px-4 w-1/2 border border-gray-300 rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMovies.map((movie, index) => (
                <div
                  key={index}
                  className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-xl text-gray-500 mb-4">{movie.year}</p>
                    <p className="text-lg text-gray-700">{movie.description}</p>
                  </div>
                  <button
                    onClick={() => handleLearnMoreClick(movie.title)}
                    className="text-lg font-semibold bg-blue-600 text-white text-center py-2 rounded-b-lg"
                    disabled={loading}
                  >
                    {loading ? <span>Loading...</span> : <span>Learn More</span>}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
