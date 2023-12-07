import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Community.scss';
import { GrUndo } from 'react-icons/gr';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	// 추후에 가져올 시간 값에서, -을 .으로 변경하기 위해 combined 타입의 텍스트 변환 함수를, 텍스트 관련 커스텀 훅으로부터 활성화
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData);
	const refTit = useRef(null);
	const refCon = useRef(null);

	const resetPost = (e) => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	const createPost = (e) => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요!');
		}

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};
	const deletePost = (delIndex) => {
		if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	const filtering = (txt) => {
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<div className='Community'>
			<Layout2 title={'Community'}>
				<div className='wrap'>
					<div className='inputBox'>
						<input type='text' placeholder='title' ref={refTit} />
						<textarea cols='30' rows='3' placeholder='content' ref={refCon}></textarea>

						<nav>
							<button onClick={resetPost}>
								<GrUndo />
							</button>
							<button onClick={createPost}>
								<TfiWrite />
							</button>
						</nav>
					</div>
					<div className='showBox'>
						{Post.map((el, idx) => {
							const date = JSON.stringify(el.date);
							const strDate = changeText(date?.split('T')[0].slice(1), '.');

							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										{/* 변환된 날짜값 최종 출력 */}
										<span>{strDate}</span>
									</div>
									<nav>
										<button onClick={() => filtering('a')}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						})}
					</div>
				</div>
			</Layout2>
		</div>
	);
}
