import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

/*
	[[ framer-motion 관련 문법 및 개념 ]]

	AnimatePresence : 모션을 적용할 컴포넌트의 wrapping 컴포넌트 지정 
	- 자식 요소의 모션이 끝날 때까지 컴포넌트가 unmount 되는 시점을 holding처리 

	motion : 모션을 걸고 싶은 JSX 컴포넌트에 연결해서 각각 initial, animate, exit라는 속성으로 모션 수치 값을 조절 가능하게 함.

	- initial : 모션이 일어나기 전의 상태 값
	- animate : 모션이 일어날 때의 상태 값
	- exit : 모션이 끝날 때의 상태 값 (해당 컴포넌트가 사라질 때의 상태 값)

*/
export default function Modal({ Open, setOpen, children }) {
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, scale: 0, rotate: -45 }}
					animate={{ opacity: 1, scale: 1, rotate: 0 }}
					exit={{ opacity: 0, scale: 2, rotate: 45 }}
					transition={{ duration: 0.5 }}
				>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
