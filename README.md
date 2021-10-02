# 유지웅    201740126

[ 09월 29일 ]
학 습 내 용

* 상대 경로 이미지 삽입 방법

import를 사용하는 방법도 있지만 이미지가 많을 경우엔
Public 폴더에 images 폴더를 생성.
그리고 필요한 곳에 <img src="image/[이미지이름]"> 형태로 태그를 작성!


* 음식 앱에 prop-types 도입하기

01. 음식 데이터에  rating 추가하기
FoodLike 배열의 각 요소에 rating을 추가
값의 자료형은 number
Rating props를 Food 컴포넌트에 전달하면서 검사
그러기 위해서는 props의 자료형을 검사할 수 있도록 만들어 주는
prop-types라는 도구가 필요

02. prop-type 설치하기
터미널에서 ' npm install prop-types ' 를 입력해 prop-types 설치

03. 정상 설치 여부 확인
Package.json 파일을 열어 dependencies 키에 있는 값을 확인
prop-types가 등록되있으면 정상적으로 설치
Prop-types는 컴포넌트가 전달받은 props가 원하는 값인지 확인해주는 역할
prop-types를 통해 미리 'Food 컴포넌트는 반드시 picture props 전달되야 한다'고 정의할 수 있음.

04. prop-types 적용하기
import PropTypes from 'prop-types'; 를 App.js 파일 맨 위에 추가
그리고 ration props를 Food 컴포넌트에 전달.
아직 prop-types를 적용한 상태는 아님.

05. Food.propTypes 작성하기
prop-types 적용!
-> Food.propType에 객체를 적어 주기만 하면 됨.
모든 props는 문자열이고 반드시 있어야 한다는 조건을 추가
-> 콘솔 탭을 확인해 보면 경고 메시지가 보임.
( 'Food 컴포넌트의 rating props 자료형이 number이어야 하는데, String라서 문제다' )

06. Food.propTypes의 rating 키 값 확인하기
isRequired는 필요하다는 뜻.
‘rating에는 string이라는 자료형이 반드시 필요하다’는 말.

07. prop-types 경고 해결하기
rating: PropTypes.string.isRequired 대신 rating: PropTypes.number.isRequired 로 교체
Console탭을 확인해 보면 prop type 경고 메시지가 사라져 있음.

08. 다른 종류의 prop-types 경고 해결하기
Picture props의 이름을 image로 바꿔보자.
화면에 사진이 나오지 않게 됨.
Console 탭을 살펴보면 그 이유를 알 수 있음.
( 콘솔 -> Warning Failed prop type : The prop 'picture' is marked as required in 'Food', but its value is 'undefined'. )
Food 컴포넌트에 picture라는 이름의 props가 필요한데, 그 값이 undefined.

09. 코드 원래대로 돌려 놓기
이럴 경우도 props오류가 발생한 다는 생각하며, 오류 메시지를 눈으로 익혀 두기.

10. isRequired의 뜻 살펴보기
rating props는 필수가 아니어도 되는 항목이다. • 다만 값이 전달되는 경우 자료형이 number이기는 해야 한다

- 5장

5-1 state로 숫자 증감 기능 만들어 보기

props는 정적인 데이터만 다룰 수 있음.
state는 동적인 데이터를 다루기 위해 사용됨.
state는 class형 컴포넌트에서 사용.

01. 클래스형 컴포넌트 작성하기

02. App클래스가 React.Component 클레스를 상속 받도록 하기

class를 `React.Component`로 상속받아 생성함.
`React.Component` 클래스는 500여 줄이 넘는 코드
로 여러가지 기능이 이미 구현되어 있기 때문에 사용하
기에 편리함.
import할 때 `{Component}`를 써주면 extends에서
`React.`을 생략할 수 있음.

03. render() 함수를 사용.

App 컴포넌트가 JSX를 반환해야 하지만 class형 컴포넌트에서는 바로 return을 사용할 수 없다.
render( ) 함수 내에서 return문을 사용한다.
함수형 컴포넌트는 return문이 JSX를 반환하지만, 클래스형 컴포넌트는 render()함수가 JSX를 반환함.

04. state 정의하기
05. state에 count값 추가하고 사용하기

class안에 state = { }라고 작성하여 state를 정의
state는 객체형태의 데이터
state를 사용하려면 반드시 class형 컴포넌트 안에서, 소문자를 사용하여 state라고 적기
state에 count키와 키값을 0으로 추가
return함수로 count값을 반환함
render함수에서 this.state.count를 출력함

06 ~ 09 버튼으로 Count state 값 변경해보기

