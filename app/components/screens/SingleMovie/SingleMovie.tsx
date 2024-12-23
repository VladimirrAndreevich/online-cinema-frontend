import { FC, useEffect, useState } from "react";
import { IMoviePage } from "../../../../pages/movie/[slug]";
import Meta from "@/utils/meta/Meta";
import Banner from "@/components/ui/banner/Banner";
import SubHeading from "@/components/ui/heading/SubHeading";
import Content from "./Content/Content";
import dynamic from "next/dynamic";
import { useUpdateCountOpened } from "./useUpdateCountOpened";
import GalleryWithSlider from "@/components/ui/GalleryWithSlider/GaleryWithSlider";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer/CustomVideoPlayer";

const DynamicRateMovie = dynamic(() => import("./RateMovie/RateMovie"), {
	ssr: false,
});

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	const [isClient, setIsClient] = useState(false);
	useUpdateCountOpened(movie.slug);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<Meta title={movie.title || ""} description={`Watch ${movie.title}`}>
			<Banner
				imagePath={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<CustomVideoPlayer videoSource={movie.videoUrl} slug={movie.slug} />

			<div className="mt-12">
				<SubHeading title="Similar movies" />
				<GalleryWithSlider items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} _id={movie._id} />
		</Meta>
	);
};

export default SingleMovie;
