import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Error404 from "../404";
import { ActorService } from "@/services/actor.service";
import { IActor, IMovie } from "@/shared/types/movie.types";
import { MovieService } from "@/services/movie.service";
import Catalog from "@/components/ui/CatalogMovies/Catalog";

interface IActorPage {
	movies: IMovie[];
	actor: IActor | undefined;
}
const ActorPage: NextPage<IActorPage> = ({ actor, movies }) => {
	// return actor ? <Actor actor={actor} movies={movies} /> : <Error404 />;
	return actor ? (
		<Catalog title={actor.name} movies={movies || []} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll();
		const paths = actors.map((g) => ({
			params: { slug: g.slug },
		}));

		return {
			paths,
			fallback: "blocking",
		};
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(String(params?.slug));

		const { data: movies } = await MovieService.getByActor(actor._id);

		return {
			props: { movies, actor },
			revalidate: 60,
		};
	} catch (e) {
		return {
			props: {},
			// notFound: true,
		};
	}
};

export default ActorPage;
