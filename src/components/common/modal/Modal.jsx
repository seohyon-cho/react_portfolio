import './Modal.scss';

export default function Modal({ setOpen }) {
	return (
		<aside className='Modal'>
			<div className='con'></div>
			<span onClick={() => setOpen(false)}>close</span>
		</aside>
	);
}
