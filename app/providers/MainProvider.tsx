import { Provider } from "react-redux";
import Layout from "@/components/layout/Layout";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReduxToast from "./ReduxToast";
import { store } from "@/store/store";
import HeadProvider from "./HeadProvider/HeadProvider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<Layout>{children}</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	);
};

export default MainProvider;
