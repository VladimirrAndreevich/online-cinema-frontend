import { FC } from "react";
import { IHome } from "./home.interface";
import Layout from "@/components/layout/Layout";

const Home: FC<IHome> = () => {
	return (
		<Layout>
			<h1>hello world!</h1>
		</Layout>
	);
};

export default Home;
