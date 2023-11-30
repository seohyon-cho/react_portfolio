import Layout2 from '../../common/layout2/Layout2';
import './Youtube.scss';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	console.log(Vids);

	/*
		기존의 promise then 구문을 async await 로 변경하기 위한 조건 2가지 
		(1) 무조건 promise 반환 함수를 감싸주는 wrapping 함수가 필요함. (wrapping함수에 async 지정)
		(2) await 문은, promise 반환 함수에만 지정 가능. (fetch 처럼)
	*/
	const fetchYoutube = async () => {
		const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
		const pid = 'PLYOPkdUKSFgWqafuDQN9di3uLJoTV3L3W';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}

		// fetch(baseURL)
		// 	.then((data) => data.json())
		// 	.then((json) => {
		// 		setVids(json.items);
		// 	});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<div className='Youtube'>
			<Layout2 title={'Youtube'}>
				<p>youtube 전용 콘텐츠</p>
			</Layout2>
		</div>
	);
}
