import { FC } from "react";
import { IMenu } from "./menu.interface";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import dynamic from "next/dynamic";

const DynamicAuthItems = dynamic(() => import("./Auth/AuthItems"), {
	ssr: false,
});

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{title}</div>
			<ul className={styles.ul}>
				{items.map((item, index) => (
					<MenuItem key={index} item={item} />
				))}
				{title === "General" && <DynamicAuthItems />}
			</ul>
		</div>
	);
};

export default Menu;
