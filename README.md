# 유지웅    201740126 </br></br>

# [ 10월 13일 ]

## 6-2 영화 데이터 화면에 그리기

### 08. isLoading state true 에서 false 로 업데이트하기

+ 아직 앱을 실행하면 여전히 Loading만 출력
+ 여기서 “영화 데이터의 출력”를 출력하려면 isLoading state의 값을 true에서 false로 업데이트하면 됨
+ 앱이 실행되면 처음에는 Loading...이 화면에 나타나다가 조금 시간이 지나면 We are ready로 변하는 것을 확인할 수 있음

```jsx
        this.setState({movies, isLoading: false})
```

## 6-3 Movie 컴포넌트 만들기

### 01. Movie 컴포넌트 만들기

+ src 폴더에 Movie.js 파일 생성하기
+ Movie 컴포넌트는 state 가 필요하지 않으므로 클래스형 컴포넌트가 아닌 함수형 컴포넌트로 작성
+ Movie에 넘어와야 하는 영화 데이터를 정의하고 관리하기 위해 prop-types 를 사용

```jsx
function Movie(){
    return (
        <h1></h1>
    )
}
Movie.propTypes = {}
```

### 02. 영화 데이터 다시 살펴보기

+ yts-proxy.now.sh/list_movies.json 에 접속하여 사용할 영화 데이터 다시 확인.
+ 필요한 데이터 : id, title, rating 등등...

### 03/04. Movie.propTypes 작성

```jsx
Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    }
```

+ 우선 id 먼저 Movie.propTypes에 추가
+ id의 자료형은 Number
+ isRequired = 반드시 들어와야 한다
+ year, title, summary, poster를 각각 Movie.propTypes에 추가 (자료형 주의!)
+ poster props는 영화 포스터 이미지 주소를 저장하기 위한 것 => 영화 포스터 이미지 추가!

### 05.

+ yts-proxy.now.sh/list_movies.json에 접속
+ medium_cover_image 키를 찾기 (키와 키값 살펴보기)

### 06/07/08. 노마드 코더 영화 API 정렬 기능 사용해 보기

+ yts.lt/api#list_movies에 접속한 다음 Endpoint Parameters에 sort_by라는 Parameter가 있고, 우리는 이 Parameter를 사용
+ sort_by Parameter를 사용하기 위해 Examples를 참고
+ yts-proxy.now.sh/list_movies.json?sort_by=rating 접속
+ 평점을 기준으로 내림차순으로 영화 데이터를 정렬해 보여 주는 것을 확인할 수 있음

### 09. axios.get() 수정하기

```jsx
getMovies = async () => {
        const {
            data: {
                data: { movies },
            },
        } = await axios.get ('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
        this.setState({movies, isLoading: false});
    }
```
+ axios.get()에 yts-proxy.now.sh/list_movies.json?sort_by=rating을 전달

### 10. Movie 컴포넌트에서 props를 추가하고 출력해 보기

+ Movie 컴포넌트에서 id, title, year, summary, poster props를 받아 출력할 수 있도록 수정
+ App 컴포넌트에서 Movie컴포넌트를 그릴 때 title만 우선 출력하도록 만들어 보기
+ 음식 앱을 만들 때 컴포넌트를 map() 함수로 출력했던 것과 같이 코딩

```jsx
function Movie({ id, title, year, summary, poster }) {
    return (
        <h4>{title}</h4>
    )
}
```

### 11. App 컴포넌트에서 Movie컴포넌트 그리기

+ We are ready를 출력하고 있는 자리, 즉 로딩이 완료 되면 실행되는 자리에 movies.map()을 사용
+ map() 함수의 첫 번째 인자로 컴포넌트를 반환하는 함수를 전달하면 됨

```jsx
render() {
        const { isLoading, movies } = this.state
        return (<div>{isLoading ? 'Loading...' : movies.map()}</div>)
}
```

