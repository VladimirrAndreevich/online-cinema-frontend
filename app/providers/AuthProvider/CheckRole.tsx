import { useAuth } from "@/hooks/useAuth";
import { TypeComponentAuthFields } from "@/shared/types/auth.types";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children,
}) => {
	const { user } = useAuth();

	const router = useRouter();
	const ChildrenComp = () => <>{children}</>;

	if (user?.isAdmin) return <ChildrenComp />;

	if (isOnlyAdmin) {
		router.pathname !== "/404" && router.replace("404");
		return null;
	}

	const isUser = user && !user.isAdmin;

	if (isUser && isOnlyUser) {
		return <ChildrenComp />;
	} else {
		router.pathname !== "/auth" && router.replace("auth");
		return null;
	}
};

export default CheckRole;
