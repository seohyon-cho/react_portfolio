import './Layout2.scss';

export default function Layout2({ children }) {
	return (
		<main className='Layout2'>
			<h1>Title</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}
