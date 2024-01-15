import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey: [queryName, opt] }) => {
	const num = 20;
	const flickr_api = process.env.REACT_APP_FLICKR_API;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
	let url = '';
	opt.type === 'user' && (url = userURL);
	opt.type === 'interest' && (url = interestURL);
	opt.type === 'search' && (url = searchURL);

	const data = await fetch(url);
	const json = await data.json();
	return json.photos.photo;
};

export const useFlickrQuery = opt => {
	return useQuery(['fetchFlickr', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

/*
	(flickr, youtube, department...)
	react-query를 활용한 비동기 데이터 fetching hook 제작 배경
	- 기존 비동기 데이터를 static한 상태로 redux를 통해 저장시 서버에서 변경되는 데이터 상황을 클라이언트에서 인지하기 어려워 옛날 데이터를 모든 컴포넌트에서 공유해서 쓰는 신뢰하지 못할 서버 데이터사용의 위험성 제거를 위함
	동작방식
	- App 루트컴포넌트에서 쿼리키를 공유하는 쿼리클라이언트 인스턴스를 생성후 전용 Provider로 전달
	- 모든 하위 컴포넌트에서는 쿼리키를 공유가능
	- 각 비동기 데이터별 커스텀 훅에서 Data fetching후 fetching한 데이터에 queryKey를 연결 이때 fethcing함수에 인수가 필요할 경우 쿼리키 배열의 2번째 인수에 연결하여, 각 요청에 따른 비동기 데이터에 고유 쿼리키를 자동 연결
	- 쿼리키에 비동기 데이터 연결시 cacheTime, staleTime을 설정하여 비동기 데이터 성격에 따라 유지기간 설정
	- staleTime : refetching을 금지하기 위한 시간 설정 
	- cacheTime : statleTime이 지난 이후 얼마동안 해당 데이터를 cache에 등록시킬지 시간 설정
	- 혹 동일한 쿼리키라고 하더라도 서버에서 자체적으로 데이터가 수시로 변경할만한 비동기 데이터는 cacheTime, staleTime을 0으로 설정하여 요청할때마다 항상 새로운 데이터를 받아오도록 설정 추천
*/
