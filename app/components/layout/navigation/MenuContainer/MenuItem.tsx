import { useRouter } from "next/router";
import cn from "classnames";
import { FC } from "react";
import { IMenuItem } from "./menu.interface";
import styles from "./Menu.module.scss";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter();

	return (
		<li
			className={cn({
				[styles.active]: asPath === item.link,
			})}
		>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	);
};

export default MenuItem;
