import Layout2 from '../../common/layout2/Layout2';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	console.log(id);
	return (
		<Layout2 title={'Detail'}>
			<h3>{id}</h3>
		</Layout2>
	);
}
