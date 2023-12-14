import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	[ redux ] 

	- store : 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있도록 컴포넌트 외부에 있는 독립적인 전역 데이터 공간.
	- reducer : action으로부터 받은 데이터를 변형한 뒤, 이렇게 변형한 데이터를 store에 전달해주는 변형자 함수 (action 객체를 전달받아야지만 store에 변경 요청이 가능하게 됨.)
	- action : 컴포넌트가 reducer에 데이터 변경 요청을 의뢰할 때에 필요한 특별한 형태의 객체 {type: '타입', payload: '(변경할)데이터'}
			--> 여기까지는 react 가 아닌 순수 redux의 기능

			--> 여기부터는 react 컴포넌트의 기능을 가져와야 하므로 react-redux 의 기능.
	- dispatch : 컴포넌트에서 action 객체를 전달할 때에는, 무조건 dispatch를 통해서만 전달할 수 있음. 
	- selector : 컴포넌트에서 전역 store에 있는 데이터를 요청할 때에는, 무조건 selector를 통해서만 호출할 수 있음. 
*/
