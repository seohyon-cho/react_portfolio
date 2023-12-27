import { createContext, useContext, useState } from 'react';

// 전역 데이터 객체 생성
export const GlobalContext = createContext();

// 전역 객체 생성 후, 특정 state 값들을 내부로 전달해주는 wrapping 컴포넌트 생성
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Dark, setDark] = useState(false);
	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ModalOpen, setModalOpen, Dark, setDark }}>{children}</GlobalContext.Provider>;
}

// useContext로 반환한 전체 전역 데이터를 내보내는 커스텀 훅 생성 후 export
export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}
