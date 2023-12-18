import { useEffect, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import './Info.scss';
import postData from './dummyPosts.json';

export default function Info() {
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	// info 컴포넌트에서는, 오로지 미리보기형식으로 보여주기만 하므로 (수정X) setPost 빼도 됨.
	const [Post] = useState(getLocalData);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<section className='Info'>
			<div className='showBox'>
				{Post.map((el, idx) => {
					const date = JSON.stringify(el.date);
					const strDate = changeText(date?.split('T')[0].slice(1), '.');
					if (idx >= 4) return null;

					return (
						<article key={el + idx}>
							<div className='txt'>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
								<span>{strDate}</span>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
