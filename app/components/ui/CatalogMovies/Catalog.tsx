import { FC } from "react";

import GalleryItem from "@/components/ui/gallery/GalleryItem";
import Heading from "@/components/ui/heading/Heading";

import styles from "./Catalog.module.scss";
import { ICatalog } from "./catalog.types";
import Meta from "@/utils/meta/Meta";
import Description from "../heading/Description";
import { getMovieUrl } from "@/config/url.config";

const Catalog: FC<ICatalog> = ({ title, description, movies }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						variant="horizontal"
						item={{
							name: movie.title,
							posterPath: movie.bigPoster,
							url: getMovieUrl(movie.slug),
							content: {
								title: movie.title,
							},
						}}
					/>
				))}
			</section>

			{/* <div className="text-center">
				<button className={styles.button}>Load more</button>
			</div> */}
		</Meta>
	);
};

export default Catalog;
