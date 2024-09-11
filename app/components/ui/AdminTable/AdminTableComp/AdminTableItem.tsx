import { FC } from "react";

import styles from "./AdminTable.module.scss";
import { IAdminTableItem } from "./adminTable.interface";
import AdminActions from "./AdminActions/AdminActions";

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	);
};

export default AdminTableItem;