<Add>버튼과 <Minus>버튼을 추가
JSX는 하나로 묶어야 함으로 <div>태스로 묶기
버튼을 누를때 마다 console에 add와 minus가 출력되도록 하기
함수는 화살표함수를 사용
Console을 통해 잘 작동하는지 확인
onClick속성을 통해 클릭이 일어날 때 마다 함수를 호출하도록 하기
Console에서 동작 여부를 확인

5-2 실제 숫자가 증감하도록 함수 수정

01. 함수에서 consol.log를 삭제하고 state의 숫자가 증감하도록 수정
02. 다음과 같이 (this.state.count = 1 , this.state.count = -1) 수정하여 결과를 확인
03. 위와 같이 작성하면 state는 직접 변경하지 말라는 경고가 consol창에 나타나고 실제 버튼은 동작하지 않음.
04. 리액트는 state가 변경되면 render함수를 다시 실행하여 화면을 갱신함. 하지만 지금처럼 state를 직접 변경하면 render함수가 다시 실행하지 않음
05. setState()함수를 사용해서 state값을 변경해야 함. (this.setState({count: 1}) , this.setState({count: -1}))
06. 이렇게 하면 경고는 없어지지만 단순히 버튼을 누를 때 1이나 -1로 변할 뿐 지속적인 증감을 하는 것은 아님
07. 지속적인 증감을 위해 키 값에 다음과 같은 연산문을 작성하기
    (this.setState({count: this.state.count +1}) , this.setState({count: this.state.count -1}))
08. 그러나 위와 같이 직접 state를 업데이트하는 방법은 성능에 문제가 생길 수 있음
09. 이럴경우 setState()함수의 인자로 함수를 전달하면 성능에 문제없이 업데이트 할 수 있음
10. 마지막으로 화살표함수를 이용하여 setState()함수의 인자로 함수를 전달할 수 있도록 수정하기
    (this.setState(current => ({ count : this.state.count + 1 })) , this.setState(current => ({ count : this.state.count - 1 })))

5-3 클래스형 컴포넌트의 일생 알아보기 (Life Cycle)

01. constructor() 함수 알아보기

클래스 내에 constructor()(생성자)함수를 선언하고, console.log()함수를 이용해 문장을 출력해보기
이것은 어떤 문장이 먼저 실행되는지 비교해 보기 위해서임
실행 후 console에서 확인하면 constructor이 먼저 실행된 것을 확인할 수 있음

생성자란 무엇인가?

constructor()는 Component를 생성할 때 state 값을 초기화하거나 메서드를 바인딩할 때 사용한다.
React.Component를 상속해서 만들어진 컴포넌트의 생성자를 구현할 때는 super(props)를
선언을 권고하는 이유는 this.props 사용 시 생성자 내에서 정의되지 않아 버그 발생 가능성이 있기 때문임.
자바스크립트에서 super는 부모클래스 생성자의 참조한다는 의미.
또한가지 자바스크립트는 언어적 제약사항으로 생성자에서 super 를 호출하기 전에는 this 를 사용할 수 없음.
반드시 super를 먼저 호출해야 this를 사용할 수 있다는 것임.
생성자 내에서는 setState를 사용하지 않고, this.state를 사용하여 state의 초기값을 할당함.
생성자 내에서는 외부API를 직접 호출할 수 없음. 필요 하다면 componentDidMount()를 사용.

02. componentDidMount() 함수 알아보기

componentDidMount()함수를 선언하고, 함수 안에 console.log() 함수를 작성하여 실행되는 시점을 확인해 보기
실행 순서를 console을 통해 확인해 보면 render() 함수 실행 직후인 것을 확인할 수 있음.

03/04 componentDidUpdate() 함수 알아보기

액션02와 동일한 방법으로 componentDidUpdate()함수의 실행 순서를 확인하기
단순히 실행한 것으로는 console에 출력되지 않음 화면이 업데이트 되어야 함
버튼을 클릭해서 화면을 업데이트 하면서, console을 확인하기
버튼을 클릭하면 setState()함수가 실행되고, render()함수로 화면이 업데이트된 직후 componentDidUpdate()함수가 실행됨.

05. componentWillUnmount() 함수 알아보기

componentWillUnmount()함수도 위와 마찬가지로 테스트를 함
하지만 이경우 실행 여부를 직접 확인할 수는 없음
이 함수는 컴포넌트가 화면에서 떠날 때 실행됨
보통 컴포넌트에 적용한 이벤트 리스너를 제거할 때 많이 사용됨




[ 09월 15일 ]
학 습 내 용


[ 09월 08일 ]
학 습 내 용

[ 09월 01일 ]
학 습 내 용

클론 코딩이란 무엇인가?
실제로 존재하는 사이트나 앱의 코드를 보며 그대로 따라 만들면서,
습득하는 학습 방법
