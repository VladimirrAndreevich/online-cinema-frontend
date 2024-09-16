import { GenreService } from "@/services/genre.service";
import { useQuery } from "react-query";
import { IMenuItem } from "../menu.interface";
import { getGenresUrl } from "@/config/api.config";

export const usePopularGenres = () => {
	const queryData = useQuery(
		"popular genres menu",
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					.filter((genre) => genre.icon)
					.map(
						(genre): IMenuItem => ({
							icon: genre.icon,
							link: getGenresUrl(genre.slug),
							title: genre.name,
						}),
					)
					.slice(0, 4),
		},
	);

	return queryData;
};
