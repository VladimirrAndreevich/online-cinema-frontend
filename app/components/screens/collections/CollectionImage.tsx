import { ICollection } from "./collections.types";
import Image from "next/image";
import { FC, useEffect } from "react";

const CollectionImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	useEffect(() => {
		console.log(image);
	}, []);

	return <Image alt={title} src={image} layout="fill" draggable={false} />;
};

export default CollectionImage;
