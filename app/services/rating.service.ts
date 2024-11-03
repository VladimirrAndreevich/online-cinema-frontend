import { getRatingsUrl } from "@/config/api.config";
import axios from "api/interceptors";

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axios.patch<string>(getRatingsUrl("/set-rating"), {
			movieId,
			value,
		});
	},

	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`));
	},
};
