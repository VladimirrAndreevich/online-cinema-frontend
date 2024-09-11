import Meta from "@/utils/meta/Meta";
import { useGenres } from "./useGenres";
import { FC } from "react";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
import Heading from "@/components/ui/heading/Heading";
import AdminHeader from "@/components/ui/AdminTable/AdminHeader/AdminHeader";
import AdminTable from "@/components/ui/AdminTable/AdminTableComp/AdminTable";

const GenreList: FC = () => {
	const {
		createAsync,
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
	} = useGenres();

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />
			<AdminHeader
				onClick={createAsync}
				searchTerm={searchTerm}
				handleSearch={handleSearch}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={["Name", "Slug"]}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	);
};

export default GenreList;
