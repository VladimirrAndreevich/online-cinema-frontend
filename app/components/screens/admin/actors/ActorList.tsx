import Meta from "@/utils/meta/Meta";
import { useActors } from "./useActors";
import { FC } from "react";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
import Heading from "@/components/ui/heading/Heading";
import AdminHeader from "@/components/ui/AdminTable/AdminHeader/AdminHeader";
import AdminTable from "@/components/ui/AdminTable/AdminTableComp/AdminTable";

const ActorList: FC = () => {
	const {
		createAsync,
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
	} = useActors();

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />
			<AdminHeader
				onClick={createAsync}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={["Name", "Count movies"]}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	);
};

export default ActorList;
