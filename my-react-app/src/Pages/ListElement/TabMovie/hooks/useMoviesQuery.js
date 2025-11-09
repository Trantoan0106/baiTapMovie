import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movies";


export function useMoviesQuery(params) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 3,
    retry: 2,
  });
}

export default useMoviesQuery;
