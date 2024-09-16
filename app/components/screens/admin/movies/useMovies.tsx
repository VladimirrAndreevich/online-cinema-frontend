import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useDebounce } from "@/hooks/useDebounce";
import { getAdminUrl } from "@/config/url.config";
import { toastError } from "@/utils/api/toastError";
import { ITableItem } from "@/components/ui/AdminTable/AdminTableComp/adminTable.interface";
import { MovieService } from "@/services/movie.service";
import { getGenresList } from "@/utils/movie/getGenreListEach";
import { useRouter } from "next/router";

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["movie list", debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					}),
				),
			onError(error) {
				toastError(error, "movie list");
			},
		},
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete user",
		(userId: string) => MovieService.delete(userId),
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

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		"create movie",
		() => MovieService.create(),
		{
			onError(error) {
				toastError(error, "Create movie");
			},
			onSuccess({ data: _id }) {
				toastr.success("Create movie", "create was successful");
				push(getAdminUrl(`movie/edit/${_id}`));
			},
		},
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync],
	);
};
