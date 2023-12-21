import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import memberReducer from './redux/memberSlice';
import historyReducer from './redux/historySlice';
import flickrReducer from './redux/flickrSlice';

// reducer 객체 값들을 하나로 묶어서 store 생성.
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		{/* 전역 객체 store 를 App.jsx에 전달 */}
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

// npm i @reduxjs/toolkit@1 react-redux

/*
	리덕스의 대표적인 미들웨어 2가지 (특정 추가 작업을 중간에 끼워넣는 것.)
	: 비동기 데이터의 효율적인 처리를 위함

	redux-saga
	: 액션 객체의 변환을 감시하면서 적절한 상태 변화 시점에 액션 객체를 생성해서 reducer를 전달하는 미들웨어 (generator 이용)

	redux-thunk
	: 액션 객체뿐만 아니라, 함수 자체를 reducer에게 전달하게 해주는 미들웨어이며, 해당 함수가 자동으로 액션 객체를 반환하도록 처리 

	----------

	redux-toolkit 이라는 thunk 기반의 통합 전역 관리 패키지가 나오게 된 배경 
	- 초반에는 액션 객체 자체를 중앙 집중적으로 관리하면서 reducer에 전달하는 방식이 thunk 방식에 비해서, 기존의 리덕스를 사용하는 개발자에게 더 친숙하게 다가왔기 때문에, saga를 많이 쓰게 됐었음. 
	- 문제는, saga 방식으로 하다보니, 관리할 파일의 갯수가 많아지고 코드의 관리가 어려워짐. 
	- 따라서, 전역 관리할 비동기 데이터들을 데이터 카테고리 별로 분리할 필요성이 생김.
	- 이 시점의 불편했던 thunk 방식의 코드를 개선한, redux-toolkit이라는 통합 라이브러리가 등장함. 

	[redux-toolkit 의 장점]
	- 각 데이터별로 전역 상태 관리 파일을 분리할 수 있음. 
	- 사용자가 직접 데이터 상태별로 actionType을 만들 필요가 없도록 자동 생성됨. 
	- 하나의 slice파일 안에, API 함수와 reducer 함수를 간결한 문법으로 관리할 수 있음. 
*/
