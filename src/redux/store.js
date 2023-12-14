// 전역 데이터가 관리되는 곳
import { createStore } from 'redux';
import reducers from './reducer';

// store 공간을 생성한 다음, reducer가 전달해주는 데이터를 저장하는 것.
const store = createStore(reducers);

export default store;