### 12. map() 함수에 컴포넌트를 반환하는 함수 전달하기

+ 우선 console탭에 영화 데이터를 출력한 다음, 아무것도 반환하지 않는 함수를 전달해 보기

```jsx
render() {
    const { isLoading, movies } = this.state
        return (
            <div>
                {isLoading
                ? 'Loading...'
                : movies.map((movie) => {
                    console.log(movie)
                    return
        })}
        </div>
    )
}
```

### 13. Movie 컴포넌트를 반환하도록 movies.map() 수정하기

+ App.js에 Movie 컴포넌트를 import한 다음, movies.map()에 전달한 함수가 <Movie />를 반환하도록 하기

```jsx
import React from 'react'
import axios from 'axios'
import Movie from './Movie'
.
.
.
render() {
.
.
.
                : movies.map((movie) => {
                    console.log(movie)
                    return <Movie />
        })}
        </div>
    )
}
```

### 14. Movie컴포넌트에 props 전달하기

+ id, year, title, summary, poster를 isRequired로 설정했기 때문에 props를 모두 전달해야 함
+ 단, poster props의 경우 키 이름이 medium_cover_image이므로 movies.poster가 아니라 movies.medium_cover_image라고 작성
+ App을 실행해 보면 영화 제목이 나오는 것을 확인할 수 있음

```jsx
.
.
.
                : movies.map((movie) => {
                    console.log(movie)
                    return (
                        <Movie
                        id = {movie.id}
                        year = {movie.year}
                        title = {movie.title}
                        summary = {movie.summary}
                        poster = {movie.medium_cover_image}
                        />
                        )
        })}
        </div>
    )
}
```

### 15. console탭에서 영화 데이터 확인해 보기

+ 오류 발생 (key props 경고 메시지)

### 16. key props 추가하기

+ key props문제를 해결하기 위해 코드 수정
+ key props는 유일해야 함으로 API에서 넘겨주는 id값을 사용
+ console.log()는 사용하지 않음으로 삭제

```jsx
.
.
.
                : movies.map((movie) => {
                    return (
                        <Movie
                        key = {movie.id}
                        id = {movie.id}
                        year = {movie.year}
                        title = {movie.title}
                        summary = {movie.summary}
                        poster = {movie.medium_cover_image}
                        />
                        )
        })}
        </div>
    )
}
```

## 6-4 영화 앱 스타일링하기 - 기초

### 01. App 컴포넌트 HTML 추가

+ App컴포넌트가 반환할 JSX 바깥쪽을 <section class=“container”>로 감싸기
+ Loading…은 <div class=“loader”><span class=“loader”>로 감싸기
+ movies.map()은 <div class=“movies”>로 감싸기

```jsx
.
.
.
render() {
        const { isLoading, movies } = this.state
        return (
            <section class="container">
            { isLoading ? (
                <div class="loader">
                    <span class="loader__text">Loading...</span>
                </div>
            ) : (
                <div class="movies">
                {movies.map((movie) => (
                    <Movie
                        key = {movie.id}
                        id = {movie.id}
                        year = {movie.year}
                        title = {movie.title}
                        summary = {movie.summary}
                        poster = {movie.medium_cover_image}
                    />
                ))}
                </div>
            )}
            </section>
        )
    }
```

### 02/03. Movie 컴포넌트에 HTML추가하기 + 영화 포스터 이미지 추가하기

+ Movie 컴포넌트가 반환할 JSX를 <div class=“movie”>로 감싼다.
+ 그 안에서 title, year, summary를 목적에 맞는 tag로 감싼다.
+ 전체 tag를 감싸는 div tag(class=“movie”)를 추가
+ img tag를 그 아래 추가해서 src속성에는 poster props를, alt속성에는 title props를 전달함

