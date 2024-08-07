import { IMovie } from "@/shared/types/movie.types";
import { FC } from "react";
import styles from "./MovieList.module.scss";
import { getGenreUrl, getMovieUrl } from "@/config/url.config";
import Link from "next/link";
import Image from "next/image";
import { getGenreListEach } from "@/utils/movie/getGenreListEach";
import MaterialIcon from "@/components/ui/MaterialIcon";

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					width={65}
					height={97}
					src={movie.poster}
					draggable={false}
					alt={movie.title}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<div className={styles.title}>{movie.title}</div>
				<div className={styles.genres}>
					{movie.genres.map((genre, index) => (
						<Link key={genre._id} href={getGenreUrl(genre.slug)}>
							{getGenreListEach(index, movie.genres.length, genre.name)}
						</Link>
					))}
				</div>

				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	);
};

export default MovieItem;
