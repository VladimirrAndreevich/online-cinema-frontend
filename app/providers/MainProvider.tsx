import { Provider } from "react-redux";
import Layout from "@/components/layout/Layout";
import { FC, PropsWithChildren, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReduxToast from "./ReduxToast";
import { store } from "@/store/store";
import HeadProvider from "./HeadProvider/HeadProvider";
import AuthProvider from "./AuthProvider/AuthProvider";
import { TypeComponentAuthFields } from "@/shared/types/auth.types";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component,
	children,
}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	);
};

export default MainProvider;
