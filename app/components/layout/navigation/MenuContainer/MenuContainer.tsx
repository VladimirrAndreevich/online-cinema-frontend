import Menu from "./Menu";
import { firstMenu, userMenu } from "./menu.data";

const MenuContainer = () => {
	return (
		<div>
			<Menu menu={firstMenu} />

			<Menu menu={userMenu} />
		</div>
	);
};

export default MenuContainer;
