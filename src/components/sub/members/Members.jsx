import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Members.scss';

export default function Members() {
	const initVal = useRef({
		userid: '',
		email: '',
		comments: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: ''
	});

	const [Val, setVal] = useState(initVal.current);

	// 실시간으로 이루어짐.
	const handleChange = e => {
		// const key = e.target.name; // userid
		// const value = e.target.value; // 현재 입력하고 있는 input 값
		// 비구조화 할당으로 가져오기
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		console.log(Val);
	}, [Val]);

	return (
		<Layout2 title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								{/* 리액트에서는 thead는 생략해도 되지만, tbody는 꼭 써줘야 오류 안 생김. */}
								<tbody>
									{/* userid, email */}
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											{/* select 와 option 은 한 세트로 써야 함. */}
											<select name='edu' onChange={handleChange}>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											{/* 사용자로부터 직접 입력받아 사용하는 건 value, 사전에 지정해둔 값을 선택하게 해서 사용하는 건 defaultValue */}
											{/* input 의 id 와 label 의 htmlFor 는 같게 매치시켜줘야 함. (스크린 리더기 때문에) */}
											<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
											<label htmlFor='male'>Male</label>
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' />
											<label htmlFor='game'>Game</label>
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}></textarea>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout2>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음

	리액트에서의 폼 인증 구현 로직 순서
	1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 반환
	3. 폼에 submitHandler 함수를 연결
	4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
	5. check함수가 내보내는 err객체가 없으면 인증 성공처리
*/