```jsx
function Movie({id, title, year, summary, poster}) {
    return (
            <div class="movie">
            <img src={poster} alt={title} title={title} />
            <div class="movie__data">
                <h3 class="movie__title">{title}</h3>
                <h5 class="movie__year">{year}</h5>
                <p class="movie__summary">{summary}</p>
            </div>
        </div>
    )
}
```

### 04. Movie 컴포넌트 정리하기

+ Movie 컴포넌트에는 id props가 필요 없으니 제거

```jsx
function Movie({title, year, summary, poster}) {
    return (
        <div class="movie">
        <img src={poster} alt={title} title={title} />
        <div class="movie__data">
            <h3 class="movie__title">{title}</h3>
            <h5 class="movie__year">{year}</h5>
            <p class="movie__summary">{summary}</p>
        </div>
        </div>
    )
}

Movie.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
}
```

### 05. style속성으로 title 스타일링하기

+ h3 tag에 style 속성을 추가

### 06/07. CSS 파일 생성 + App, Movie 컴포넌트에 CSS 파일 import

+ src폴더에 App.css, Movie.css를 생성한다.
+ App, Movie 컴포넌트에 App.css , Movie.css를 각각 import
+ Movie 컴포넌트에 적용한 h3 tag에 style 속성 삭제

```jsx
import React from 'react'
import axios from 'axios'
import Movie from './Movie'
import './App.css'
.
.
.
```
</br>

```jsx
import PropTypes from 'prop-types'
import './Movie.css'
.
.
.
```

### 08. App.css 파일 작성하기



# 7장 - 영화 앱 다듬기

# 7-1 영화 앱 전체 모습 수정하기

### 01. App.css 내용 모두 삭제

+ App.css 내용 지우기

### 02. 노마드 코더 영화 API에서 장르 키 살펴보기

+ 아직 추가하지 않은 영화 데이터 -> 장르
+ 장르 키 확인 -> runtime 키 아래 genres 키 존재 -> 영화 앱에 추가

### 03. Movie 컴포넌트에 genres props 넘겨주기

+ runtime 아래 있는 genres를 추가

```jsx
import PropTypes from 'prop-types'
import './Movie.css'

function Movie({title, year, summary, poster, genres}) {
    return (
.
.
.
Movie.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired,
}
```
</br></br>

+ 수정 후 실행하면 경고 메시지 2개 발생!
+ (1) JSX에 사용한 속성 중 class 속성이 className으로 사용되어야 한다는 뜻 -> class 속성은 className으로 변경
+ (2) genres props가 필수인데 Movie 컴포넌트에 undefined로 넘어왔다는 뜻 -> genres가 잘 넘어오도록 App.js 수정

### 04. Movie 컴포넌트 수정하기

+ genres props가 Movie 컴포넌트에 undefined로 넘어 왔다는 부분부터 수정
+ 이는 App컴포넌트에서 해당 props를 Movie컴포넌트로 전달하기만 하면 됨
+ 메시지가 사라졌는지 console을 확인

```jsx
...

        summary = {movie.summary}
        poster = {movie.medium_cover_image}
        genres = {movie.genres}

...
```

### 05.  class 속성 이름 className으로 바꿔 주기

+ HTML의 class와 자바스크립트의 class라는 이름이 겹치면 리액트가 혼란스러울 수 있기 때문

```jsx
...

   render() {
        const { isLoading, movies } = this.state
        return (
            <section className="container">
            { isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>
            ) : (
                <div className="movies">

...
```

</br></br>

```jsx
...

function Movie({title, year, summary, poster, genres}) {
    return (
        <div className="movie">
            <img src={poster} alt={title} title={title} />
            <div className="movie__data">
                <h3 className="movie__title">{title}</h3>
                <h5 className="movie__year">{year}</h5>
                <p className="movie__summary">{summary}</p>

...
```





# [ 10월 06일 ]

5-4 영화 앱 만들기 워밍업

클래스형 컴포넌트의 생명주기 함수를 적용하여 Movie 컴포넌트를 구성!

