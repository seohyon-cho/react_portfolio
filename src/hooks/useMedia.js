import { useEffect, useState } from 'react';

export const useMedia = (opt) => {
	const defOpt = { mobile: 640, tablet: 1000, laptop: 1400 };
	const result = { ...defOpt, ...opt };
	const [Type, setType] = useState('');

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= result.laptop) setType('');
		if (wid >= result.tablet && wid < result.laptop) setType('laptop');
		if (wid >= result.mobile && wid < result.tablet) setType('tablet');
		if (wid >= 0 && wid < result.mobile) setType('mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);
		return () => window.removeEventListener('resize', getClientWid);
	}, []);

	return Type;
};
