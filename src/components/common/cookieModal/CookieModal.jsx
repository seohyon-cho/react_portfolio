import { useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	const { setCookie, isCookie } = useCookie();
	const [ModalShow, setModalShow] = useState(true);
	const [MakeCookie, setMakeCookie] = useState(false);

	if (isCookie('today=done') === false && ModalShow) {
		return (
			<aside className='CookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
				<div className='content'>{children}</div>
				<div className='controls'>
					<nav>
						<input type='checkbox' onChange={() => setMakeCookie(!MakeCookie)} />
						<span>오늘 하루 팝업 보지 않기</span>
					</nav>

					<span
						onClick={() => {
							if (MakeCookie) {
								setCookie('today', 'done', 10);
							}
							setModalShow(false);
						}}>
						닫기
					</span>
				</div>
			</aside>
		);
	} else {
		return null;
	}
}

/*
  작업 흐름 
  1. 해당 컴포넌트에 특정 state 값에 따라 보이고 안 보이고 처리 
  2. 닫기 버튼 이벤트 발생 시 팝업 안 보이게만 처리 (state값만 변경)
  3. '오늘 하루 보지 않기' (체크박스) 클릭한 뒤 닫기 버튼 클릭 시, 특정 쿠키 생성 
  4. 해당 컴포넌트 마운트 시, 특정 쿠키값있으면 무조건 안 보이게 처리 
*/