01 - App 컴포넌트 비우기
그동안 클래스형 컴포넌트 생명주기 함수를 공부하기 위해 작성한 코드는 지우기
새로 App.js 만들고 테스트하기

02 - 영화 데이터 로딩 상태 표시해주기
state 선언, isLoading 키 생성 후 키값을 true로 설정
(아직 데이터가 없기 때문에 확인을 위해 true로 세팅하는 것)

03 - 구조분해할당 + 삼향연산자 = 로딩상태 출력
구조분해할당으로 this.state 에 있는 isLoading 을 상수로 선언
-> 앞으로 this.state를 쓰지 않아도 됨
삼향연산자를 사용해서 isLoading이 true => 'Loading...'을 출력
false면 'We are ready'를 출력

04 - 로딩 현상 구현하기
setTimeout()함수의 첫 번째 인자는 실행할 함수,
두 번째 인자로 전달한 값은 지연시간
즉 두 번째 인자 시간만큼 지난 후 첫번째 인자의 함수를 실행함
시간의 단위는 msec
앞서 살펴본 life cycle함수인 componentDidMount()함수를 사용하여
먼저 Render() 함수가 수행된 다음 setTimeout()함수가 실행되도록 함

05/06 - 영화 데이터를 어디에 저장?
데이터의 로딩은 위헤서 테스트 한 것처럼 componentDidMount()함수 안에 구현함
로딩한 데이터는 state에 저장
여러가지 데이터가 있음으로 배열로 저장
영화 데이터의 출력은 Render()함수의 'We are ready'부분에 출력하게 됨

6장

6-1 영화 API사용해 보기

01 - axios 설치하기

javascript에서는 영화 데이터를 로딩 할 때 fetch()함수를 사용
하지만 이 시간은 javascript시간이 아님으로 그 대신 axios를 사용하기
터미널에서 다음과 같이 입력하여 axios를 설치

'npm install axios'

02 - YTS영화 데이터 API 살펴보기
브라우저 주소창에 yts.lt/api 라고 입력하고, YTS영화 데이터 API 사이트에 접속해 보기
앞으로 사용할 API는 'List Movies API'
List Movies를 클릭 로그인 하지 않아도 됨
API는 특정 주소를 입력하면 그 주소에 맞는 결과를 보내 줌
조건도 붙일 수 있도록 제공함

03 - 영화 목록 데이터 확인해 보기
브라우저에서 Endpoint의 주소 중 json으로 끝나는 주소를 입력함
min스타일로 제공되기 때문에 보기가 아주 불편함
https://yts.mx/api/v2/list_movies.json

04 - JSON Viewer 확장 도구 설치하기
JSON Viewer라는 확장 도구를 설치하면 정상적으로 볼 수 있음
크롬 웹스토어에서 JSON Viewer라고 검색하고 설치하기

05 - 03에서 접속했던 주소로 다시 접속해 보기

06 - 노마드 코더 영화 API를 사용하자
API GitHub에 접속해 보면 README.md 소개 글에 다음과 같은 내용이 있음
YTS의 endpoint /list_movies.json을 사용하려면 yts-proxy.now.sh에 /list_movies.json을 붙이면 됨
만일 YTS의 다른 endpoint와 함께 노마드 코더 영화 API를 사용하려면, 
yts-proxy.now.sh에 endpoint를 붙이면 됨

https://github.com/serranoarevalo/yts-proxy

07 - API가 무엇이고 어떻게 사용하는지 확인
주소창에 yts-proxy.now.sh/list_movies.json을 입력하면
05에서 본 것과 같은 결과를 얻을 수 있음

08 - 영화 정보 더 자세히 살펴보기
영화정보를 좀더 자세히 살펴보자
주소창에 yts-proxy.now.sh/movie_details.json라고 접속하면 아무 것도 출력되지 않음
API가 movie_id라는 조건을 요구하기 때문

