/*
  // use로 시작하는 커스텀hook 함수는, 컴포넌트 단에서만 호출 가능.
  // 컴포넌트 안쪽의 또 다른 hook이나, 일반 핸들러함수 안쪽에서는 호출 불가능. 

  -> 해결방법 : 커스텀hook이 특정기능을 수행해주는 또 다른 함수를 내부적으로 생성한 후에, 해당 함수를 리턴하게 해주면 됨. 

  일반 핸들러 함수 안쪽에서 커스텀 hook 자체는 호출 불가능하지만, 커스텀 hook이 return해서 내보내는 그의 자식 함수는 호출 가능함. 
*/

export function useSplitText() {
	// 해당 useSplitText 훅은, 호출 시 아래의 함수를 return함.
	return (txt) => {
		console.log(txt);
	};
}
