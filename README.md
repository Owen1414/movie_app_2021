# 유지웅    201740126

[ 09월 29일 ]
학 습 내 용

* 상대 경로 이미지 삽입 방법

import를 사용하는 방법도 있지만 이미지가 많을 경우엔
Public 폴더에 images 폴더를 생성.
그리고 필요한 곳에 <img src="image/[이미지이름]"> 형태로 태그를 작성!


* 음식 앱에 prop-types 도입하기

01. 음식 데이터에  rating 추가하기
• FoodLike 배열의 각 요소에 rating을 추가
• 값의 자료형은 number
• Rating props를 Food 컴포넌트에 전달하면서 검사
•그러기 위해서는 props의 자료형을 검사할 수 있도록 만들어 주는
prop-types라는 도구가 필요

02. prop-type 설치하기
• 터미널에서 ' npm install prop-types ' 를 입력해 prop-types 설치

03. 정상 설치 여부 확인
• Package.json 파일을 열어 dependencies 키에 있는 값을 확인
• prop-types가 등록되있으면 정상적으로 설치
• Prop-types는 컴포넌트가 전달받은 props가 원하는 값인지 확인해주는 역할
• prop-types를 통해 미리 'Food 컴포넌트는 반드시 picture props 전달되야 한다'고 정의할 수 있음.

04. prop-types 적용하기
• import PropTypes from 'prop-types'; 를 App.js 파일 맨 위에 추가
• 그리고 ration props를 Food 컴포넌트에 전달.
• 아직 prop-types를 적용한 상태는 아님.

05. Food.propTypes 작성하기
• prop-types 적용!
 -> Food.propType에 객체를 적어 주기만 하면 됨.
• 모든 props는 문자열이고 반드시 있어야 한다는 조건을 추가
 -> 콘솔 탭을 확인해 보면 경고 메시지가 보임.
( 'Food 컴포넌트의 rating props 자료형이 string이어야 하는데, number라서 문제다' )

06. Food.propTypes의 rating 키 값 확인하기
• isRequired는 필요하다는 뜻.
• ‘rating에는 string이라는 자료형이 반드시 필요하다’는 말.

07. prop-types 경고 해결하기
• rating: PropTypes.string.isRequired 대신 rating: PropTypes.number.isRequired 로 교체
• Console탭을 확인해 보면 prop type 경고 메시지가 사라져 있음.

08. 다른 종류의 prop-types 경고 해결하기
• Picture props의 이름을 image로 바꿔보자.
• 화면에 사진이 나오지 않게 됨.
• Console 탭을 살펴보면 그 이유를 알 수 있음.
( 콘솔 -> Warning Failed prop type : The prop 'picture' is marked as required in 'Food', but its value is 'undefined'. )
• Food 컴포넌트에 picture라는 이름의 props가 필요한데, 그 값이 undefined.

09. 코드 원래대로 돌려 놓기
• 이럴 경우도 props오류가 발생한 다는 생각하며, 오류 메시지를 눈으로 익혀 두기.

10. isRequired의 뜻 살펴보기
• rating props는 필수가 아니어도 되는 항목이다. • 다만 값이 전달되는 경우 자료형이 number이기는 해야 한다

[ 09월 15일 ]
학 습 내 용


[ 09월 08일 ]
학 습 내 용

[ 09월 01일 ]
학 습 내 용

클론 코딩이란 무엇인가?
실제로 존재하는 사이트나 앱의 코드를 보며 그대로 따라 만들면서,
습득하는 학습 방법
