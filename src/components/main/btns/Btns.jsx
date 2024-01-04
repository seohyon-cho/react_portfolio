import { useRef, useState } from 'react';
import './Btns.scss';

export default function Btns() {
	const [Index, setIndex] = useState(0);

	const num = useRef(4);

	return (
		<ul className='Btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}
