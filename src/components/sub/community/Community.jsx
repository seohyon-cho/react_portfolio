import { useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Community.scss';
import { GrUndo } from 'react-icons/gr';
import { TfiWrite } from 'react-icons/tfi';

export default function Community() {
	const [Post, setPost] = useState([]);
	const refTit = useRef(null);
	const refCon = useRef(null);
	console.log(Post);
	const handleSubmit = (e) => {
		e.preventDefault();
		setPost([...Post, { title: refTit.current.value, content: refCon.current.value }]);
	};

	return (
		<div className='Community'>
			<Layout2 title={'Community'}>
				<div className='wrap'>
					<div className='inputBox'>
						<form onSubmit={handleSubmit}>
							<input type='text' placeholder='title' name='tit' ref={refTit} />
							<textarea cols='30' rows='3' placeholder='content' name='con' ref={refCon}></textarea>

							<nav>
								<button type='reset'>
									<GrUndo />
								</button>
								<button type='submit'>
									<TfiWrite />
								</button>
							</nav>
						</form>
					</div>
					<div className='showBox'></div>
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
*/
