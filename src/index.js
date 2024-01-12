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
	[ 해당 브랜치에서 redux-saga 로 작업을 진행한 이유 ]

	- redux로 비동기 데이터를 전역 관리하려다보니, redux는 기본적으로 특정 정적인 데이터를 저장하는 역할만 하고 있음. 
	- redux 자체적으로는 비동기 데이터를 동기화 처리하기 위한 로직이 없음. 
	- redux-saga, redux-thunk, redux-toolkit 같은 redux 전용의 미들웨어의 필요성이 대두됨. 
	- action 객체가 컴포넌트에서 생성이 됨 (이때 payload가 포함 됨 / 컴포넌트 자체가 패칭해서 타입, 페이로드값을 포함하여 넘어가게 되는 것) reducer (비동기 관련 미들웨어가 없을 때)
	- 액션 객체가 컴포넌트에서 생성이 됨 (타입만 있음, 페이로드 없음) --> saga(미들웨어)가 개입 : 미들웨어가 대신 비동기 데이터 요청을 수행 후 초기 액션 객체 생성 --> reducer가 받아서 처리 
			- 데이터 패칭을 미들웨어가 처리하는 거임
	
	- generator 기반으로 promise 객체의 상태값을 내부적으로 분석 및 판단해서, 자체적으로 yield 문으로 동기화 처리 후 반환된 값을 reducer에게 전달 

	- generator 함수란? 여러 개의 함수의 리턴 값을 동기적으로 반환하게 하는, 이터러블 객체를 생성해주는 함수


	[ redux-saga 로 비동기 데이터를 전역관리함으로서 개선된 점 ]

	(1) api 함수를 별도로 컴포넌트 외부에서 정의한 후, saga 미들웨어를 통해서 비동기 데이터의 상태에 따라 적절한 시점에 비동기데이터를 action 객체에 담아 reducer에 자동으로 전달되도록 처리해주므로, 전역 state에 저장될 데이터의 동기화 이슈에 대해 신경 쓸 필요가 없어졌음. 
	(2) 프로젝트에서 수시로 데이터 변경 요청이 일어나는 flickr 데이터도 컴포넌트 외부에서 saga로 편리하게 관리가 가능해짐. 


	[ redux-saga 를 적용하면서 개인적으로 느낀 아쉬운 점 ]

	(1) 비동기 데이터를 관리하기 위해 설정해야 하는 함수와 파일이 너무 많아져서, 코드 관리가 오히려 더 어려워짐. 
	(2) 코드 자체가 너무 중앙집중적이기 때문에, 전역관리할 비동기데이터가 많아질수록 파일 하나 하나에 있는 코드량이 비대해져서 관리가 어려움. 
	(3) saga 전용의 메소드를 숙지해야 하는 러닝 커브가 높음 (call, put, takeLastest, fork)
		--> 해당 문제점을 개선하기 위해서 또 다른 redux 비동기 데이터 관련 미들웨어를 찾던 중, redux-toolkit 을 알게 됨. 
			--> redux-toolkit 에 대한 가이드 문서 내용 페이지 참조 링크 형태로 곁들이기 p.100

*/
