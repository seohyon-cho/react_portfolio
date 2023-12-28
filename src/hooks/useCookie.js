/*
  Cookie
  : 서버에서 https 통신으로 client(사용자 브라우저) 쪽에 데이터를 전달할 때, header 객체에 전달하는 경량의 문자 데이터 (개별 쿠키 값당 최대 4KB 정도)
  : 사용자의 브라우저에 물리적인 파일 형태로 저장이 되기 때문에, 사용자가 브라우저를 닫더라도 유지시킬 수 있는 값
  : 각 쿠키에는 만료일이 존재하고, 이는 사용자가 직접 설정할 수 있음. 만약 만료일 미지정 시 브라우저를 닫는 순간 쿠키 값이 삭제 됨. 

  Cookie vs Session
  - Cookie : client (사용자) 쪽에 저장됨. 주로 중요하지 않은 값을 유지시킬 때 사용. (장바구니, 오늘 하루 팝업 안 보기, etc...)
  - Session : 서버 쪽에 저장됨. 주로 중요한 정보 값을 유지시킬 때 사용. (사용자 로그인 정보, 개인 정보 등..)

  Cookie vs Local Storage
  - Cookie : Local Storage에 비해 경량의 문자값만 등록 가능(최대 4KB). 만료일 지정 가능하기 때문에 자동적으로 값이 제거 됨. 
  - Local Storage : Cookie에 비해 큰 용량의 데이터도 등록 가능(최대 5MB). 만료일 지정이 불가능하므로 사용자가 직접 삭제하기 전까지는 계속 유지됨. 
  
*/

export function useCookie(name, value, time) {
	let now = new Date();
	let dueDate = now.getTime() + 1000 * time; // 지금으로부터 (time)초 뒤의 만료 시간
	now.setTime(dueDate); // 시간 객체 값을, 위에서 생성한 만료 시간 값으로 변경
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; // 한국 시로 구한 만료 시간 값을 전세계 표준시로 변환해서 쿠키값의 만료시간값으로 설정.
}
