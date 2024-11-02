import { FC, useEffect } from "react";
import { IMoviePage } from "../../../../pages/movie/[slug]";
import Meta from "@/utils/meta/Meta";
import Banner from "@/components/ui/banner/Banner";
import SubHeading from "@/components/ui/heading/SubHeading";
import Gallery from "@/components/ui/gallery/Gallery";
import Content from "./Content/Content";
import dynamic from "next/dynamic";

const DynamicPlayer = dynamic(() => import("@/ui/VideoPlayer/VideoPlayer"), {
	ssr: false,
});

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useEffect(() => {
		console.log(movie.videoUrl);
	}, []);

	return (
		<Meta title={movie.title || ""} description={`Watch ${movie.title}`}>
			<Banner
				imagePath={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer videoSource={movie.videoUrl} slug={movie.slug} />

			<div className="mt-12">
				<SubHeading title="Similar movies" />
				<Gallery items={similarMovies} />
			</div>

			{/* Rating */}
		</Meta>
	);
};

export default SingleMovie;
