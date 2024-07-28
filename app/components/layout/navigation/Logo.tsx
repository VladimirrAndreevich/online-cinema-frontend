import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/images/logo.svg";

const Logo = () => {
	return (
		<Link href="/" className="mx-layout mb-10  flex flex-row items-center text-xl gap-x-2 text-white">
			<Image
				src={logoImage}
				width={40}
				alt="Online cinema"
				draggable={false}
			/>
			Online Cinema
		</Link>
	);
};

export default Logo;
