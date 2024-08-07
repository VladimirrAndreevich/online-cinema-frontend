import MainProvider from "@/providers/MainProvider";
import type { AppProps } from "next/app";
import "@/assets/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainProvider>
			<Component {...pageProps} />
		</MainProvider>
	);
}
