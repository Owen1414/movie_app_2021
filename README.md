# 유지웅    201740126

# [ 11월 10일 ]

+ **계정 변경 방법**

> **git config --global user.name 변경을 희망하는 계정**<br>

> **git config --global user.email 변경을 희망하는 이메일**
<br><br><br>

# [ 11월 03일 ]

## 8-3 내비게이션 만들어 보기

+ 라우터를 이용한 간단한 **내비게이션** 만들기
+ Home과 About이라는 2개의 버튼을 만들고,<br>
각각의 버튼을 눌렸을 때 해당 화면이 보이도록 할 것<br><br>

### 01. Navigation 컴포넌트 만들기

+ 먼저 components 폴더에 Navigation.js 파일을 만들고,<br>
2개의 a 태그를 반환하도록 JSX 작성

```jsx
function Navigation() {
    return(
        <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        </div>
    )
}
export default Navigation
```
<br>

### 02. Navigation 컴포넌트 App 컴포넌트에 포함 시키기

+ App컴포넌트에 Navigation을 import시키고, < HashRoute >에서 불러오게 하기
+ 앱을 실행하면 Navigation이 출력되는 것을 확인할 수 있음
+ 동작은 잘 되는지 다음 액션에서 확인해 보기

```jsx
import './App.css'
import { HashRouter, Route } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'
import Navigation from './components/Navigation'

function App() {
    return (
        <HashRouter>
            <Navigation />
            <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
        </HashRouter>
    )
}

export default App
```
<br>

### 03. Home 링크 눌러 보기

+ Home링크를 눌러보기
+ 링크를 클릭할 때마다 리액트가 죽고, 새 페이지가 열리는 문제가 발생함
+ 원인은 a 태그의 href속성이 페이지 전체를 다시 그리는 성질을 갖고 있기 때문
+ 이대로 라면 필요한 부분만 다시 그려주는 리액트를 써야할 이유가 없음
+ 이 문제를 해결하려면 react-router-dom의 **Link 컴포넌트**를 사용하면 됨
<br><br>

### 04. a 태그 Link 컴포넌트로 바꾸기

+ Navigation 컴포넌트에 Link 컴포넌트를 import하고 a 태그를 Link 컴포넌트로 바꾸기
+ href속성은 to로 수정
+ 앱을 실행하고 링크를 클릭해 보면<br>
페이지 전체 고침 문제가 해결된 것을 확인할 수 있음

```jsx
import { Link } from 'react-router-dom'


function Navigation() {
    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        </div>
    )
}
export default Navigation
```
<br>

**Link, Router 컴포넌트는 반드시 HashRouter안에 포함되어야 함**
<br><br>

### 05. Navigation 컴포넌트 위치 다시 확인하기

+ Navigation 컴포넌트에서 Link 컴포넌트를 반환함으로<br>
혹시 실수로 HashRouter 컴포넌트 바깥에 위치시켰다면<br>
HashRouter 컴포넌트 안으로 수정
<br><br>

### 06. Navigation 컴포넌트 스타일링하기

+ components 폴더에 Navigation.css 파일을 만들고, css코드를 작성
+ Navigation 컴포넌트에 css를 import하고 이를 적용시키기

```css
.nav {
    z-index: 1;
    position: fixed;
    top: 50px;
    left: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
      0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    border-radius: 5px;
  }
  
  @media screen and (max-width: 1090px) {
    .nav {
      left: initial;
      top: initial;
      bottom: 0px;
      width: 100%;
    }
  }
  
  .nav a {
    text-decoration: none;
    color: #0008fc;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
  }
  
  .nav a:not(:last-child) {
    margin-bottom: 20px;
  }
```

```jsx
import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
    return(
        <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        </div>
    )
}
export default Navigation
```
<br>

## 8-4 영화 상세 정보 기능 만들어 보기

