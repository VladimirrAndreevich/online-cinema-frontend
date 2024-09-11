import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { UserService } from "@/services/user.service";
import { useDebounce } from "@/hooks/useDebounce";
import { getAdminUrl } from "@/config/url.config";
import { toastError } from "@/utils/api/toastError";
import { ITableItem } from "@/components/ui/AdminTable/AdminTableComp/adminTable.interface";
import { convertMongoDate } from "@/utils/date/convertMongoDate";

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["user list", debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createAt)],
					}),
				),
			onError(error) {
				toastError(error, "user list");
			},
		},
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete user",
		(userId: string) => UserService.deleteUser(userId),
		{
			onError(error) {
				toastError(error, "Delete user");
			},
			onSuccess() {
				toastr.success("Delete user", "delete was successful");
				queryData.refetch();
			},
		},
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync],
	);
};
