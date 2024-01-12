import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	[ Redux 를 통한 전역 상태관리가 필요한 이유 ]


	- 리액트는 기본적으로 '단방향 데이터 바인딩'이기 때문에, '부모 -> 직계자식 컴포넌트'로만 props를 전달 가능함. 
		--> 이렇게 되면, 특정 지역 state 정보값을 여러 컴포넌트가 공유해야 하는 경우엔, props를 통해서만 전달 가능하기 때문에 데이터 전달을 위한 로직이 너무 복잡해짐. 
			--> 그래서 컴포넌트 외부에서 독립적으로 동작하는, 전역 State를 생성한 뒤, 아무리 depth가 깊은 어떠한 자식 컴포넌트라도 해당 전역 State에 접근해서 데이터를 수정, 활용, 변경요청 할 수 있도록 하기 위한 개발 방법론 
			

	- context API를 활용한 외부 라이브러리 
	- context API 란? globalContext 라는 개념의 전역 저장 객체를 생성해서, 해당 전역 객체를 하위 요소 (자식 컴포넌트) 에서 구독(=감시=subscribe) 하면서 action이라는 객체를 통해 변경 요청을 보내서, 전역 객체를 변경요청 처리할 수 있게 해주는 API 를 의미함.
	
	- context API를 활용한 내장 함수 및 훅 : react에서는 context API를 활용한 'createContext, useContext' 라는 내장 함수와 훅이 준비되어 있음. 
	- 위의 기능을 조금 더 쓰기 편하도록 라이브러리화 한 것이 바로 "redux"임. 
		(redux는 오픈 라이브러리라 리액트뿐만 아니라 어디서든 사용할 수 있음.)
	

		[ Redux 에서의 개념 및 각 역할 ]
	- store : 전역 state가 담기는 객체 
	- reducer : store에 담겨있는 전역 state를 변경할 수 있는 변형자 함수
	- action : reducer가 store에 있는 데이터를 변경하기 위한 특별한 형태의 객체. {type, payload} 가 필요함. 
	- dispatch : 컴포넌트에서 만들어진 action 객체를 reducer로 전달해주는 역할. 



	[ 자식 컴포넌트에서 부모 컴포넌트로 값을 역으로 전달하는 방법 ]
	(1) 부모 컴포넌트 내에서 빈 State를 생성하고, 자식 컴포넌트에서 State 변경 함수를 props 로 전달해서, 자식 컴포넌트에서 담은 State 값을 부모 컴포넌트에서 활용할 수 있게 함. (사실 이 방법은 엄밀하게 따지면 역으로 전달하는 건 아님)

	(2) forwardRef : 고차 컴포넌트(hoc, high order component)를 생성하는 함수
		- forwardRef(특정컴포넌트를반환하는함수) => 특정컴포넌트 함수를 인수로 받아서, 새로운 컴포넌트 반환 
		- forwardRef를 쓰는 이유는, 특정 자식 컴포넌트를, 호출하고 있는 부모 컴포넌트에서 통째로 자기 자신을 forwarding 처리해주는데, 
			(1) forwardRef 로 생성된 고차 컴포넌트는 내부적으로 useImperativeHandle 이라는 내장훅이 사용 가능. 
					특정 컴포넌트 안쪽에 있는 특정 정보값을 객체로 묶어서, 물리적으로 부모 컴포넌트에게 역으로 전달할 수 있음. 
*/
