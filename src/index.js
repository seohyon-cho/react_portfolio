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
	[ Redux 버전에서 반드시 숙지해야 할 내용 ]
	1. flickr를 제외하고, 비동기 데이터를 사용하는 컴포넌트에서 store에서 데이터를 공유하고 있는지. (Member, History, Youtube 관련)
	2. client sida data 가 store로 공유되고 있는지. (Modal, Menu, Dark theme 관련)
	3. Layout에서 0.3초 후에 클래스 on이 붙게 되는데, 라우터 간 이동이 0.3초보다 빠르게 이루어질 때 optional chaining 으로 에러 핸들링하고 있는지.
	4. contact 컴포넌트에서 throttle이 적용된 throttledSetCenter resize이벤트 연결문을 따로 useEffect문으로 분리해두었는지.
*/
