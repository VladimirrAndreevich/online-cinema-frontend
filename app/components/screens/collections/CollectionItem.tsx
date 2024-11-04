import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import CollectionImage from "./CollectionImage";
import styles from "./Collections.module.scss";
import { ICollection } from "./collections.types";
import { getGenreUrl } from "@/config/url.config";

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)} className={styles.collection}>
			<CollectionImage collection={collection} />

			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>

			<div className={`${styles.behind} ${styles.second}`}>
				<CollectionImage collection={collection} />
			</div>

			<div className={`${styles.behind} ${styles.third}`}>
				<CollectionImage collection={collection} />
			</div>
		</Link>
	);
};

export default CollectionItem;
