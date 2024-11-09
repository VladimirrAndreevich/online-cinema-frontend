import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

import GalleryItemWithSlider from "./GalleryItemWithSlider";
import { IGalleryItem } from "../gallery/gallery.interface";
import styles from "./GalleryWithSlider.module.scss";

import "swiper/css";
import "swiper/css/scrollbar";

const GalleryWithSlider: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<Swiper
			spaceBetween={16}
			slidesPerView="auto"
			scrollbar={{
				hide: true,
			}}
			modules={[Pagination, Scrollbar]}
			className={styles.swiper}
		>
			{items.map((item) => (
				<SwiperSlide
					style={{ width: 165, height: 288 }}
					className={styles.item}
				>
					<GalleryItemWithSlider key={item.url} item={item} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default GalleryWithSlider;