+ route props를 이용해 영화 카드를 누르면 상세 정보를 보여주는 기능을 만들어 보기
+ route props는 라우팅 대상이 되는 컴포넌트에 넘겨주는 기본 props를 말함<br><br>

### 01. route props 살펴보기

+ 먼저 consol.log()를 통해 About으로 어떤 props가 넘어오는지 확인
+ react-router-dom에서 Route 컴포넌트가 그려줄 컴포넌트에
전달한 props를 확인할 수 있음
+ Route 컴포넌트가 그려줄 컴포넌트에는 항상 이 props가 전달되며,<br>
이 props는 원하는 데이터를 담아 보낼 수 있음

```jsx
import './About.css'

function About(props)
{
    console.log(props)
    return (
    <div className="about__container">
    <span>
        "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows."
    </span>
    <span>- George Orwell, 1984</span>
    </div>
    )
}

export default About
```
<br>

### 02. route props에 데이터 담아 보내기

+ 데이터를 담아 보내려면 Navigation 컴포넌트에 있는<br>
Link컴포넌트의 to props의 구조를 조금 바꿔야 함
+ pathname은 URL을 의미하며, state는 우리가 route props에 보내줄 데이터를 의미


```jsx
import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
    return(
        <div className="nav">
        <Link to="/">Home</Link>
        <Link to={{ pathname: '/about', state: { fromNavigation: true }}}>About</Link>
        </div>
    )
}
export default Navigation
```
<br>

### 03. route props 다시 살펴보기
+ /about 으로 이동한 후 console 에서 location 을 살펴보기
+ state 키에 우리가 보낸 데이터를 확인할 수 있음<br><br>

### 04. Navigation 컴포넌트 정리하기

+ 03까지 작성한 코드는 사용하지 않을 것이므로 원래대로 돌려 놓기

```jsx
import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
    return(
        <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        </div>
    )
}
export default Navigation
```
<br>

### 05. Movie 컴포넌트에 Link 컴포넌트 추가하기

+ Movie컴포넌트를 클릭하면 영화 상세 정보 페이지로 이동해야 함으로<br>
Movie컴포넌트에 Link컴포넌트를 추가
+ Movie컴포넌트에 Link컴포넌트를 import하고, Link컴포넌트에 to props를 작성
+ 이때 Link컴포넌트의 위치에 주의
+ 이제 영화 카드를 누르면 /movie-detail로 이동하게 됨

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import './Movie.css'
import { Link } from 'react-router-dom'

