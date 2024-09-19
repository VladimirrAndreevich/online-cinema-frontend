import { FC } from "react";
import { IHome } from "./home.interface";
import Meta from "@/utils/meta/Meta";
import Heading from "@/components/ui/heading/Heading";
import Slider from "@/components/ui/Slider/Slider";

const Home: FC<IHome> = ({ slides }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies and TV shows online or stream right to your browser"
		>
			<Heading
				title="Watch movies online"
				className="text-gray-200 mb-8 text-xl"
			/>

			{slides.length && <Slider slides={slides} />}
		</Meta>
	);
};

export default Home;
