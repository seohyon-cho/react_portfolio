import './CookieModal.scss';

export default function CookieModal({ wid, ht }) {
	return <aside className='CookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}></aside>;
}