function Movie({title, year, summary, poster, genres}) {
    return (
        <div className="movie">
            <Link
            to={{
                pathname: '/movie-detail',
                state: { year, title, summary, poster, genres },
            }}
            >
...
                <p className="movie__summary">{summary.slice(0, 180)}...</p>
            </div>
            </Link>
...
```
<br>

### 06. Detail 컴포넌트 만들기

+ Detail 컴포넌트를 routes폴더에 추가
+ Detail컴포넌트에서 Movie컴포넌트의 Link 컴포넌트가 보내준<br>
영화 데이터를 확인할 수 있도록 console.log()를 작성
+ 아직은 console.log(props)는 확인할 수 없음<br>
07로 App.js 에서 Route 컴포넌트를 추가하면 확인할 수 있음

```jsx
function Detail(props){
    console.log(props)
    return <span>hello</span>
}

export default Detail
```
<br>

### 07. Route 컴포넌트 추가하기

+ App.js에 Detail 컴포넌트를 import하고<br>
Route 컴포넌트에서 Detail 컴포넌트를 그려 주도록 코드를 작성

```jsx
import './App.css'
import { HashRouter, Route } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'
import Navigation from './components/Navigation'
import Detail from './routes/Detail'

function App() {
    return (
        <HashRouter>
            <Navigation />
            <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
            <Route path="/movie-detail" component={Detail} />
        </HashRouter>
    )
}

export default App
```
<br>

### 08. 영화 카드를 눌러 /movie-detail 로 이동한 다음 영화 데이터 확인하기

+ 영화 카드를 클릭해서 /movie-detail 로 이동하기
+ 화면에는 Detail 컴포넌트가 출력하는 hello라는 문장을 확인할 수 있음
+ console에는 location → state에 Movie컴포넌트에서<br>
Link 컴포넌트를 통해 보내준 데이터가 들어있는지 확인해 보기<br><br>

### 09. /movie-detail 로 바로 이동하기

+ URL에 /movie-detail을 입력해서 바로 이동해 보기
+ 그리고 console창을 확인
+ Detail 컴포넌트의 hello는 잘 출력하고 있지만 console 에는 영화데이터가 보이지 않음<br>
Detail 컴포넌트로 영화 데이터가 넘어 오지 못한 것
+ 이런 경우에는 사용자를 강제로 Home으로 돌려 보내야 함
<br><br>


## 8-5 리다이렉트 기능 만들어 보기

+ 리다이렉트 기능을 사용하기 위해서는 **route props**의 **history** 키를 활용해야 함
+ history키에는 push, go, goBack, goForward와 같은 키가 있으며,<br>
그 키에는 URL을 변경해 주는 함수들이 있음
+ 이 함수들을 이용해서 리다이렉트 기능을 구현<br><br>

### 01. history 키 살펴보기

+ 주소창에 localhost:3000을 입력해서 이동한 다음 아무 영화나 눌러 이동
+ console에서 history에 출력된 값을 확인
+ 03에서는 componentDidMount() 생명주기 함수를 사용해<br>
Detail 컴포넌트가 마운트될 때 push()함수를 실행하도록 함<br><br>


### 02. Detail 컴포넌트 클래스형 컴포넌트로 변경하기

+ Detail 컴포넌트를 함수형에서 클래스형으로 변경한 후<br>
location, history키를 구조 분해 할당하기

```jsx
import React from "react"

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props
    }

    render () {
            return <span>hello</span>
    }
}

export default Detail
```
<br>

### 03. push()함수 사용하기

+ location.state가 undefined인 경우 history.push(“/”)를 실행하도록 코드를 작성

```jsx
import React from "react"

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props
        if (location.state === undefined) {
            history.push('/')
        }
    }
    render () {
        return <span>hello</span>
    }
}

export default Detail
```
<br>

### 04. 리다이렉트 기능 확인해 보기

+ 주소창에 직접 주소를 입력해서 /movie-detail로 이동해 보기
+ 홈으로 돌아오면 기능이 정상적으로 동작하고 있는 것
+ 이제부터는 영화 카드를 눌러 영화 상세 정보 페이지로 이동하지 않으면<br>
다시 첫 화면으로 돌아가게 됨<br><br>

### 05. 영화 제목 출력하기

+ 이제부터 영화 상세 정보 페이지를 만들어 보기
+ 먼저 영화 제목을 출력해 보기
+ Movie 컴포넌트로부터 전달 받은 영화 데이터는 location.state에 들어 있기 때문에<br>
location.state.title을 출력하도록 하면 됨

```jsx
import React from "react"

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props
        if (location.state === undefined) {
            history.push('/')
        }
    }
    render () {
        const { location } = this.props
        return <span>{location.state.title}</span>
    }
}

