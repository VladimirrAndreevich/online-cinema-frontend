import { FC } from "react";

import { IMovie } from "@/shared/types/movie.types";

import styles from "./Content.module.scss";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { getActorUrl, getGenreUrl } from "@/config/url.config";
import ContentList from "./ContentList/ContentList";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useAuth } from "@/hooks/useAuth";

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth();

	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			{user && <FavoriteButton movieId={movie._id} />}
			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min.</span>
			</div>
			<ContentList
				name="Genres"
				links={movie.genres.map((g) => ({
					link: getGenreUrl(g.slug),
					title: g.name,
					_id: g._id,
				}))}
			/>
			<ContentList
				name="Actors"
				links={movie.actors.map((a) => ({
					link: getActorUrl(a.slug),
					title: a.name,
					_id: a._id,
				}))}
			/>
		</div>
	);
};

export default Content;
