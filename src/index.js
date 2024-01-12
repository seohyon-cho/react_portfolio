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
	[ redux 의 작업 흐름 ]
	1. redux 폴더 안에 << store를 생성하는 함수, reducer 함수, actionType 문자열을 저장하는 객체 >> 를 준비한다.
	2. index.js 에서 redux 폴더 안에서 생성한 store 객체를 <Provider></Provider> 컴포넌트를 통해 App.jsx에 전달한다. (=> 모든 컴포넌트는 useSelector 훅을 사용해 store에 접근이 가능하게 됨.)
	3. 루트 컴포넌트인 App이 마운트되자마자 비동기 데이터를 fetching 후, action 객체에 actionType과 함께 같이 담아주고, dispatch로 reducer 함수에 전달한다. 
	4. reducer 함수가 컴포넌트로부터 전달 받은 action 객체의 타입을 확인해서, 타입에 따라 같이 전달된 payload 값으로 store에 있는 데이터를 변경 처리한다. 
	5. 단, client side data (주로 정적인 형태. 문자열, boolean 등,,) 의 경우에는, 애초에 reducer 함수에서 초기값을 할당해서 저장한다.  
*/

/*
	[ 해당 프로젝트에서 Redux를 사용한 이유 (왜 썼는지) 와 한계점 ]
	- 서브 컴포넌트에서 활용하고 있는 회사정보, 연혁정보, youtube 영상, flickr 같은 정보값들을 메인 컴포넌트에 미리 보기 형식으로 출력할 수 있게 하고자. 
	- 분명 같은 데이터를 활용하고 있는 것인데, 다시 또 메인 컴포넌트에서 fetching 하는 것은 비효율적이고, props로 전달하기에는 컴포넌트가 너무 지저분해짐. 
		--> 그래서 효율적으로 전역 데이터 관리하는 것에 대해 관심이 생김. 
	- redux를 활용해서 루트 컴포넌트인 App.jsx 마운트 시, 전역으로 관리할 모든 클라이언트 & 서버 사이드 데이터를 전역에 담아서 활용함. 
	- 그런데, 문제 발생. 클라이언트 사이드 데이터와 자주 갱신될 필요가 없는 연혁, 멤버 정보, 유튜브데이터 같은 비동기 데이터는 redux로 전역 관리하는 데에 문제가 없었지만, flickr 같이 사용자 이벤트에 의해서 수시로 변경이 되어야 하는 데이터 같은 경우에는, redux로 관리하기에는 한계점이 있다고 느낌. 
		--> (한계점: redux 안에서는, api함수를 컴포넌트 외부에서 공유해서 쓸 수 있는 방법이 없기 때문에 App에서도 api함수를 정의해서 fetching처리를 한 뒤 action객체를 생성하고, 또 갤러리컴포넌트 (타 컴포넌트, 하위 컴포넌트) 안쪽에서도 똑같은 api함수를 또 생성해서 매번 action객체를 생성해 전달해야하는 번거로움이 발생)
				--> 추후, redux-saga 브랜치에서 해당 문제점을 개선했음. (이에 대한 가이드 내용이 있는 페이지만 참조 링크식으로 곁들이기)

	- store, reducer, action객체는 컴포넌트 외부에서 독립적으로 동작해야 하므로, 부수 효과를 발생시키지 않는 순수 함수 형태로 로직이 처리되어야 함. 
	- 순수 함수란? 동일한 인수가 전달되었을 때, 동일한 return 값을 반환하는 (부수 효과를 발생시키지 않는) 함수
		- 부수 효과란? 순수 자바스크립트 기능이 아닌, 외부 요인으로 인해 예상치 못 한 return값을 반환하는 현상
*/

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
	(컴포넌트 자체를 참조할 수 있게 해주는 것.)
		- forwardRef(특정컴포넌트를반환하는함수) => 특정컴포넌트 함수를 인수로 받아서, 새로운 컴포넌트 반환 
		- forwardRef를 쓰는 이유는, 특정 자식 컴포넌트를, 호출하고 있는 부모 컴포넌트에게 통째로 자기 자신을 forwarding (상위로 전달) 처리해주는데, 
			(1) forwardRef 로 생성된 고차 컴포넌트는 내부적으로 useImperativeHandle 이라는 내장훅이 사용 가능. 
					특정 컴포넌트 안쪽에 있는 특정 정보값을 객체로 묶어서, 물리적으로 부모 컴포넌트에게 역으로 전달할 수 있음. 
*/
