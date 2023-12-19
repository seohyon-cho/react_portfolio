import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, scale: 0, rotate: -45 }}
					animate={{ opacity: 1, scale: 1, rotate: 0 }}
					exit={{ opacity: 0, scale: 2, rotate: 45, transition: { delay: 0.5 } }}
					transition={{ duration: 1 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}>
						{children}
					</motion.div>
					<span onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
