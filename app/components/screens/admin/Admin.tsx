import Meta from "@/utils/meta/Meta";
import styles from "./Admin.module.scss";
import Statistics from "./statistics/Statistics";
import Heading from "@/components/ui/heading/Heading";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
const Admin = () => {
	return (
		<Meta title="Admin Panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</Meta>
	);
};

export default Admin;
