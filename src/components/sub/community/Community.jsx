import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Community.scss';
import { GrUndo } from 'react-icons/gr';
import { TfiWrite } from 'react-icons/tfi';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// localStorage에 post라는 키값의 데이터가 있으면 parsing해서 리턴
		if (data) return JSON.parse(data);
		// post라는 키값의 데이터가 없으면 그냥 빈 배열을 리턴 (해당 컴포넌트가 최초로 호출될 때 (제일 처음 호출될 때) 한 번)
		else return [];
	};
	const [Post, setPost] = useState(getLocalData);
	const refTit = useRef(null);
	const refCon = useRef(null);
	// input 초기화 함수
	const resetPost = (e) => {
		refTit.current.value = '';
		refCon.current.value = '';
	};
	// 글 저장 함수
	const createPost = (e) => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요!');
		}
		e.preventDefault();
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
		resetPost();
	};
	const deletePost = (delIndex) => {
		// console.log(delIndex);
		// filter : 기존의 map과 마찬가지로, 기존의 배열값을 deep copy 해서 새로운 배열을 반환하되, 이때 안쪽에서 조건문을 처리해서 특정 조건에 부합하는 값만 필터링해서 return으로 내보냄.

		// 만약 파라미터 (el, idx) 중 el가 존재는 하지만 사용하지 않는 파라미터라고 하면, _ 언더바를 써서 비울 수 있음.
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
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
									</div>
									<nav>
										<button>Edit</button>
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

/*
	게시판 같은 기능을 만들 페이지임. 

	1. 글 입력 박스, 글 출력 박스를 각각 분리해서 생성 
	2. 전체 글을 관리할 배열 state를 생성 [{글정보1}, {글정보2}, {글정보3}]
	3. 글 입력 박스에 글을 입력 후 저장 버튼 클릭 시, 글 정보를 객체형태로 state에 계속 추가. (Create)
	4. state 배열에 추가된 객체 값들을 반복 돌면서, 글 리스트 출력. (Read)
	5. 글 출력 시 삭제&수정 버튼을 추가해서 출력 
	6. 글 리스트에서 삭제 버튼 클릭 시 state 배열에서 이벤트가 발생한 순번의 객체를 제거해서 글 삭제. (Delete)

	- Create (데이터 저장) -> 글 작성
	- Read (데이터 호출) -> 글 목록 보기
	- Update (데이터 변경) -> 글 수정
	- Delete (데이터 삭제) -> 글 삭제

	LocalStorage : 모든 브라우저가 내장하고 있는 경량의 저장소 
	-- 문자 값만 저장 가능. (5MB)
	-- 로컬 저장소에 문자열 이외의 값을 저장할 때에는, 강제로 문자화시켜서 저장. 
	-- 로컬 저장소의 값을 JS(스크립트)로 가져올 때에는, 반대로 문자값을 객체화시켜서 호출해야 함. 

	LocalStorage 객체에 활용 가능한 메서드
	- setItem('키값', '문자화된 데이터'); 해당 키값에 데이터를 담아서 저장.
	- getItem('키값'); 해당 키값에 매칭이 되는 데이터를 가져옴. (호출)
*/
