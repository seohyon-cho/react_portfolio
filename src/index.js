import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	만들어야 할 파일 종류
	actionType.js
		: 문자열인 액션의 타입명을 재활용하기 편하게 객체형태로 미리 정의해둔 액션 타입 모음집.
	store.js
		: 전역 객체를 생성하는 곳. saga 미들웨어 추가 예정.
	reducer.js
		: 전역 데이터를 변경하는 함수가 있는 곳. (기존 reducer에 비해 pending, fullfilled, rejected에 대한 추가 분기 작업을 해야함.)
	api.js
		: fetching 함수를 모아놓은 파일 (컴포넌트 외부에서, 비동기 데이터를 호출하는 함수를 한 번에 관리하기 위함.)
	saga.js
		: reducer에 전달되는 초기의 action의 type을 캐치해서, saga 자체적으로 데이터 호출 및 비동기 데이터 상태에 따른 action 객체를 만들어서 reducer에 재전달.

	
	redux  vs  redux-saga 작업 흐름 비교 

	[redux]
	: component (api 호출 및 비동기 데이터 반환 
		--> reducer (비동기 데이터를 받아서 전역 객체 생성) 
		--> store (넘겨받은 전역 객체를 저장)

	[redux-saga]
	: component (데이터 요청에 대한 액션 초기 타입만 전달) 
		--> reducer (초기 요청을 받은 뒤, saga에게 작업 전달) 
		--> saga (요청을 넘겨받은 뒤, api호출 및 비동기 데이터를 반환하여, 새로운 액션 객체 생성 후 reducer에게 전달) 
		--> reducer (saga로부터 넘겨받은 액션 객체를 통해서 전역 객체 생성) 
		--> store (넘겨받은 전역 객체를 저장)
*/

/*
		Redux-saga 버전에서의 자가진단 항목

		1. 비동기 데이터의 fetching 함수가 api.js에 등록되어 있고, 각 컴포넌트 마운트 시 fetching 호출이 있는지 확인. (member, history, youtube, flickr)
		2. client-side-data 가 saga 없이 reducer만으로 전역 관리되는지 확인 (modal, menu, dark)
		3. Layout.jsx에서 setTimeout 안쪽에 참조객체 optional chaining되어 있는지 확인
*/
