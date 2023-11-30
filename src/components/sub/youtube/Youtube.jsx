import Layout2 from '../../common/layout2/Layout2';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');
	const [Vids, setVids] = useState([]);
	console.log(Vids);

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
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<div className='Youtube'>
			<Layout2 title={'Youtube'}>
				{Vids.map((data, idx) => {
					const [date, time] = data.snippet.publishedAt.split('T');

					return (
						<article key={data.id}>
							<h2>{shortenText(data.snippet.title, 50)}</h2>

							<div className='txt'>
								<p>{shortenText(data.snippet.description, 250)}</p>
								<div className='infoBox'>
									<span>{customText(date, '.')}</span>
									<em>{time.split('Z')[0]}</em>
								</div>
							</div>

							<div className='pic'>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout2>
		</div>
	);
}