export default Detail
```
<br>

### 06. /movie-detail 로 바로 이동하기

+ 그런데 05 작업 이후, /movie-detail로 이동하면 또 오류가 발생
+ componentDidMount() 생명주기 함수에 작성한 리다이렉트 기능이 동작하지 않기 때문
+ 그 이유는 Detail컴포넌트는 render() → componentDidMount()의 순서로<br>
함수를 실행하기 때문
+ 즉, render()함수 내에서 location.state.title을 사용하려고 하는데<br>
location.state가 이전과 마찬가지로 undefined 이기 때문인 것
+ render() 함수에도 componentDidMount() 생명주기 함수에 작성한<br>
리다이렉트 코드를 추가해야 함


### 07. location.state 확인하기

+ location.state가 없으면 render() 함수가 null을 반환하도록 수정
+ 이제 componentDidMount() 생명주기 함수가 실행되면서<br>
리다리렉트 기능이 동작하게 된다.

```jsx
import React from "react"

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props
        if (location.state === undefined) {
            history.push('/')
        }
    }

    render () {
        const { location } = this.props
        if (location.state) {
            return <span>{location.state.title}</span>
        } else {
          return null
        }
    }
}
export default Detail
```
<br>

+ router 사용 후 주소에 hash(#)가 나타나는 현상 없애려면 어떻게 해야 하나?<br>
 → **HashRouter** 대신 **BrowserRouter** 사용!


<br><br><br>

# [ 10월 27일 ]

### 06. 영화 장르 출력하기

+ Movie컴포넌트에서 장르를 출력하도록 코드를 수정
+ genres props가 배열이므로 map()함수를 사용
+ genres props를 ul, li 태그로 감싸서 출력
+ console을 확인하면 kye props가 없다는 메시지가 나옴

```jsx
...
        <ul className="movie__genres">
                    { genres.map((genre) => {
                        return (
                            <li className="movie__genre">{genre}</li>
                        )
                    })
                    }
        </ul>
...
```

<br>

```
콘 솔
Warning : Each child in a list should have a unique "key" prop.
```

<br>

### 07. li tag에 key props 추가하기

+ 그런데 genre에는 key값으로 사용하기에 적당한 id값 같은 것이 없음
+ 이럴 경우 새롭게 만들에 내야 하는데, map()함수에는 2번째 매개변수를 지정할 경우 배열의 index 값을 반환해 주는 기능이 있음
+ 이것을 이용해서 배열의 인덱스를 key props로 활용하는 것
+ console을 확인해보기

```
genres.map((genre, index) => {...})

+ 설명 : genre에는 genres의 배열 원소가 index에는 1,2,3...번째임을 알리는 숫자가 전달
```

<br>

```jsx
...
        <ul className="movie__genres">
                    { genres.map((genre, index) => {
                        return (
                            <li key={index} className="movie__genre">{genre}</li>
                        )
                    })
                    }
                </ul>
...
```

<br>

## 7-2 영화 앱 멋지게 스타일링하기

### 01. App.css 수정하기

+ App.css 파일에는 영화 앱 전체에 적용할 글꼴, 배경색 등을 적용

```css
* {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #eff3f7;
    height: 100%;
  }
```

<br>

### 02. Movie.css 수정하기

```css
.movies .movie {
    background-color: white;
    margin-bottom: 70px;
    font-weight: 300;
    padding: 20px;
    border-radius: 5px;
    color: #adaeb9;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
      0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  }
  
  .movies .movie a {
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 2fr;
    grid-gap: 20px;
    text-decoration: none;
    color: inherit;
  }
  
  .movie img {
    position: relative;
    top: -50px;
    max-width: 150px;
    width: 100%;
    margin-right: 30px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  }
  
  .movie .movie__title,
  .movie .movie__year {
    margin: 0;
    font-weight: 300;
  }
  
  .movie .movie__title {
    margin-bottom: 5px;
    font-size: 24px;
    color: #2c2c2c;
  }
  
  .movie .movie__genres {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
  }
  
  .movie__genres li,
  .movie .movie__year {
    margin-right: 10px;
    font-size: 14px;
  }
```

<br>

### 03. 시놉시스 180자로 제한하기

+ 자바스크립트의 slice함수를 이용하여 구현

```
"hereisstriing".slice(0,10) // "hereisstri"

설명
+ 시작은 0부터 ("hereisstriing" => 여기에서는 h가 시작, 0)
+ (0,10) => (시작, 끝)
```

<br>

```jsx
...
                </ul>
                <p className="movie__summary">{summary.slice(0, 180)}...</p>
            </div>
