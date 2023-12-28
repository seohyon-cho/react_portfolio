import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	// 커스텀 훅으로부터 쿠키 확인, 쿠키 생성함수 가져오기.
	const { setCookie, isCookie } = useCookie();
	// 체크박스 요소를 담을 참조 객체 생성
	const checkEl = useRef(null);
	// Close의 초기값으로 isCookie의 리턴 값을 담음.
	// Close = true : 쿠키 없음, 팝업 안 보임 / Close = false : 쿠키 없음, 팝업 보임
	const [Close, setClose] = useState(isCookie('today=done'));

	// 닫기 버튼 클릭 시 실행될 함수
	const handleClose = () => {
		const isChecked = checkEl.current.checked;
		// 함수 호출 시, 체크가 되어있으면 쿠키 생성
		if (isChecked) setCookie('today', 'done', 60 * 60 * 24);
		// 미 체크 시, 쿠키 생성 무시하고 그냥 팝업만 닫기
		setClose(true);
	};

	return (
		<>
			{/* Close값이 false 이면 팝업보임처리 */}
			{!Close && (
				<aside className='CookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<input ref={checkEl} type='checkbox' />
							<span>오늘하루 팝업보지 않기</span>
						</nav>

						<span onClick={handleClose}>close</span>
					</div>
				</aside>
			)}
		</>
	);
}

/*
  작업 흐름 
  1. 해당 컴포넌트에 특정 state 값에 따라 보이고 안 보이고 처리 
  2. 닫기 버튼 이벤트 발생 시 팝업 안 보이게만 처리 (state값만 변경)
  3. '오늘 하루 보지 않기' (체크박스) 클릭한 뒤 닫기 버튼 클릭 시, 특정 쿠키 생성 
  4. 해당 컴포넌트 마운트 시, 특정 쿠키값있으면 무조건 안 보이게 처리 
*/
