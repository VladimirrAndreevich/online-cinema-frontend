import { axiosClassic } from "@/api/interceptors";
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
};
