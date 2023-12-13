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
		gender: '',
		interest: []
	});

	const [Val, setVal] = useState(initVal.current);
	const [Errs, setErrs] = useState({});

	// 실시간으로 이루어짐.
	const handleChange = e => {
		// const key = e.target.name; // userid
		// const value = e.target.value; // 현재 입력하고 있는 input 값
		// 비구조화 할당으로 가져오기
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		// input들을 반복 돌면서, input.checked가 true (=체크 되어 있는 것.) 일 때, checkArr 이라는 빈 배열에 input의 value를 push로 집어넣음.
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	// 인증 절차 함수 로직
	const check = value => {
		const errs = {};
		// 정규표현식 : 문자열 안에 패턴을 만들어서, 그 패턴을 ...
		// [0-9] 모든 숫자
		const num = /[0-9]/;
		// [a-z] 모든 소문자 알파벳과 모든 대문자 알파벳
		const txt = /[a-zA-Z]/;
		// 특수문자 (예약어 기능이 있는 특수기호는 색상이 별도로 다르게 표시되므로, 예약어는 앞에 역슬래시(\) 붙여주면 됨.)
		const spc = /[~!@#$%^&*()_.+]/;
		// 입력한 pwd1의 내용에 num 값이 없거나, txt 값이 없거나, spc 값이 없거나, 5글자 미만인 경우
		// test 는 정규표현식 전용 메소드 (num이 value.pwd1에 있으면 true 반환하는 로직.)
		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = '비밀번호는 특수문자, 문자, 숫자를 모두 포함해 5글자 이상 입력하세요.';
		// pwd1 와 pwd2 가 일치하지 않는 경우
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = '입력한 비밀번호가 일치하지 않습니다.';
		// 사용자가 입력한 아이디의 글자 수가 5글자 이상이도록
		if (value.userid.length < 5) errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		// comments 최소 글자수 제한
		if (value.comments.length < 10) errs.comments = '코멘트는 최소 10글자 이상 입력하세요.';
		// 성별을 반드시 선택해서 gender가 빈 칸(false)이 되지 않도록 제한
		if (!value.gender) errs.gender = '성별을 선택해주세요.';
		// interest를 하나도 선택하지 않아서 0개 (length가 0개 = false) 인 경우가 없도록.
		if (!value.interest.length) errs.interest = '관심사를 한 가지 이상 선택하세요.';
		// edu를 선택하지 않아 빈 칸(false)인 경우가 없도록.
		if (!value.edu) errs.edu = '최종학력을 선택하세요.';

		// email 주소 관련 인증 로직 (인증 조건에 맞지 않을 때 에러 처리)
		// 문자열에 @ 포함, @ 앞뒤로 모두 문자 필수 포함, @ 뒷부분에 . 필수 포함, . 앞뒤로 모두 문자 필수 포함.
		if (!/@/.test(value.email)) {
			errs.email = '@를 포함해야 합니다.';
		} else {
			// @를 기준으로 split해서 앞의 문자를 forward, 뒤의 문자를 backward로 할당.
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '@ 앞뒤로 문자가 모두 포함되어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '. 앞뒤로 문자가 모두 포함되어야 합니다.';
				}
			}
		}

		return errs;
	};

	useEffect(() => {
		setErrs(check(Val));
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
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
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
											{Errs.edu && <p>{Errs.edu}</p>}
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
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
											<label htmlFor='game'>Game</label>
											{Errs.interest && <p>{Errs.interest}</p>}
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
											{Errs.comments && <p>{Errs.comments}</p>}
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
