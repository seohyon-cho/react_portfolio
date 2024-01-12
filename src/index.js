import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import memberReducer, { fetchMember } from './redux/memberSlice';
import historyReducer, { fetchHistory } from './redux/historySlice';
import flickrReducer, { fetchFlickr } from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';
import darkReducer from './redux/darkSlice';

// reducer 객체 값들을 하나로 묶어서 store 생성.
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
		dark: darkReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		{/* 전역 객체 store 를 App.jsx에 전달 */}
		<Provider store={store}>
			<App api={[fetchFlickr, fetchHistory, fetchMember, fetchYoutube]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

// npm i @reduxjs/toolkit@1 react-redux

/*
	[ redux-toolkit 의 개념 ] 

	: redux, thunk 미들웨어, immer.js 가 포함된 통합 라이브러리 
		- redux-thunk : redux-saga 와 더불어서 많이 쓰이는 비동기 데이터 관련 미들웨어 
				--> redux-thunk는 액션 객체뿐만 아니라 함수까지 객체로 묶어서 reducer로 전달하는 방식
	: immer.js 를 기반으로 하여, redux-saga 대비 코드의 구조가 많이 간결해짐 




	[ redux-toolkit 작업 흐름 ]

	(1) redux 폴더 안에 데이터의 카테고리별로 Slice.js 파일을 생성하고, slice.js 안에서 asyncThunk(비동기데이터 반환 및 액션 객체 생성함수)와 reducer 역할을 해주는 slice 함수를 같이 정의한다.
	(2) index.js에서, 개별적인 slice함수가 반환하는 각각의 객체를 합쳐서, const store = 로 store를 만든 다음, <Provider></Provider> 컴포넌트를 이용해 App.jsx에 전달한다.
	(3) fetching 함수도 같이 App.jsx에 props로 전달한다. 
	(4) App.jsx에서 배열로 전달된 데이터별 thunk함수는, 반복호출하면서 dispatch로 slice에게 전달해준다. 




	[ 해당 브랜치 (프로젝트) 에서 redux-toolkit 을 채택하게 된 이유 ]

	(기존)
	- redux-saga는 숙지해야 할 saga 전용 메서드가 너무 많고, 관리해야 할 비동기 데이터가 늘어남에 따라 파일 구조가 복잡하게 비대해져서 코드 관리가 어려워지며, 액션 타입을 일일히 지정하는 것도 불편하며, 특정 카테고리의 비동기 데이터를 관리하기 위해서는 saga, reducer, api, actionType 등 여러 파일을 같이 봐야 하는 번거로움이 있었음. 
	또한, 비동기 데이터의 카테고리별로 관리하기가 힘들었음. 

	(redux-toolkit을 쓰게 되면서 개선된 점 (장점))
	- toolkit의 slice파일의 reducer가 자동으로 asyncThunk 메서드가 반환하는 비동기 promise의 상태값을 인지하여, 분기처리를 해줌. (= 일일히 actionType을 지정할 필요가 없어짐.) (promise의 상태값: pending, fulfilled, rejected 상태를 인지해서 내부적으로 고유의 actionType을 자동 생성해줌. )
	- api함수 및 reducer함수를 slice 파일 하나로 관리할 수 있기 때문에, 코드의 복잡도가 많이 내려가게 되고, 내가 전역 관리 하려고 하는 비동기 데이터 자체의 관리에만 집중할 수 있게 됨. 


	[ redux-toolkit 의 단점 ]

	- 처음에는 자주 쓰는 비동기 데이터를 전역 데이터에 저장해서 재활용하는 것이, 불필요하게 refetching을 하지 않아서 편하다고 생각했음. 
	- (**중요포인트!) 그러나, 비동기데이터 (서버데이터) 는 클라이언트에게 제어권이 없는, 수시로 변경되는 데이터인데, fetching한 그 순간의 정적인 상태로 전역 store에 저장한다는 것 자체가 적절하지 않은 것 같다고 판단했음. (store에 저장되어 있는 비동기 데이터는 최신 데이터가 아니고, fetching된 그 시점의 outdated (옛날) data를 모든 컴포넌트에서 공유하는 것이, 데이터의 신뢰성 문제가 있을 것으로 생각되었음.)
	- 비동기 데이터를 컴포넌트에서 활용하기 위해서는 << state를 생성하고, fetching함수를 정의하고, useCallback으로 fetching함수를 메모이제이션하고, useEffect에서 해당 함수를 호출 >> 해야 하는 일련의 작업이 번거로움. 

	- 그래서 알아보던 중, 이제는 비동기 데이터를 전역에 저장하는 것이 아니라, react-query 라는 새로운 개념의 비동기 데이터 관리 방법을 알게 됨. 
			(*) react-query 관련 가이드 문서 내용 페이지를 참조 링크 형태로 곁들이기 (p.100)

*/
