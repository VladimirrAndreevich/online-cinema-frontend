import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import styles from "./Favorites.module.scss";
import { IFavoriteItem } from "./favorites.interface";
import FavoriteButton from "../SingleMovie/FavoriteButton/FavoriteButton";
import { useAuth } from "@/hooks/useAuth";

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
	const { user } = useAuth();
	return (
		<div className={styles.itemWrapper}>
			{user && <FavoriteButton movieId={item._id} />}
			<Link href={item.url} className={styles.item}>
				<Image
					alt={item.name}
					src={item.posterPath}
					layout="fill"
					draggable={false}
					priority
				/>
				<div className={styles.title}>{item.title}</div>
			</Link>
		</div>
	);
};

export default FavoriteItem;
