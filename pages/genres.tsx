import Collections from "@/components/screens/collections/Collections";
import { ICollection } from "@/components/screens/collections/collections.types";
import { GenreService } from "@/services/genre.service";
import { GetStaticProps, NextPage } from "next";
import Error404 from "./404";

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections();

		return {
			props: { collections },
		};
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		};
	}
};

export default GenresPage;
