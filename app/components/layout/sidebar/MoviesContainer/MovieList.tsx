import { FC } from "react";
import styles from "./MovieList.module.scss";
import { IMovieList } from "./movie-list.interface";
import MovieItem from "./MovieItem";
import Link from "next/link";

const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link} className={styles.button}>
				{link === "/trending" ? "All trending movies" : "All favorites movies"}
			</Link>
		</div>
	);
};

export default MovieList;
