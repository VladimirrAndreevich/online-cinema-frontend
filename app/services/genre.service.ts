import axios, { axiosClassic } from "@/api/interceptors";
import { IGenreEditInput } from "@/components/screens/admin/genre/genreEdit.interface";
import { getGenresUrl } from "@/config/api.config";
import { IGenre } from "@/shared/types/movie.types";

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(``), {
			params: searchTerm
				? {
						searchTerm,
					}
				: {},
		});
	},

	async getPopularGenres(limit: number = 4) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(`/popular`), {
			params: {
				limit,
			},
		});
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},

	async create() {
		return axios.post<string>(getGenresUrl(""));
	},

	async update(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},

	async delete(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl("/collections"));
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},
};
