import { FC } from "react";

import Heading from "@/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";
import AdminHeader from "@/components/ui/AdminTable/AdminHeader/AdminHeader";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
import AdminTable from "@/components/ui/AdminTable/AdminTableComp/AdminTable";
import { useMovies } from "./useMovies";

const MovieList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useMovies();

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				tableItems={data || []}
				headerItems={["Title", "Genre", "Rating"]}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	);
};

export default MovieList;
