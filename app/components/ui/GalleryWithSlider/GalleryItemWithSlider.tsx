import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import styles from "./GalleryWithSlider.module.scss";
import { IGalleryItem } from "../gallery/gallery.interface";

const GalleryItemWithSlider: FC<{ item: IGalleryItem }> = ({ item }) => {
	return (
		<Link
			href={item.url}
			className={cn(styles.link, {
				[styles.withText]: item.content,
			})}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				layout="fill"
				draggable={false}
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}> {item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	);
};

export default GalleryItemWithSlider;
