import { FC } from "react";

import { useAuth } from "@/hooks/useAuth";

import MovieList from "../MovieList";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { useFavorites } from "@/components/screens/Favorites/useFavorites";

const FavoriteMovieList: FC = () => {
	const { isLoading, favoritesMovies } = useFavorites();
	const { user } = useAuth();

	if (!user) return null;

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			movies={favoritesMovies?.slice(0, 3) || []}
			link="/favorites"
			title="Favorites"
		/>
	);
};

export default FavoriteMovieList;
