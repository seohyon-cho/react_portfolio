import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './hooks/useGlobalData';

ReactDOM.render(
	<BrowserRouter>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	[ React-query 기본 개념 ]

	- 서버에서 수시로 변경될 수도 있고, 클라이언트에서 변경점을 인지하지 못 하는 서버 데이터를 fetching된 상태 그대로 전역 store에 static하게 저장한다는 개념자체가 잘못되었다는 판단에서 출발함. 
	- 서버 사이드 데이터와 클라이언트 사이드 데이터는 성격이 분명하게 다름에도 불구하고, redux로 통합해서 관리하는 것이 비효율적이라고 판단되었음. 
	- 서버 사이드 비동기 데이터는, 사용자가 호출할 떄마다 계속해서 최신 데이터를 가져와서 옛날 데이터를 활용하지 않도록 하는 게 주목적. 
	- 동일한 서버 사이드 데이터를 여러 컴포넌트에서 재활용하려고 할 때, 동일한 데이터임에도 불구하고 매번 refetching해야 하는 것이 비효율적. 
	- 서버 사이드 데이터를 필요할 때마다 요청을 하긴 하되, 한 번 불러온 이력이 있는 데이터는 고유의 queryKey를 붙여서, 브라우저로 하여금 동일한 데이터인지 여부를 구분할 수 있게 함. 
	- 쿼리 클라이언트 인스턴스 객체를 컴포넌트 전역에 활용 가능하게 하고, 캐싱된 비동기 데이터의 queryKey를 공유 
	- 클라이언트로 하여금, 동일한 queryKey로 매핑되어있는 비동기 데이터를 또 refetching하지 않고, 기존에 캐싱되어있는 데이터를 재활용함. 
	- react-query 를 활용함으로서, 비동기 데이터의 캐싱시간과, 얼마동안 강제로 refetching을 제한할지의 시간 등을 비동기 데이터의 성격에 맞게 설정할 수 있음. 
	- react-query 를 통해 반환된 데이터는 state에 저장되는 것이 아니기 때문에, 불필요하게 useState, useEffect, useCallback 등 불필요한 훅을 호출할 필요가 없고, 컴포넌트의 재렌더링을 일으키는 이슈를 발생시키지 않으므로, 기존에 개발 시 고려해야했던 이슈사항들이 줄어들게 됨.
	
	

	[ 해당 브랜치(프로젝트)에서 React-query 를 도입하게 된 이유 ]

	- redux-toolkit 으로 모든 비동기 데이터를 store에 저장해서 재활용하고 있었는데, 유독 flickr 컴포넌트에서만 컴포넌트가 전반적으로 느린 듯한 (버벅이는 듯한) 이슈 발생. 
	- flickr 데이터에 새로운 이미지 업로드 시, 새로 업로드한 이미지가 출력이 안 되고 예전 이미지가 출력되는 현상을 확인. 
	- 구글링을 해보니, 비동기 데이터를 전역 state 저장 시에 문제점을 알게 되고, react-query에 대해 알게 되었음. 


	[ 기존 redux-saga/toolkit 프로젝트를 갈아엎고 React-query 로 "변경(고도화)" 하면서 좋아진 점 ]

	(1) client-side-data 와 server-side-data 의 관리를 분리함으로써, 코드 관리가 수월해짐. 
	(2) 비동기 데이터를 redux 관리할 필요가 없어지면서, 클라이언트 사이드 데이터를 굳이 무거운 리덕스 시스템으로 관리할 필요가 없어짐. 
	(3) 리액트의 기본 내장 훅인 context API 기반의 createContext, useContext 를 조합한 커스텀 훅으로, 보다 간결하게 클라이언트 사이드 데이터를 관리할 수 있게 됨. 
	(4) react-query로 비동기 데이터 호출 및 쿼리관리를 커스텀 훅으로 제작해, react-query를 활용한 비동기 데이터의 재사용성을 높임. 
	(5) 비동기 데이터 성격에 따라서, staleTime, cacheTime(gcTime) 을 각각 적합하게 설정하여, 자주 변경되어야 하는 데이터는 새로운 데이터를 계속 호출 및 갱신하게 해주고, 변경 주기가 긴(빈번하지 않은) 데이터는 staleTime과 cacheTime을 길게 설정해서, 라우터 이동 시 불필요하게 refetching을 하지 않게끔 해서 앱의 성능의 향상에 기여할 수 있음. 


	[ React-query 작업 순서 (실행 흐름) ]

	(1) 루트 컴포넌트인 App에서, 컴포넌트 전역에서 비동기 데이터별로 queryKey를 공유할 수 있는 query Client Instance 를 생성한 뒤, 전달한다. 
			<QueryClientProvider client={queryClient}></QueryClientProvider>
	(2) hooks 폴더 안에서 react-query를 활용한 비동기 데이터 카테고리별로 커스텀 훅을 생성한다. 
	(3) useQuery로 fetching 호출 시, 해당 반환 데이터에 대한 고유의 queryKey 등록 및, staleTime과 cacheTime을 설정한다. 
	(4) 원하는 컴포넌트에서 해당 커스텀 훅을 호출하기만 하면 됨. (근데 커스텀 훅을 직접 호출할 수는 없으니 간접적으로 .. 이거는 직접 컴포넌트 안에서 코드를 보면 이해 될 듯)

*/
