import { errorCatch } from "api/api.helpers";
import type { GetStaticProps, NextPage } from "next";

import Home from "@/screens/home/Home";
import { IHome } from "@/components/screens/home/home.interface";
import { MovieService } from "@/services/movie.service";
import { ActorService } from "@/services/actor.service";
import { ISlide } from "@/components/ui/Slider/slider.interface";
import { getActorUrl, getMovieUrl } from "@/config/url.config";
import { getGenresList } from "@/utils/movie/getGenreListEach";
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface";

const HomePage: NextPage<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();
		const { data: dataActors } = await ActorService.getAll();
		const dataTrendingMovies = await MovieService.getMostPopularMovies();

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster,
		}));

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			url: getActorUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`,
			},
		}));

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				url: getMovieUrl(m.slug),
			}));

		return {
			props: {
				actors,
				slides,
				trendingMovies,
			} as IHome,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return {
			props: {
				actors: [],
				slides: [],
				trendingMovies: [],
			} as IHome,
		};
	}
};

export default HomePage;
