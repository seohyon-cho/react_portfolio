// store에 요청을 보내는 함수가 있는 곳
import { combineReducers } from 'redux';
/*
	지금 같은 구조는 실무에서 쓰이기 힘듦.
	왜냐하면 원래, 데이터는 자체DB이든, 외부 API데이터이든, 어쨌든 fetching을 통해 외부 데이터를 가져와야 되므로, 이처럼 reducer 내에 const 로 초기 데이터를 설정하는 것이 불가능함. 

	--> 이게 바로 dispatch 가 필요한 이유

	[dispatch로 외부 데이터를 fetching후 전역 state에 담는 순서]
	1. 컴포넌트 안쪽에서, useEffect로 mount시 fetching함수 호출 후 데이터 반환 받기.
	2. 해당 데이터를 지역 state에 담지 않고, action 객체의 payload에 담아서 dispatch로 reducer에 전달.
	3. 하단의 reducer 함수의 로직에 의해서, fetching된 데이터가 store에 전달되고,
	4. 이후 각 컴포넌트에서 useSelector를 사용하여 해당 데이터에 자유롭게 접근할 수 있게 됨.
*/

const initMember = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

// 위의 초기 데이터 값을 state로 지정하고, 추후 action 객체가 넘어오게 되면, action의 type에 따라서 해당 데이터를 변경해주는 변형자 함수
// initMember라는 초기 데이터 값을 state로 지정함.
// action 객체의 구조 --> {type: 'SET_MEMBERS', payload:[변경할데이터배열]}

// if 버전
/*
const memberReducer = (state = initMember, action) => {
	if (action.type === 'SET_MEMBERS') {
		// 초기 state 값을 딥 카피 한 뒤, 상단의 initMember의 members라는 key값 안 쪽에 있는 값을 배열값으로 덮어쓰기...
		return { ...state, members: action.payload };
	} else {
		// 조건에 안 맞으면 기존 state 그대로 return 으로 반환.
		return state;
	}
};

// switch 버전 (위랑 똑같은 내용인데 switch를 좀 더 많이 씀.)
*/
const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

// store는 하나의 객체만 담을 수 있기 때문에,
// 해당 파일에서 내보내는 여러 개의 reducer 객체를 합친 후, 외부로 export
// {}안에는 내보낼 reducer 객체 이름들을 모두 집어넣으면 됨. {a, b, c, ...}
const reducers = combineReducers({ memberReducer });
export default reducers;