...
```

<br>

### 04/05 영화 앱 제목 살펴보기 + 영화 앱 제목 바꾸기

+ 크롬 브라우저 탭에서 확인
+ create-react-app에서 지정한 기본값인 React App으로 되어있음
+ public폴더의 index.html에서 title을 수정 (title은 head 엘리먼트안에 있음, Movie App으로 수정)

<br><br>

# 8장 - 영화 앱에 여러 기능 추가하기 (라우터 사용 중요!)

## 8-1 react-router-dom 설치하고 프로젝트 폴더 정리하기

+ 간단한 메뉴를 추가
+ 메뉴를 클릭하면 화면이 이동해야 하는데, 이때 필요한 것이 **라우터**
+ 라우터는 **react-router-dom** 패키지를 이용

<br>

### 01. react-router-dom 설치하기

> **npm install react-router-dom**

<br>

### 02. components 폴더에 Movie 컴포넌트 옮기기

+ src/components 폴더 만들고 Movie컴포넌트 이동

<br>

### 03. routes 폴더에 라우터가 보여줄 화면 만들기

+ src/routes 폴더 만들고 Home.js와 About.js 파일 생성

<br>

### 04. Home.js 수정하기

+ App.js내용을 Home.js로 복사하고 컴포넌트 이름을 Home으로 수정
+ Home.css를 생성하고 Home.js에 import
<br>

```jsx
import React from 'react'
import axios from 'axios'
import Movie from '../components/Movie'
import './Home.css'


class Home extends React.Component {
...
}

export default Home
```

<br>

### 05/06. Home.css 만들기 / App.js 수정하기

+ Home.css의 내용은 교재 소스 그대로 사용한다.
<br>

```css
.container {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  
  .loader {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
  }
  .movies {
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 1fr));
    grid-gap: 100px;
    padding: 50px;
    width: 80%;
    padding-top: 70px;
  }
  
  @media screen and (max-width: 1090px) {
    .movies {
      grid-template-columns: 1fr;
      width: 100%;
    }
  }
```
<br>

```jsx
import Home from './routes/Home'
import './App.css'

function App(){
    return <Home />
}

export default App
```
<br>

## 8-2 라우터 만들어 보기

+ 라우터는 사용자가 입력한 URL을 통해 특정 컴포넌트를 불러준다. 
+ React-router-dom은 여러 종류의 라우터를 제공하는데, 여기서는 **HashRouter**와 **Route**컴포넌트를 사용
+ App.js에 HashRouter와 Route컴포넌트 import하고 적용하기
<br>

### 01. HashRouter와 Router컴포넌트

+ HashRouter와 Router컴포넌트 import
+ HashRouter컴포넌트가 Route컴포넌트를 감싸 반환하도록 App.js를 수정
+ 그리고 Home을 import 했던 코드는 잠시 지우기
+ Route에는 2가지 props를 전달할 수 있음
+ 하나는 URL을 위한 path props고, 또 하나는 URL에 맞는 컴포넌트를 불러 주기 위한 component props
<br>

```jsx
import './App.css'
import { HashRouter, Route } from 'react-router-dom'

function App() {
    return (
        <HashRouter>
            <Route />
        </HashRouter>
    )
}

export default App
```
<br>

### 02. Route 컴포넌트에 path, component props 추가하기

+ About 컴포넌트를 import
+ Path, component props에 URL과 About 컴포넌트를 전달
<br>

```jsx
import './App.css'
import { HashRouter, Route } from 'react-router-dom'
import About from './routes/About'

function App() {
    return (
        <HashRouter>
            <Route path="/about" component={About} />
        </HashRouter>
    )
}

export default App
```
<br>

### 03. About.js 수정하기

+ About.js 내용 간단히 작성
<br>

```jsx
function About() {
    return (
    <span>
        About this page: I built it because I love movies.
    </span>
    )
}

