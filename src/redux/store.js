import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
// reducers 라는 객체에 sagaMiddleware 가 적용되도록 처리한 것.
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
