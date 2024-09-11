import { FC } from "react";

import Heading from "@/ui/heading/Heading";

import { useUsers } from "./useUsers";
import Meta from "@/utils/meta/Meta";
import AdminHeader from "@/components/ui/AdminTable/AdminHeader/AdminHeader";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
import AdminTable from "@/components/ui/AdminTable/AdminTableComp/AdminTable";

const UserList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				tableItems={data || []}
				headerItems={["Email", "Date register"]}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	);
};

export default UserList;
