import Catalog from "@/components/ui/CatalogMovies/Catalog";
import { MovieService } from "@/services/movie.service";
import { GetStaticProps, NextPage } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";

const TrendingPage: NextPage = () => {
	const { data: popularMovies } = useQuery("Popular movies", () =>
		MovieService.getMostPopularMovies(),
	);

	return (
		<Catalog
			movies={popularMovies || []}
			title="Trending movies"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("Popular movies", () =>
		MovieService.getMostPopularMovies(),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default TrendingPage;
