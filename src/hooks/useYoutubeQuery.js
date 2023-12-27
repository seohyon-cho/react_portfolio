import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const response = await fetch(baseURL);
	const data = await response.json();
	return data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		scaleTime: 1000 * 60 * 60 * 24
	});
};
