import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchHistory = async () => {
	const response = await fetch(`${path}/DB/history.json`);
	const data = await response.json();
	return data.history;
};

export const useHistoryQuery = () => {
	return useQuery(['fetchHistory'], fetchHistory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		scaleTime: 1000 * 60 * 60 * 24,
		retry: 3 // 데이터 요청 실패 시, 재시도 횟수 (default:3)
	});
};
