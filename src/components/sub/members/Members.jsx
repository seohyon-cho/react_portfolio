import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Members.scss';
import { useHistory } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Members() {
	const history = useHistory();
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
	const DebouncedVal = useDebounce(Val, 500);
	const [Errs, setErrs] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = value => {
		const errs = {};
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[~!@#$%^&*()_.+]/;

		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = '비밀번호는 특수문자, 문자, 숫자를 모두 포함해 5글자 이상 입력하세요.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = '입력한 비밀번호가 일치하지 않습니다.';
		if (value.userid.length < 5) errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		if (value.comments.length < 10) errs.comments = '코멘트는 최소 10글자 이상 입력하세요.';
		if (!value.gender) errs.gender = '성별을 선택해주세요.';
		if (!value.interest.length) errs.interest = '관심사를 한 가지 이상 선택하세요.';
		if (!value.edu) errs.edu = '최종학력을 선택하세요.';

		const [m1, m2] = value.email.split('@');
		const m3 = m2 && m2.split('.');
		if (!m1 || !m2 || !m3[0] || !m3[1]) errs.email = '올바른 이메일 형식을 입력하세요.';

		return errs;
	};

	const handleCancel = () => {
		setVal(initVal.current);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다!');
			history.push('/');
		}
	};

	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

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
											<input type='reset' value='Cancel' onClick={handleCancel} />
											<input type='submit' value='Submit' onClick={handleSubmit} />
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
	[ 해당 페이지 (Members.jsx) 에서의 개발 흐름 ]
	
	- Input 요소에 값 입력 시, 실시간으로 폼의 입력 값들을 state로 관리하면서 인증처리 로직 실행 
	- 인증 성공 시 성공 메세지를 띄우고, 인증 실패 시 실시간으로 인증 에러 (충족하지 못 한 조건) Input 요소 하단에 텍스트로 출력 
	- useDebounce 라는 커스텀 훅을 통해서 불필요하게 특정 핸들러함수가 반복 호출되는 것을 방지함. 
		(*) useDebounce 관련 작업 가이드 내용을 별도로 페이지로 만든 뒤 참조 링크 식으로 곁들이기. (p.100 어쩌구저쩌구 참고)


	[ 해당 페이지에서 발생한 이슈 사항 ]

	(1) 폼 요소가 많다보니 초반에는 Input 요소에 담길 value의 state를 생성했는데, state 관리가 어려웠음. 
	(2) 전송 버튼 클릭이라는 이벤트에 의해서만 되는 것 말고, 실시간으로 특정 요소 값을 입력할 때마다 이 값을 인지하고 조건에 충족되었는지를 인식하여 에러메세지를 띄우는 식으로 사용성의 개선이 필요했음. 
	(3) onChange 이벤트에 state 변경 함수를 연결하다보니, 컴포넌트가 너무 많이 재렌더링되고, 이에 수반된 특정 핸들러 함수가 너무 잦게 호출됨. 
	

	[ 해결 방안 ]

	(1) handleChange 라는 함수를 직접 제작해서, 실제 입력하고 있는 name의 폼요소를 state 객체 안의 key값의 변수로 활용하여 입력하고, input의 name값에 따라 자동으로 state가 변동되도록 로직 구현. (ES6의 '대괄호를 이용한 객체의 동적 키 할당' 문법 활용)
	(3) onChange를 통한 state 변경으로 빈번한 컴포넌트의 재렌더링으로 인해 성능면에서 걱정이 되어, 구글링을 해보니, 리액트는 가상 돔 요소가 실제 돔을 통째로 만드는 것이 아닌, 돔의 변경될 데이터만 담고 있는 객체이고, 동일한 JSX 구조일 때 이전 렌더링시의 동일 JSX의 노드 값을 내부적으로 재활용하기 때문에 재렌더링에 대한 소비 비용이 크지 않음을 확인했음. 
	(3) 단지 컴포넌트가 재렌더링됨으로 인해서 check 함수가 불필요하게 자주 호출되는 것을 막아주기 위해서, 일정시간동안 연속적으로 이벤트가 발생하고 있다면 계속해서 핸들러함수의 호출을 지연시키는 debouncing 기능을 커스텀 훅으로 만들어서 재활용하도록 처리. 

	
	*/
