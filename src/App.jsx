import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import Footer2 from './components/common/footer2/Footer2';
import Header2 from './components/common/header2/Header2';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';

import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';
import CookieModal from './components/common/cookieModal/CookieModal';

export default function App() {
	const { Mode } = useGlobalData();
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Mode === 'dark' ? 'dark' : 'light'} ${useMedia()}`}>
				<Header2 />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Footer2 />
				<Menu />
				<CookieModal wid={300} ht={200}>
					<h1>쿠키팝업</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
	* [ REACT-QUERY 개념 정리 ] (server-side-data 관리를 담당.)
	: sever-side-data 를 static한 상태로 전역 객체 (global context) 에 물리적으로 저장하는 것이 아니라, 
	서버 쪽 데이터가 필요할 때마다 호출해서 항상 최신 상태의 서버 데이터를 사용할 수 있게 해주는 라이브러리 

	: queryKey를 통해서 fetching된 특정 promise 리턴 값을 매핑해서, 서버 요청 시 동일한 queryKey에 이미 매핑된 데이터가 있으면, 
	또 다시 re-fetching 하지 않음. 
	: 대신 queryKey로 초기 데이터 매핑 시, cacheTIme (GC Time) 과 staleTime을 지정해서, 서버 데이터의 캐시 저장 시간 및 re-fetching 금지 시간 지정

	* [ REACT-QUERY 작업 순서 ]
	1. index 혹은 App 컴포넌트에서 QueryClient 인스턴스 생성 후, Provider를 통해서 전역으로 전달함. (모든 컴포넌트에서 등록된 queryKey를 공유할 수 있게 됨.)
	2. fetching 함수와 queryKey를 등록하는 커스텀 훅을 생성함. (이때, cacheTime과 staleTime 및 서버 쿼리 관련 옵션 지정)
	3. 비동기 데이터가 필요한 컴포넌트에서 (2)에서 만든 커스텀 훅을 호출하고, 반환하는 객체의 여러 property 값을 사용함. (주로 data, isSuccess, isError, isLoading 많이 사용)

	* [ REACT-QUERY 사용 시의 장점 ]
	1. 서버 데이터를 위한 useState, useEffect, useCallback 등의 훅을 사용하지 않아도 됨. 
	2. 한 번 fetching한 내역이 있는 데이터는 queryKey가 동일하다는 전제 하에, cache에 등록된 값을 재활용하게 되므로 불필요한 서버 요청을 하지 않아도 됨. 
	3. query 옵션에 따라서, 항상 최신의 서버 데이터를 핸들링 할 수 있게 됨. 

  --------------------------------------------------------


	* [ Context API 를 활용한 전역 데이터 관리 커스텀 훅 ] (client-side-data 관리를 담당.)
	: 복잡한 서버 데이터는 이미 REACT-QUERY 가 관리하고 있으므로, 간단한 client-side-data를 굳이 redux 같은 외부 라이브러리로 관리할 필요가 없음. 
	: react에 기본적으로 내장되어 있는 context API 기반의 createContext, useContext 를 이용한 커스텀 훅을 사용함.
	
	* [ Context API 기반 커스텀 훅을 사용하는 작업 순서 ]
	1. createContext 로 전역 context 를 생성함. (store 개념)
	2. 전역 context 에 내장되어 있는 Provider로 App 컴포넌트를 감싸고, 전역으로 관리할 State를 전달함. 
	3. 자식 컴포넌트에서는 useContext를 활용해서, 자유롭게 전역 Context 값에 접근 가능하게 됨. 
*/
