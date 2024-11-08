import { GetStaticProps, NextPage } from "next";

import { IMovie } from "@/shared/types/movie.types";
import { MovieService } from "@/services/movie.service";
import Catalog from "@/components/ui/CatalogMovies/Catalog";

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movies } = await MovieService.getAll();

		return {
			props: { movies },
			revalidate: 60,
		};
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			notFound: true,
		};
	}
};

export default FreshPage;
