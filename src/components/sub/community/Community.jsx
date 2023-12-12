import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Community.scss';
import { GrUndo } from 'react-icons/gr';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const [Post, setPost] = useState(getLocalData);
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);

	const resetPost = e => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	const createPost = e => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요!');
		}

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};
	const deletePost = delIndex => {
		if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	// 글 수정하는 함수
	const updatePost = updateIndex => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과 본문을 모두 입력하세요!');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	// 수정모드 변경 함수
	const enableUpdate = editIndex => {
		// (1) 기존의 Post 배열을 반복 돌면서, 파라미터로 전달된 editIndex 순번의 포스트에만 enableUpdate = true; 라는 구분자를 추가해서 다시 state 변경 처리
		// 다음 번 렌더링 때, 해당 구분자가 있는 포스트 객체만 수정모드로 분기처리하기 위함임.

		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	// 다시 출력모드로 변경해주는 함수
	const disableUpdate = editIndex => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	useEffect(() => {
		// Post 데이터가 변경되면 수정 모드를 강제로 false처리하면서 이를 로컬저장소에 저장하고, 컴포넌트 재실행.
		Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<div className='Community'>
			<Layout2 title={'Community'}>
				<div className='communityWrap'>
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

							if (el.enableUpdate) {
								// 수정모드
								return (
									<article key={el + idx}>
										<div className='txt'>
											<input type='text' defaultValue={el.title} ref={refEditTit} />
											<textarea cols='30' rows='4' defaultValue={el.content} ref={refEditCon}></textarea>
											<span>{strDate}</span>
										</div>
										<nav>
											{/* 수정모드일 때 해당 버튼 클릭 시 다시 출력모드 변경 */}
											<button onClick={() => disableUpdate(idx)}>Cancel</button>
											<button onClick={() => updatePost(idx)}>Update</button>
										</nav>
									</article>
								);
							} else {
								// 출력모드
								return (
									<article key={el + idx}>
										<div className='txt'>
											<h2>{el.title}</h2>
											<p>{el.content}</p>
											{/* 변환된 날짜값 최종 출력 */}
											<span>{strDate}</span>
										</div>
										<nav>
											<button onClick={() => enableUpdate(idx)}>Edit</button>
											<button onClick={() => deletePost(idx)}>Delete</button>
										</nav>
									</article>
								);
							}
						})}
					</div>
				</div>
			</Layout2>
		</div>
	);
}

/*
	[[ 글 수정 로직 단계 ]]

	1. 각 포스트에서 수정 버튼 클릭 시, 해당 객체의 enableUpdate = true; 라는  property를 동적으로 추가 후, state에 저장. 
	2. 다음 번 렌더링 사이클에서, 포스트를 반복 돌며 객체에 enableUpdate 값이 true이면 제목 본문을 input 요소에 담아서 출력되도록 분기처리. (출력 시 수정모드로 분기처리해서 출력하는 것.)
	3. 수정 모드일 때에는, 수정취소 & 수정완료 버튼 생성
	4. 수정 모드에서 수정취소 버튼 클릭 시, 해당 post 객체에만 enableUpdate 값을 false로 변경해서 다시 출력모드로 변경.
	5. 수정 모드에서 수정완료 버튼 클릭 시, 해당 form 요소에 수정된 value값을 가져와서 저장한 뒤, 다시 출력모드로 변경. 
*/
