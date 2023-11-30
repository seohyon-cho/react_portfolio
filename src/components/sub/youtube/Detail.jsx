import { useEffect, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	console.log(YoutubeData);
	const fetchSingleData = async () => {
		const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setYoutubeData(json.items[0].snippet);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchSingleData();
	}, []);

	return (
		<Layout2 title={'Detail'}>
			<h3>{id}</h3>
		</Layout2>
	);
}
