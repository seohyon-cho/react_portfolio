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

	const enableUpdate = editIndex => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

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
								return (
									<article key={el + idx}>
										<div className='txt'>
											<input type='text' defaultValue={el.title} ref={refEditTit} />
											<textarea cols='30' rows='4' defaultValue={el.content} ref={refEditCon}></textarea>
											<span>{strDate}</span>
										</div>
										<nav>
											<button onClick={() => disableUpdate(idx)}>Cancel</button>
											<button onClick={() => updatePost(idx)}>Update</button>
										</nav>
									</article>
								);
							} else {
								return (
									<article key={el + idx}>
										<div className='txt'>
											<h2>{el.title}</h2>
											<p>{el.content}</p>
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
	[ 해당 페이지 (Community.jsx) 에서의 개발 흐름 ]

	- localStorage 를 활용하여 간단한 메모장 CRUD 기능 구현 
	- 해당 컴포넌트 안에서 글 작성, 글 출력, 글 수정, 글 삭제 기능을 구현
	- pagination 기능 구현 


	[ 해당 프로젝트 진행하면서 발생한 이슈 사항 ]

	(1) 단지 특정 데이터의 동적 출력이 아닌, 입출력 작업이 모두 수행되어야 하다보니, 계속 초기화되는 state가 아닌 localStorage 활용해야 했음. 
	(2) 처음 컴포넌트 마운트 시, localStorage에 초기값이 없는 상태라 오류 발생. 
	(3) 다른 사용자의 브라우저에서는 초기값이 없어 초기에 빈화면이 출력되는 문제점 발생. 
	(4) 메모 데이터가 많아지면서 한 화면 내에서 너무 많은 데이터(메모박스)가 생기게 되면서 UI가 지저분해짐. 
	(5) 특정 포스트 수정 도중, 다른 포스트의 수정버튼을 클릭 시, 복수 개의 포스트가 수정모드로 변경되는 문제점 발생.


	[ 해결 방안 ]

	(1), (2), (3) 마운트되자마자 초기에 일단 무조건 localStorage에 더미데이터를 문자화하여 초기값으로 저장 후 활용 
	(4) 전체 데이터 갯수 대비 한 페이지당 보일 데이터 갯수를 계산해서, pagination 기능 구현 
	(5) 특정 포스트가 수정모드로 전환되면, 전환되어있는동안에는 다른 포스트들의 수정모드 버튼은 잠시 비활성화 처리. 
*/