09 - 영화 정보를 더 자세히 보기 위해 조건 추가하기
yts.mx/api#mivie_details에 접속하면 movie_details Endpoint는 movie_id가 필수임을 알 수 있음
즉 yts-proxy.now.sh/list_movies.json에 movie_id를 추가해야 함
Example에 있는 주소를 보면 movie_id를 어떻게 추가하는지 알 수 있음

10 - movie_id가 10인 영화 정보 살펴보기
yts-proxy.now.sh/list_movies.json?movie_id=10 이하고
접속하면 아이디가 10인 영화의 자세한 정보를 볼 수 있음

11 - 노마드 코더 영화 API를 영화 앱에서 호출하기
API를 사용하려면 axios를 import한 다음, componentDidMount()함수에서 axios로 API를 호출하면 됨
axios.get()함수의 인자에 URL을 전달하여 API를 호출했음
setTimeout은 이제 사용할 필요가 없으니 삭제
실행해 보면 여전히 Loading... 이라고만 나옴

12 - axios의 동작 확인해 보기
network탭을 열고 브라우저 새로고침(Ctrl+F5)
name 이라는 항목에 list_movies.json 이라고 나온 부분이 바로 axios가 API를 호출해서 발생한 것

13 - getMovies()함수 기다린 다음, axios.get() 함수가 반환한 데이터 잡기
getMovies()함수를 만들고, 이 함수 안에서 axios.get()이 실행하도록 하기
axios.get()의 return값은 movies에 저장
componentDidMount()함수가 실행되면 this.getMovie()가 실행됨
이때 자바스크립트에게 getMovies()함수는 시간이 필요하다는 것을 알려야 하는데 이때 사용되는 것이 async, await

14 - getMovies()에 async 붙이고, axios.get()에 await붙이기
시간이 필요하다는 것을 알리기 위해서는 async, await 키워드가 필요함
자바스크립트에게 시간이 필요하다는 것을 알리려면 async를 ()앞에 붙이기
실제 시간이 필요한 대상인 axios.get()함수 에는 await을 붙이기

6-2 영화 데이터 화면에 그리기

01 -  console.log() 함수로 영화 데이터 출력해 보기
앞에서 우리가 작업한 결과로 API가 보내준 데이터는 movies에 들어가 있을 것임
console을 통해 출력해 보기

02/03 - 영화 데이터 자세히 살펴보기
출력된 데이터를 세심히 살펴 어떻게 사용할지를 구상
특히 data 키 펼쳐서 살펴보기
그 안에 있는 data 키 안에 data 키 안에 movie 배열이 있음
movie 키 안에 우리에게 필요한 영화 데이터가 있음
data -> data -> movies 순서대로 객체에 접근하면 원하는 데이터를 추출할 수 있음

04 - 객체에 있는 movies 키에 접근하기
movies 변수에 있는 movies 키의 값을 추출해 보자.
movies.data.data.movies 와 같이 수정한 후 콘솔에서 확인해 보기
이제 우리가 원하는 데이터만 추출된 것을 확인할 수 있음
이 데이터 구조는 음식 앱을 만들 때 사용했던 데이터 구조와 동일함

05 - 객체에 있는 movies 키에 조금 더 똑똑하게 접근하기
movies.data.data.movies 와 같은 방법으로 객체에 접근하는 방법?
-> ES6를 사용한다면 구조 분해 할당이란 방법을 사용해 보자.

06 - movies state에 영화 데이터 저장하기

this.setState({ movies: movies })와 같이 작성해서 movies state 에 영화 데이터를 저장할 수 있음
console.log()는 사용하지 않을거니까 제거

07
ES6 에서는 객체의 키와 대입할 변수의 이름이 같다면 코드를 축약할 수 있음
{movies:movies}는 키와 대입할 변수의 이름이 같으니까 {movies}로 축약할 수 있음
this.setState({ movies: movies })를 this.setState({ movies })로 수정



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