export default About
```
<br>

### 04. 라우터 테스트해 보기

+ localhost:3000/#에 path props로 전달했던 값 /about을 붙여 다시 접속
+ URL은 localhost:3000/#/about이고, 03에서 작성했던 내용이 출력
+ 이것은 Route 컴포넌트에 전달한 path props를 보고 component props에 지정한 About 컴포넌트를 그려 준 것
<br>

### 05. Home 컴포넌트를 위한 Route컴포넌트 추가하기

+ App 컴포넌트에 Home 컴포넌트를 import하고, 또 다른 Route 컴포넌트를 추가
+ path props를 “/”으로 입력한 이유는 localhost:3000에 접속하면 기본으로 보여줄 컴포넌트를 Home 컴포넌트로 하기 위해서임
<br>

```jsx
import './App.css'
import { HashRouter, Route } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'

function App() {
    return (
        <HashRouter>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
        </HashRouter>
    )
}

export default App
```
<br>

### 06. 라우터 테스트하고 문제 찾아보기

+ localhost:3000에 접속하면 주소 뒤에 자동으로 /#/가 붙으면서 영화 앱 화면이 나타남
+ 이번에는 /about에도 접속해 보기
+ 당연히 About 컴포넌트만 출력되야 함에도, Movie 컴포넌트가 함께 출력됨
+ 이 문제를 해결하기
<br>

### 07. 라우터 자세히 살펴보기

+ App 컴포넌트에 라우터를 다음과 같이 구성
<br>

```jsx
...
function App() {
    return (
        <HashRouter>
            <Route path="/home">
            <h1>Home</h1>
            </Route>
            <Route path="/home/introduction">
            <h1>Introduction</h1>
            </Route>
            <Route path="/about">
            <h1>About</h1>
            </Route>
        </HashRouter>
    )
}

export default App
```
<br>

### 08. 라우터 다시 테스트해 보기

+ /home에 접속하면 문제가 없어 보이지만, /home/introduction에 접속하면 Home이 함께 나오는 문제는 여전함
+ 라우터는 사용자가 /home/introduction에 접속하면 /, /home, /home/introduction 순서로 path props가 있는지를 찾음<br>
  그런데 이들 모두가 path props를 갖고 있기 때문에 introduction에 접속하면 이 모든 것이 보이는 것임
+ 이와 같은 이유로 /about에 접속하면 /, /about 순서로 path props를 찾기 때문에 Home과 About 컴포넌트 모두 출력되는 것이었음
<br>

### 09. App 다시 원래대로 돌리기

+ 이제 App.js를 액션08에서 테스트 했던 이전 상태로 되돌리기
+ 08에서 확인한 문제는 어떻게 하면 고칠 수 있을까?
    - Route 컴포넌트에 exact props를 추가하면 해결할 수 있음
    - exact props는 Route 컴포넌트가 path props와 정확하게 일치하는 URL에만 반응하도록 함
<br>

```jsx
...
function App() {
    return (
        <HashRouter>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
        </HashRouter>
    )
}

export default App
```
<br>

### 10. Route 컴포넌트에 exact props 추가해보기

+ path props가 "/"인 Route 컴포넌트에 exact={true}를 추가
<br>

```jsx
...
function App() {
    return (
        <HashRouter>
            <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
        </HashRouter>
    )
}

export default App
```
<br>

### 11. About.css 작성하기

+ route 폴더에 About.css파일을 생성하고 css 코드를 작성
+ About.js에 About.css를 import하고, 적용할 수 있도록 내용도 수정
<br>

```jsx
import './About.css'

function About()
{
    return (
    <div className="about__container">
    <span>
        "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows."
    </span>
    <span>- George Orwell, 1984</span>
    </div>
    )
}

export default About
```
<br><br>

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

```jsx
import PropTypes from 'prop-types'
import './Movie.css'
.
.
.
```

### 08. App.css 파일 작성하기 <br><br>




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
<br>

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

<br>

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
