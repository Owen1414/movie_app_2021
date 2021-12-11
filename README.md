# 201740126 유지웅 - 웹콘텐츠 프로그래밍

<br><br>

# [ 12월 08일 ]

## 8. 리스트와 Key

- 배열의 값을 반환할 때는 map()함수를 사용<br>
변환하여 반환하는 것도 가능!

```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
// [2, 4, 6, 8, 10]을 출력
```

✔ console에서 확인해보기

✔ react에서 배열을 리스트로 만드는 방식도 이와 유사함
<br><br>

### 8-1. 여러개의 엘리먼트 렌더링 하기

- 엘리먼트 모음을 만들고 중괄호 {}를 이용하여 JSX에 포함 시킬 수 있음

- 아래의 JavaScript map() 함수를 사용하여 numbers 배열을 반복 실행함<br>
각 항목에 대해 < li > 엘리먼트를 반환하고 엘리먼트 배열의 결과를 listItems에 저장함

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

- listItems 배열을 < ul >엘리먼트 안에 포함하고 DOM에 렌더링함
  
```jsx
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
<br>

✔ 이 코드는 1부터 5까지의 숫자로 이루어진 리스트를 보여줌
<br><br>


### 8-2. 기본 리스트 컴포넌트

- 일반적으로 컴포넌트 안에서 리스트를 렌더링함

- 이전 예시를 numbers 배열을 받아서 순서 없는 엘리먼트 리스트를 출력하는 컴포넌트로 리팩토링할 수 있음
 
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- 이 코드를 실행하면 리스트의 각 항목에 key를 넣어야 한다는 경고가 표시!

- key는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트
 
- 이제 numbers.map() 안에서 리스트의 각 항목에 key를 할당하여 키 누락 문제를 해결하겠음

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
<br><br>

### 8-3. Key

- Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도움
- 
- key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 함

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

✔ Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것

✔ 대부분의 경우 데이터의 ID를 key로 사용
 
```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

- 렌더링한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있음

```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

- 항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 권장하지 않음

-  인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있음
 
- bin Pokorny’s가 작성한 글인 인덱스를 key로 사용할 경우 부정적인 영향에 대한 상세 설명을 참고하기

- 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용
<br><br>

### 8-4. Key로 컴포넌트 추출하기

- 키는 주변 배열의 **context**에서만 의미가 있음

- 예를 들어 ListItem 컴포넌트를 추출 한 경우 ListItem 안에 있는 < li > 엘리먼트가 아니라<br>
**배열의 < ListItem /> 엘리먼트**가 key를 가져야 함

✔ 예시 : 잘못된 Key 사용법

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 틀렸습니다! 여기에는 key를 지정할 필요가 X
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 틀렸습니다! 여기에 key를 지정해야 함
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

✔ 예시 : 올바른 Key 사용법

```jsx
function ListItem(props) {
  // 맞습니다! 여기에는 key를 지정할 필요가 없음
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 맞습니다! 배열 안에 key를 지정해야 함
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

✔ map() 함수 내부에 있는 엘리먼트에 key를 넣어 주는 게 좋음
<br><br>

### 8-5. Key는 배열내 요소 사이에서만 고유한 값이면 된다.

- Key는 형제 사이에서만 고유한 값이어야 함
 
- Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없음<br>
두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있음

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

- React에서 key는 힌트를 제공하지만 컴포넌트로 전달하지는 않음<br>
컴포넌트에서 key와 동일한 값이 필요하면 다른 이름의 prop으로 명시적으로 전달함

```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

✔ 위 예시에서 Post 컴포넌트는 **props.id**를 읽을 수 있지만 **props.key**는 읽을 수 없음
<br><br>

### 8-6. JSX에 map() 포함시키기

- 위 예시에서 별도의 listItems 변수를 선언하고 이를 JSX에 포함했음

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

- JSX를 사용하면 중괄호 안에 모든 표현식을 포함 시킬 수 있으므로 map() 함수의 결과를 인라인으로 처리할 수 있음

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

- 이 방식을 사용하면 코드가 깔끔해 지지만 사용에 주의해야 함

✔ map() 함수가 너무 중첩된다면 컴포넌트로 추출하는 것이 좋음
<br><br>

## 9. Form

- HTML의 form 엘리먼트는 내부 state를 갖기 때문에 React의 다른 DOM 엘리먼트와는 다르게 동작함

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

- 만일 제시한 예가 순수한 HTML이라면 이 폼은 name을 입력 받고, 폼을 제출하면 새로운 페이지로 이동함

- React에서도 동일한 동작을 원한다면 그대로 사용하면 됨

- 그러나 일반적인 경우라면 JS함수로 폼의 제출을 처리하고,<br>
사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리함

- 이를 위한 표준 방식은 **제어 컴포넌트 (controlled components)** 라고 불리는 기술을 이용하는 것임
<br><br>

### 9-1. 제어 컴포넌트 (Controlled Component)

- HTML에서 < input >, < textarea >, < select >와 같은 폼 엘리먼트는<br>
일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트함

- React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트됨

- 우리는 React state를 “신뢰 가능한 단일 출처 (single source of truth)“로 만들어 두 요소를 결합할 수 있음

- 그러면 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어함<br>
이러한 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트를 **제어 컴포넌트 (controlled component)** 라고 함

- 예를 들어, 이전 예시가 전송될 때 이름을 기록하길 원한다면<br>
폼을 제어 컴포넌트 (controlled component)로 작성할 수 있음

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

- value 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상 this.state.value가 되고<br>
React state는 신뢰 가능한 단일 출처 (single source of truth)가 됨
 
- React state를 업데이트하기 위해 모든 키 입력에서 handleChange가 동작하기 때문에<br>
사용자가 입력할 때 보여지는 값이 업데이트됨

- 제어 컴포넌트로 사용하면, input의 값은 항상 React state에 의해 결정됨<br>
코드를 조금 더 작성해야 한다는 의미이지만, 다른 UI 엘리먼트에 input의 값을 전달하거나<br>
다른 이벤트 핸들러에서 값을 재설정할 수 있음
<br><br>

### 9-2. textarea 태그

- HTML에서 < textarea > 엘리먼트는 텍스트를 자식으로 정의함
  
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

- React에서 <textarea>는 value 어트리뷰트를 대신 사용함
  
- 이렇게하면 <textarea>를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있음

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

✔ this.state.value를 생성자에서 초기화하므로 textarea는 일부 텍스트를 가진채 시작되는 점을 주의
<br><br>

### 9-3. select 태그

- HTML에서 < select >는 드롭 다운 목록을 만듬
  
- 예를 들어, 이 HTML은 과일 드롭 다운 목록을 만듬
  
```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

✔ selected 옵션이 있으므로 Coconut 옵션이 초기값이 되는 점을 주의

- React에서는 selected 어트리뷰트를 사용하는 대신 최상단 select태그에 value 어트리뷰트를 사용함
  
- 한 곳에서 업데이트만 하면되기 때문에 제어 컴포넌트에서 사용하기 더 편함

- 아래는 예시

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

- 전반적으로 < input type="text" >, < textarea > 및 < select > 모두 매우 비슷하게 동작함

- 모두 제어 컴포넌트를 구현하는데 value 어트리뷰트를 허용함
<br><br>

❗ 주의

- select 태그에 multiple 옵션을 허용한다면 value 어트리뷰트에 배열을 전달할 수 있음

```jsx
<select multiple={true} value={['B', 'C']}>
```
<br><br>

### 9-4. file input 태그

- HTML에서 < input type="file" > 은 사용자가 하나 이상의 파일을<br>
로컬에서 서버로 업로드하거나, File API를 통해 JavaScript로 조작할 수 있음

```html
<input type="file" />
```

- 값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트(uncontrolled components)임
<br><br>

### 9-5. 다중 입력 제어하기

- 여러 input 엘리먼트를 제어해야할 때, 각 엘리먼트에 name 어트리뷰트를 추가하고<br>
event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해줌

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

- 주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 computed property name 구문을 사용하고 있음


```jsx
this.setState({
  [name]: value
});
```

- ES5 코드는 아래와 같음

```jsx
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

- 또한, setState()는 자동적으로 현재 state에 일부 state를 병합하기 때문에 바뀐 부분에 대해서만 호출하면 됨
<br><br>

### 9-6. 제어되는 Input Null 값

- 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없음

- value를 설정했는데 여전히 수정할 수 있다면 실수로 value를 undefined나 null로 설정했을 수 있음

- 아래 코드가 이것을 보여줌 (첫 번째 입력은 잠겨있지만 잠시 후 입력이 가능해짐)

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```
<br><br>

### 9-7. 제어 컴포넌트의 대안

- 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고,<br>
React 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하는 게 불편할 수도 있음

- 이럴 경우에 입력 폼을 구현하기 위한 대체 기술인 비제어 컴포넌트 (uncontrolled components)를 사용할 수 있음
<br><br>

### 9-8. 완전한 해결책

✔ Formik 프레임워크 사용을 권장!
<br><br>

## 10. sate를 parents component로 올리기

- 때로는 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있음

- 이럴 때는 가장 가깝고, 공통된 parents component로 state를 올리는 것이 좋음

- 이번 섹션에서는 주어진 온도에서 물이 끓는지 여부를 추정하는 온도 계산기를 만들어 볼 것임
<br><br>

### 10-1. BoilingVerdict와 Calculator 컴포넌트 작성

- 이 컴포넌트는 섭씨온도를 의미하는 celsius prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력함

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

- 그 다음으로 Calculator라는 컴포넌트를 만들어보겠습니다.

- 이 컴포넌트는 온도를 입력할 수 있는 <input>을 렌더링하고 그 값을 this.state.temperature에 저장

- 또한 현재 입력값에 대한 BoilingVerdict 컴포넌트를 렌더링함

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```
<br><br>

### 10-2. 두 번째 Input 추가하기

- 새 요구사항으로써 섭씨 입력 필드뿐만 아니라 화씨 입력 필드를 추가하고 두 필드 간에 동기화 상태를 유지하도록 해보겠음

- Calculator에서 TemperatureInput 컴포넌트를 빼내는 작업부터 시작해보기

- 또한 "c" 또는 "f"의 값을 가질 수 있는 scale prop를 추가할 것임

```jsx
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

- 이제 Calculator가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있음

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

- 이제 두 개의 입력 필드를 갖게 되었음

- 그러나 둘 중 하나에 온도를 입력하더라도 다른 하나는 갱신되지 않는 문제가 있음<br>
  이것은 두 입력 필드 간에 동기화 상태를 유지하고자 했던 원래 요구사항과는 맞지 않음

- 또한 Calculator에서 BoilingVerdict도 역시 보여줄 수 없는 상황
  
- 현재 입력된 온도 정보가 TemperatureInput 안에 숨겨져 있으므로 Calculator는 그 값을 알 수 없기 때문

✔ 아직은 온도만 입력할 수 있는 상태
<br><br>

### 10-3. 변환 함수 작성하기

- 먼저, 섭씨를 화씨로, 또는 그 반대로 변환해주는 함수를 작성해보기

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

- 이 두 함수는 숫자를 변환함

- 이제 temperature 문자열과 변환 함수를 인수로 취해서 문자열을 반환하는 또 다른 함수를 작성해보기<br>
그리고 그것을 한 입력값에 기반해 나머지 입력값을 계산하는 용도로 사용할 것임

- 이 함수는 올바르지 않은 temperature 값에 대해서는<br>
빈 문자열을 반환하고 값을 소수점 세 번째 자리로 반올림하여 출력함

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

- 예를 들어 tryConvert('abc', toCelsius)는 빈 문자열을 반환하고<br>
tryConvert('10.22', toFahrenheit)는 '50.396'을 반환함
<br><br>

### 10-4. State 올리기

- 현재는 두 TemperatureInput 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있음

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

- 그러나 우리는 두 입력값이 서로의 것과 동기화된 상태로 있길 원함<br>
섭씨온도 입력값을 변경할 경우 화씨온도 입력값 역시 변환된 온도를 반영할 수 있어야 하며,<br>
그 반대의 경우에도 마찬가지여야 함

- React에서 state를 공유하는 일은 그 값을 필요로 하는 컴포넌트 간의<br>
가장 가까운 공통 조상으로 state를 끌어올림으로써 이뤄낼 수 있음

- 이렇게 하는 방법을 state 끌어올리기 라고 부릅니다.

- 이제 TemperatureInput이 개별적으로 가지고 있던 지역 state를 지우는 대신<br>
Calculator로 그 값을 옮겨놓을 것임

- Calculator가 공유될 state를 소유하고 있으면 이 컴포넌트는 두 입력 필드의<br>
현재 온도에 대한 “진리의 원천(source of truth)“이 됨

- 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있음<br>
두 TemperatureInput 컴포넌트의 props가 같은 부모인 Calculator로부터 전달되기 때문에,<br>
두 입력 필드는 항상 동기화된 상태를 유지할 수 있게 됨

- 우선, TemperatureInput 컴포넌트에서 this.state.temperature를 this.props.temperature로 대체할 것임<br>
  지금은 this.props.temperature가 이미 존재한다고 가정해보기<br>
  나중에는 이 값을 Calculator로부터 건네야 할 것임

```jsx
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

- props는 읽기 전용

- temperature가 지역 state였을 때는 그 값을 변경하기 위해서<br>
그저 TemperatureInput의 this.setState()를 호출하는 걸로 충분했음<br>
그러나 이제 temperature가 부모로부터 prop로 전달되기 때문에<br>
TemperatureInput은 그 값을 제어할 능력이 없음

- React에서는 보통 이 문제를 컴포넌트를 “제어” 가능하게 만드는 방식으로 해결함<br>
DOM <input>이 value와 onChange prop를 건네받는 것과 비슷한 방식으로,<br>
사용자 정의된 TemperatureInput 역시 temperature와 onTemperatureChange props를<br>
자신의 부모인 Calculator로부터 건네받을 수 있음

- 이제 TemperatureInput에서 온도를 갱신하고 싶으면 this.props.onTemperatureChange를 호출하면 됨

```jsx
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```
<br><br>

❗ 주의

> 사용자 정의 컴포넌트에서 temperature와 onTemperatureChange prop의 이름이 특별한 의미를 갖진 않음<br>
일관된 컨벤션으로 value와 onChange을 사용할 수도 있으며, 여러분이 원하는 그 어떤 이름이든지 사용할 수 있음

<br><br>

- onTemperatureChange prop는 부모 컴포넌트인 Calculator로부터 temperature prop와 함께 제공될 것<br>
이를 이용해 자신의 지역 state를 수정해서 변경사항을 처리하므로,<br>
변경된 새 값을 전달받은 두 입력 필드는 모두 리렌더링될 것임<br>
Calculator의 새로운 구현체는 조금 뒤에 살펴보기

- Calculator의 변경사항을 들여다보기 전에 TemperatureInput 컴포넌트에 대한 변경사항부터 요약해보기<br>
  이 컴포넌트의 지역 state를 제거했으며 this.state.temperature 대신에 this.props.temperature를 읽어오도록 변경했음<br>
  state를 변경하고 싶을 경우 this.setState() 대신에 Calculator로부터 건네받은<br>
  this.props.onTemperatureChange()를 호출하도록 만들었음

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

- 이제 다시 Calculator 컴포넌트로 와 보기

- temperature와 scale의 현재 입력값을 이 컴포넌트의 지역 state에 저장함<br>
이것은 우리가 입력 필드들로부터 “끌어올린” state이며 그들에 대한 “진리의 원천(source of truth)“으로 작용할 것<br>
또한 두 입력 필드를 렌더링하기 위해서 알아야 하는 모든 데이터를 최소한으로 표현한 것이기도 함

- 예를 들어서 섭씨 입력 필드에 37을 입력하면 Calculator 컴포넌트의 state는 다음과 같을 것임

```jsx
{
  temperature: '37',
  scale: 'c'
}
```

- 이후에 화씨 입력 필드의 값을 212로 수정하면 Calculator의 state는 다음과 같은 모습일 것임

```jsx
{
  temperature: '212',
  scale: 'f'
}
```

- 두 입력 필드에 모두 값을 저장하는 일도 가능했지만 결국은 불필요한 작업이었던 것<br>
  가장 최근에 변경된 입력값과 그 값이 나타내는 단위를 저장하는 것만으로도 충분함<br>
  그러고 나면 현재의 temperature와 scale에 기반해 다른 입력 필드의 값을 추론할 수 있음

- 두 입력 필드의 값이 동일한 state로부터 계산되기 때문에 이 둘은 항상 동기화된 상태를 유지하게 됨

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

- 이제 어떤 입력 필드를 수정하든 간에 Calculator의 this.state.temperature와 this.state.scale이 갱신됨<br>
  입력 필드 중 하나는 있는 그대로의 값을 받으므로 사용자가 입력한 값이 보존되고, 다른 입력 필드의 값은 항상 다른 하나에 기반해 재계산됨

✔ 입력값을 변경할 때 일어나는 일들을 정리해보기

- React는 DOM <input>의 onChange에 지정된 함수를 호출함<br>
  위 예시의 경우 TemperatureInput의 handleChange 메서드에 해당함

- TemperatureInput 컴포넌트의 handleChange 메서드는 새로 입력된 값과 함께<br>
  this.props.onTemperatureChange()를 호출<br>
  onTemperatureChange를 포함한 이 컴포넌트의 props는<br>
  부모 컴포넌트인 Calculator로부터 제공받은 것

- 이전 렌더링 단계에서, Calculator는 섭씨 TemperatureInput의 onTemperatureChange를<br>
  Calculator의 handleCelsiusChange 메서드로, 화씨 TemperatureInput의 onTemperatureChange를<br>
  Calculator의 handleFahrenheitChange 메서드로 지정해놓았음<br>
  따라서 우리가 둘 중에 어떤 입력 필드를 수정하느냐에 따라서 Calculator의 두 메서드 중 하나가 호출됨

- 이들 메서드는 내부적으로 Calculator 컴포넌트가 새 입력값, 그리고 현재 수정한 입력 필드의 입력 단위와 함께<br>
  this.setState()를 호출하게 함으로써 React에게 자신을 다시 렌더링하도록 요청함

- React는 UI가 어떻게 보여야 하는지 알아내기 위해 Calculator 컴포넌트의 render 메서드를 호출함<br>
  두 입력 필드의 값은 현재 온도와 활성화된 단위를 기반으로 재계산됨<br>
  온도의 변환이 이 단계에서 수행됨

- React는 Calculator가 전달한 새 props와 함께 각 TemperatureInput 컴포넌트의 render 메서드를 호출함<br>
  그러면서 UI가 어떻게 보여야 할지를 파악함

- React는 BoilingVerdict 컴포넌트에게 섭씨온도를 props로 건네면서 그 컴포넌트의 render 메서드를 호출함

- React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신함
  값을 변경한 입력 필드는 현재 입력값을 그대로 받고, 다른 입력 필드는 변환된 온도 값으로 갱신됨

✔ 입력 필드의 값을 변경할 때마다 동일한 절차를 거치고 두 입력 필드는 동기화된 상태로 유지됨
<br><br>

## 11. 합성 (Composition) vs 상속 (Inheritance)

- React는 강력한 합성 모델을 갖고 있으며, 상속 대신 합성을 사용하여<br>
  컴포넌트 간에 코드를 재사용하는 것이 좋음

- 이번 문서에서는 React를 처음 접한 개발자들이 종종 상속으로 인해<br>
  부딪히는 몇 가지 문제들과 합성을 통해 이러한 문제를 해결하는 방법을 살펴보기
<br><br>

### 11-1. 컴포넌트에 다른 컴포넌트 담기

- 컴포넌트들 중에는 어떤 자식 엘리먼트가 들어올 지 미리 예상할 수 없는 경우가 있음

- 범용적인 ‘박스’ 역할을 하는 Sidebar 혹은 Dialog와 같은 컴포넌트에서 특히 자주 볼 수 있음

- 이러한 컴포넌트에서는 특수한 children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋음

```jsx 
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

- 이러한 방식으로 다른 컴포넌트에서 JSX를 중첩하여 임의의 자식을 전달할 수 있음

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

- < FancyBorder > JSX 태그 안에 있는 것들이 FancyBorder 컴포넌트의 children prop으로 전달됨
  
- FancyBorder는 {props.children}을 <div> 안에 렌더링하므로 전달된 엘리먼트들이 최종 출력됨

- 흔하진 않지만 종종 컴포넌트에 여러 개의 “구멍”이 필요할 수도 있음<br>
  이런 경우에는 children 대신 자신만의 고유한 방식을 적용할 수도 있음

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

- < Contacts />와 < Chat />같은 React 엘리먼트는 단지 객체이기 때문에<br>
  다른 데이터처럼 prop으로 전달할 수 있음<br>
  이러한 접근은 다른 라이브러리의 “슬롯 (slots)“과 비슷해보이지만<br>
  React에서 prop으로 전달할 수 있는 것에는 제한이 없음
<br><br>

### 11-2. 특수화

- 때로는 어떤 컴포넌트의 “특수한 경우”인 컴포넌트를 고려해야 하는 경우가 있음<br>
  예를 들어, WelcomeDialog는 Dialog의 특수한 경우라고 할 수 있음

- React에서는 이 역시 합성을 통해 해결할 수 있음<br>
  더 “구체적인” 컴포넌트가 “일반적인” 컴포넌트를 렌더링하고 props를 통해 내용을 구성함

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

- 합성은 클래스로 정의된 컴포넌트에서도 동일하게 적용됨

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```
<br><br>

### 11-3. 그렇다면 상속은?

- Facebook에서는 수천 개의 React 컴포넌트를 사용하지만,<br>
  컴포넌트를 상속 계층 구조로 작성을 권장할만한 사례를 아직 찾지 못했음

- props와 합성은 명시적이고도 안전한 방법으로 컴포넌트의 모양과 동작을<br>
  커스터마이징하는데 필요한 모든 유연성을 제공함

- 컴포넌트가 원시 타입의 값, React 엘리먼트 혹은 함수 등<br>
  어떠한 props도 받을 수 있다는 것을 기억하기!

- UI가 아닌 기능을 여러 컴포넌트에서 재사용하기를 원한다면,<br>
  별도의 JavaScript 모듈로 분리하는 것이 좋음

- 컴포넌트에서 해당 함수, 객체, 클래스 등을 import 하여 사용할 수 있음

❗ 상속받을 필요 없음!
<br><br>

## 12. React로 사고하기

- React는 JavaScript로 규모가 크고 빠른 웹 애플리케이션을 만드는 가장 좋은 방법

- React는 Facebook과 Instagram을 통해 확장성을 입증했음

- React의 가장 멋진 점 중 하나는 앱을 설계하는 방식임

- 이 문서를 통해 React로 상품들을 검색할 수 있는 데이터 테이블을 만드는 과정을 함께 생각해 보기

✔ 목업(Mockup)으로 시작하기!
<br><br>

### 12-1. 1단계: UI를 컴포넌트 계층 구조로 나누기

- 우리가 할 첫 번째 일은 하위 컴포넌트를 포함한 모든 컴포넌트의 주변에<br>
  박스를 그리고 그 각각에 이름을 붙이기

- 디자이너와 함께 일한다면, 이것들을 이미 정해두었을 수 있으니 한번 대화해 보기<br>
  디자이너의 Photoshop 레이어 이름이 React 컴포넌트의 이름이 될 수 있음

> 하지만 어떤 것이 컴포넌트가 되어야 할지 어떻게 알 수 있을까?

- 우리가 새로운 함수나 객체를 만들 때처럼 만들면 됨

- 한 가지 테크닉은 단일 책임 원칙임

- 이는 하나의 컴포넌트는 한 가지 일을 하는게 이상적이라는 원칙

- 하나의 컴포넌트가 점점 커지게 된다면<br>
  보다 작은 하위 컴포넌트로 분리하는 것이 바람직함

- 주로 JSON 데이터를 유저에게 보여주기 때문에 데이터 모델이 적절하게 만들어졌다면<br>
  UI(컴포넌트 구조)가 잘 연결될 것임

- 이는 UI와 데이터 모델이 같은 인포메이션 아키텍처(information architecture)를 갖는 경향이 있기 때문

- 각 컴포넌트가 데이터 모델의 한 조각을 나타내도록 분리해 줌

✔ 실제 컴포넌트 계층구조는 문서를 참고하기
<br><br>

### 12-2. 2단계: React로 정적인 버전 만들기

- 이제 컴포넌트 계층구조가 만들어졌으니 앱을 실제로 구현해 보기

- 가장 쉬운 방법은 데이터 모델을 가지고 UI를 렌더링은 되지만<br>
  아무 동작도 없는 버전을 만들어보는 것

- 이처럼 과정을 나누는 것이 좋은데, 정적 버전을 만드는 것은 생각은 적게 필요하지만<br>
  타이핑은 많이 필요로 하고, 상호작용을 만드는 것은 생각은 많이 해야 하지만<br>
  타이핑은 적게 필요로 하기 때문

> 정적 버전

- 데이터 모델을 렌더링하는 컴포넌트를 만들고 props 를 이용해 데이터를 전달해 줌

- props는 부모가 자식에게 데이터를 넘겨줄 때 사용할 수 있는 방법

- 정적 버전을 만들기 위해 state를 사용하지 말기

- state는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용함

- 우리는 앱의 정적 버전을 만들고 있기 때문에 지금은 필요하지 않음

- 앱을 만들 때 하향식(top-down)이나 상향식(bottom-up)으로 만들 수 있음

- 다시 말해 계층 구조의 상층부에 있는 컴포넌트 (즉 FilterableProductTable부터 시작하는 것)부터<br>
  만들거나 하층부에 있는 컴포넌트 (ProductRow) 부터 만들 수도 있음

- 간단한 예시에서는 보통 하향식으로 만드는 것이 쉽지만<br>
  프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하는 것이 더 쉬움

- 이 단계가 끝나면 데이터 렌더링을 위해 만들어진 재사용 가능한 컴포넌트들의 라이브러리를 갖게 됨

- 현재는 앱의 정적 버전이기 때문에 컴포넌트는 render() 메서드만 가지고 있음

- 계층구조의 최상단 컴포넌트 (FilterableProductTable)는 prop으로 데이터 모델을 받음

- 데이터 모델이 변경되면 ReactDOM.render()를 다시 호출해서 UI가 업데이트 됨
<br><br>

### 12-3. 3단계: UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기

- UI를 상호작용하게 만들려면 기반 데이터 모델을 변경할 수 있는 방법이 있어야 함

- React에서는 이를 state를 통해 변경함

- 애플리케이션을 올바르게 만들기 위해서는 애플리케이션에서 필요로 하는 변경 가능한 state의 최소 집합을 생각해보아야 함<br>
❗ 여기서 핵심은 중복배제원칙임

- 애플리케이션이 필요로 하는 가장 최소한의 state를 찾고<br>
  이를 통해 나머지 모든 것들이 필요에 따라 그때그때 계산되도록 만드는 것임

- 예를 들어 TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하고<br>
  TODO 아이템의 개수를 표현하는 state를 별도로 만들지 않기<br>
  TODO 갯수를 렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 됨

- 예시 애플리케이션 내 데이터들을 생각해보기<br>
  애플리케이션은 다음과 같은 데이터를 가지고 있음

  + 제품의 원본 목록
  
  + 유저가 입력한 검색어
  
  + 체크박스의 값
  
  + 필터링 된 제품들의 목록

- 각각 살펴보고 어떤 것이 state가 되어야 하는지 살펴보기

- state의 대상은 다음의 세 가지 질문을 통해 결정할 수 있음
  
  1) 부모로부터 props를 통해 전달됩니까?
  
  2) 시간이 지나도 변하지 않습니까?
  
  3) 컴포넌트 안의 다른 state나 props를 가지고 계산 가능합니까?

- 위 세가지 질문 중에서 하나라도 yes이면 state가 아님

- 제품의 원본 목록은 props를 통해 전달되므로 state가 아님

- 검색어와 체크박스는 state로 볼 수 있는데 시간이 지남에 따라 변하기도 하지만<br>
  다른 것들로부터 계산될 수 없기 때문

- 그리고 마지막으로 필터링된 목록은 state가 아님<br>
  제품의 원본 목록과 검색어, 체크박스의 값을 조합해서 계산해낼 수 있기 때문

- 결과적으로 애플리케이션은 다음과 같은 state를 갖는다.<br>
✔ 유저가 입력한 검색어 와 체크박스의 값
<br><br>

### 12-4. 4단계: State가 어디에 있어야 할지 찾기

- 앞서 최소한으로 필요한 state가 뭔지 찾아냄

- 다음으로는 어떤 컴포넌트가 state를 변경하거나 소유할지 찾아야 함

❗ 기억하기: React는 항상 컴포넌트 계층구조를 따라 아래로 내려가는 단방향 데이터 흐름을 따름

- 어떤 컴포넌트가 어떤 state를 가져야 하는 지 바로 결정하기 어려울 수도 있음<br>
  많은 초보 개발자가 이 부분을 가장 어려워함<br>
  아래 과정을 따라 결정해 보기

> 애플리케이션이 갖는 각각의 state에 대해서

- state를 기반으로 렌더링하는 모든 컴포넌트를 찾기

- 공통 소유 컴포넌트 (common owner component)를 찾기<br>
(계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의컴포넌트)

- 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 함

- state를 소유할 적절한 컴포넌트를 찾지 못했다면, state를 소유하는 컴포넌트를 하나 만들어서<br>
  공통 오너 컴포넌트의 상위 계층에 추가하기

✔ 예제에 적용하는 방법은 문서를 참고
<br><br>

### 12-5. 5단계: 역방향 데이터 흐름 추가하기

- 지금까지 우리는 계층 구조 아래로 흐르는 props와 state를 이용해서 앱을 만들었음

- 이제 다른 방향의 데이터 흐름을 만들어볼 시간

- 계층 구조의 하단에 있는 폼 컴포넌트에서 FilterableProductTable의 state를 업데이트할 수 있어야 함

- React는 전통적인 양방향 데이터 바인딩(two-way data binding)과 비교하면,<br>
  더 많은 타이핑을 필요로 하지만 데이터 흐름을 명시적으로 보이게 만들어서<br>
  프로그램이 어떻게 동작하는지 파악할 수 있게 도와줌

- 4단계의 예시에서 체크하거나 키보드를 타이핑할 경우 React가 입력을 무시하는 것을 확인할 수 있음

- 이는 input 태그의 value 속성이 항상 FilterableProductTable에서 전달된 state와 동일하도록 설정했기 때문

- 우리가 원하는 것이 무엇인지를 한번 생각해 보기

- 우리는 사용자가 폼을 변경할 때마다 사용자의 입력을 반영할 수 있도록 state를 업데이트하기를 원함

- 컴포넌트는 그 자신의 state만 변경할 수 있기 때문에 FilterableProductTable는<br>
  SearchBar에 콜백을 넘겨서 state가 업데이트되어야 할 때마다 호출되도록 함

- 우리는 input에 onChange 이벤트를 사용해서 알림을 받을 수 있음

- FilterableProductTable에서 전달된 콜백은 setState()를 호출하고 앱이 업데이트함

<br><br><br>

# [ 12월 01일 ]

## 5. State와 생명주기

- 엘리먼트 렌더링에서는 UI를 업데이트하는 한 가지 방법만 배웠으며,<br>
렌더링 된 출력값을 변경하기 위해 ReactDOM.render()를 호출했음

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

- 이 섹션에서는 Clock 컴포넌트를 완전히 재사용하고 캡슐화하는 방법을 배울 것임

- 이 컴포넌트는 스스로 타이머를 설정할 것이고 매초 스스로 업데이트할 것임
<br>

- 시계가 생긴 것에 따라 캡슐화하는 것으로 시작할 수 있음

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

- 그러나 여기에는 중요한 요건이 누락되어 있음

- Clock이 타이머를 설정하고 매초 UI를 업데이트하는 것이 Clock의 구현 세부사항이 되어야 함
<br>

- 한 번만 코드를 작성하고 Clock이 스스로 업데이트하도록 만들려고 함

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

- 이것을 구현하기 위해서 Clock 컴포넌트에 **state**를 추가해야 함

- State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어됨

<br><br>

### - 함수에서 클래스로 변환하기

- React.Component를 확장하는 동일한 이름의 ES6 class를 생성

- render()라고 불리는 빈 메서드를 추가

- 함수의 내용을 render() 메서드 안으로 옮기기

- render() 내용 안에 있는 props를 this.props로 변경

- 남아있는 빈 함수 선언을 삭제

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
<br>

- Clock은 이제 함수가 아닌 클래스로 정의됨

- render 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 < Clock />을 렌더링하는 경우<br>
Clock 클래스의 단일 인스턴스만 사용됨<br>
이것은 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해줌

<br><br>

### - 클래스에 로컬 State 추가하기

- 세 단계에 걸쳐서 date를 props에서 state로 이동해 보기
<br>

1. render() 메서드 안에 있는 this.props.date를 this.state.date로 변경

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
<br>

2. 초기 this.state를 지정하는 class constructor를 추가합니다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
<br>

- **여기서 어떻게 props를 기본 constructor에 전달하는지 유의!**

```jsx
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```
<br>
  
- 클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 합니다.
<br>

3. < Clock /> 요소에서 date prop을 삭제

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
<br>

- 타이머 코드는 나중에 다시 컴포넌트로 추가
<br>

4. 결과

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
<br>

- 다음으로 Clock이 스스로 타이머를 설정하고 매초 스스로 업데이트하도록 만들어 보기

<br><br>

### - 생명주기 메서드를 클래스에 추가하기

- 많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요!

- Clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 함<br>
이것은 React에서 **마운팅**이라고 함

- 또한 Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 함<br>
React에서 **언마운팅**이라고 함

- 컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있음

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
<br>

- 이러한 메서드들은 **생명주기 메서드**라고 부름
<br>

- componentDidMount() 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됨<br>
이 장소가 타이머를 설정하기에 좋은 장소

```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
<br>

- this (this.timerID)에서 어떻게 타이머 ID를 제대로 저장하는지 주의

- this.props가 React에 의해 스스로 설정되고 this.state가 특수한 의미가 있지만,<br>
타이머 ID와 같이 데이터 흐름 안에 포함되지 않는 어떤 항목을 보관할 필요가 있다면<br>
자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 됨

- componentWillUnmount() 생명주기 메서드 안에 있는 타이머를 분해해보기

```jsx
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
<br>

- 마지막으로 Clock 컴포넌트가 매초 작동하도록 하는 tick()이라는 메서드를 구현해보기

- 이것은 컴포넌트 로컬 state를 업데이트하기 위해 this.setState()를 사용

```jsx
  class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
<br>

-> 이제 시계는 매초 째깍거리게 됨
<br><br>

✔ **요약**

1. < Clock />가 ReactDOM.render()로 전달되었을 때 React는 Clock 컴포넌트의 constructor를 호출<br>
 Clock이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 this.state를 초기화함<br>
나중에 이 state를 업데이트할 것<br>

2. React는 Clock 컴포넌트의 render() 메서드를 호출<br>
이를 통해 React는 화면에 표시되어야 할 내용을 알게 됨<br>
그 다음 React는 Clock의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트<br>

3. Clock 출력값이 DOM에 삽입되면, React는 componentDidMount() 생명주기 메서드를 호출<br>
그 안에서 Clock 컴포넌트는 매초 컴포넌트의 tick() 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청<br>

4. 매초 브라우저가 tick() 메서드를 호출<br>
그 안에서 Clock 컴포넌트는 setState()에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행<br>
setState() 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 render() 메서드를 다시 호출<br>
이 때 render() 메서드 안의 this.state.date가 달라지고 렌더링 출력값은 업데이트된 시각을 포함<br>
React는 이에 따라 DOM을 업데이트<br>

5. Clock 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면<br>
React는 타이머를 멈추기 위해 componentWillUnmount() 생명주기 메서드를 호출

<br><br>

### - State를 올바르게 사용하기
<br>

- **직접 State를 수정하지 말기**
<br>

예를 들어, 이 코드는 컴포넌트를 다시 렌더링하지 않기


```jsx
// Wrong
this.state.comment = 'Hello';
```
<br>

대신에 **setState()** 를 사용


```jsx
// Correct
this.setState({comment: 'Hello'});
```
<br>

✔ this.state를 지정할 수 있는 유일한 공간은 바로 **constructor**
<br><br>

- **State 업데이트는 비동기적일 수도 있음**
<br>

React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있음

this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 됨

예를 들어, 다음 코드는 카운터 업데이트에 실패할 수 있음

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
<br>

이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 setState()를 사용

그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것임

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
<br>

위에서는 화살표 함수를 사용했지만, 일반적인 함수에서도 정상적으로 작동함

```jsx
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
<br><br>

- **State 업데이트는 병합됨**
<br>

setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합함

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있음

```jsx
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
<br>

별도의 setState() 호출로 이러한 변수를 독립적으로 업데이트할 수 있음

```jsx
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
<br>

병합은 얕게 이루어지기 때문에 this.setState({comments})는 this.state.posts에 영향을 주진 않지만<br>
this.state.comments는 완전히 대체됨

<br><br>

### - 데이터는 아래로 흐름
<br>

- 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없음

- 이 때문에 state는 종종 로컬 또는 캡슐화라고 불림<br>
state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없음

- 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있음

```jsx
<FormattedDate date={this.state.date} />
```
<br>

- FormattedDate 컴포넌트는 date를 자신의 props로 받을 것이고 이것이 Clock의 state로부터 왔는지,<br>
Clock의 props에서 왔는지, 수동으로 입력한 것인지 알지 못함

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
<br>

- 일반적으로 이를 **하향식(top-down)** 또는 **단방향식** 데이터 흐름이라고 합니다.<br>
모든 state는 항상 특정한 컴포넌트가 소유하고 있으며<br>
그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 **아래**에 있는 컴포넌트에만 영향을 미침

- 트리구조가 props들의 폭포라고 상상하면<br>
각 컴포넌트의 state는 임의의 점에서 만나지만<br>
동시에 아래로 흐르는 부가적인 수원(water source)이라고 할 수 있음

- 모든 컴포넌트가 완전히 독립적이라는 것을 보여주기 위해 App 렌더링하는 세 개의 <Clock>을 만들었음

```jsx
  function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
<br>
  
- 각 Clock은 자신만의 타이머를 설정하고 독립적으로 업데이트를 함

- React 앱에서 컴포넌트가 유상태 또는 무상태에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주함<br>
유상태 컴포넌트 안에서 무상태 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있음

<br><br>

## 6. 이벤트 처리하기
  
- React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사
  
- 몇가지 문법 차이
  
1. React의 이벤트는 소문자 대신 캐멀케이스(camelCase) 를 사용
  
2. JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달함
<br>
  
- HTML과 React 비교
  
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
  
```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
<br>
  
- 또 다른 차이점은 React에서는 false를 반환해도 기본 동작을 방지할 수 없음<br>
반드시 preventDefault를 명시적으로 호출해야 함
  
예를 들어, 일반 HTML에서 폼을 제출할 때 가지고 있는 기본 동작을 방지하기 위해 다음과 같은 코드를 작성할 수 있음
  
```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```
<br>
  
React에서 작성

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```
<br>  
  
- 여기서 e는 합성 이벤트

- React는 W3C 명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성에 대해 걱정할 필요가 없음<br>
React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않음

- React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 addEventListener를 호출할 필요가 없음<br>
대신, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 됨

- ES6 클래스를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것<br>
예를 들어, 다음 Toggle 컴포넌트는 사용자가 “ON”과 “OFF” 상태를 토글 할 수 있는 버튼을 렌더링함
  
```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```
<br>

- JSX 콜백 안에서 this의 의미에 대해 주의해야 함<br>
JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않음<br>
this.handleClick을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 됨

- 이는 React만의 특수한 동작이 아니며, JavaScript에서 함수가 작동하는 방식의 일부<br>
일반적으로 onClick={this.handleClick}과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우,<br>
해당 메서드를 바인딩 해야 함

- bind를 호출하는 것이 불편하다면, 이를 해결할 수 있는 두 가지 방법이 있음<br>
실험적인 퍼블릭 클래스 필드 문법을 사용하고 있다면,<br>
클래스 필드를 사용하여 콜백을 올바르게 바인딩할 수 있음

```jsx
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
<br>
  
- Create React App에서는 이 문법이 기본적으로 설정되어 있음

- 클래스 필드 문법을 사용하고 있지 않다면, 콜백에 화살표 함수를 사용하는 방법도 있음
  
```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
<br>
  
- 이 문법의 문제점은 LoggingButton이 렌더링될 때마다 다른 콜백이 생성된다는 것
  
- 대부분의 경우 문제가 되지 않으나, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할수도 있음
  
- 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장

<br><br>

### - 이벤트 핸들러에 인자 전달하기
  
- 루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적
  
- 예를 들어, id가 행의 ID일 경우 다음 코드가 모두 작동함
  
```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
<br>
  
- 위 두 줄은 동등하며 각각 화살표 함수와 Function.prototype.bind를 사용함

- 두 경우 모두 React 이벤트를 나타내는 e 인자가 ID 뒤에 두 번째 인자로 전달됨
  
- 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달됨

<br><br>
  
## 7. 조건부 렌더링

- React에서 조건부 렌더링은 JavaScript에서의 조건 처리와 같이 동작

- if 나 조건부 연산자와 같은 JavaScript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하면 됨<br>
그러면 React는 현재 상태에 맞게 UI를 업데이트할 것

- 아래 두 컴포넌트가 있다고 가정

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
<br>
  
- 이제 사용자의 로그인 상태에 맞게 위 컴포넌트 중 하나를 보여주는 Greeting 컴포넌트를 만들기
  
 ```jsx
 function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
); 
```
<br>

-  예시는 isLoggedIn prop에 따라서 다른 인사말을 렌더링함

<br><br>

### - 엘리먼트 변수

- 엘리먼트를 저장하기 위해 변수를 사용할 수 있음
  
- 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링 할 수 있음

로그아웃과 로그인 버튼을 나타내는 두 컴포넌트가 있다고 가정

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```
<br>

- 아래의 예시에서는 LoginControl이라는 유상태 컴포넌트 를 만들 것임

- 이 컴포넌트는 현재 상태에 맞게 < LoginButton />이나 < LogoutButton />을 렌더링

- 또한 이전 예시에서의 < Greeting />도 함께 렌더링

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

<br><br>

### - 논리 && 연산자로 If를 인라인으로 표현하기

- JSX 안에는 중괄호를 이용해서 표현식을 포함 할 수 있음<br>
그 안에 JavaScript의 논리 연산자 &&를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있음

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
<br>

- JavaScript에서 true && expression은 항상 expression으로 평가되고 false && expression은 항상 false로 평가됨

- 따라서 && 뒤의 엘리먼트는 조건이 true일때 출력이 됨<br>
조건이 false라면 React는 무시하고 건너뜀

- falsy 표현식을 반환하면 여전히 && 뒤에 있는 표현식은 건너뛰지만 falsy 표현식이 반환된다는 것에 주의

- 아래 예시에서, <div>0</div>이 render 메서드에서 반환됨

```jsx
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

<br><br>

### - 조건부 연산자로 If-Else구문 인라인으로 표현하기

- 엘리먼트를 조건부로 렌더링하는 다른 방법은 조건부 연산자인 **condition ? true: false** 를 사용하는 것

- 아래의 예시에서는 짧은 구문을 조건부로 렌더링함

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
<br>

- 가독성은 좀 떨어지지만, 더 큰 표현식에도 이 구문을 사용할 수 있음

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

<br><br>

### - 컴포넌트가 렌더링하는 것을 막기

- 가끔 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있음

- 이때는 렌더링 결과를 출력하는 대신 null을 반환하면 해결할 수 있음

- 아래의 예시에서는 < WarningBanner />가 warn prop의 값에 의해서 렌더링됨

- prop이 false라면 컴포넌트는 렌더링하지 않게 됩니다.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
<br>
  
- 컴포넌트의 render 메서드로부터 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않음
  
- 그 예로 componentDidUpdate는 계속해서 호출되게 됨

<br><br><br>

# [ 11월 24일 ]


## JSX 소개

- JavaScript를 확장한 문법

```jsx
const element = <h1>Hello, world!</h1>;
```
<br>


### - JSX에 표현식 포함하기
<br>

- 아래 예시에서는 name이라는 변수를 선언한 후 중괄호로 감싸 JSX 안에 사용함

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

- JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있음

- 아래 예시에서는 JavaScript 함수 호출의 결과인 formatName(user)을<br>
h1(태그) 엘리먼트에 포함했음

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
<br>

### - JSX도 표현식
<br>

- 컴파일이 끝나면, JSX 표현식이 정규 JavaScript 함수 호출이 되고<br>
JavaScript 객체로 인식됨

- 즉, JSX를 if 구문 및 for loop 안에 사용하고, 변수에 할당하고,<br>
인자로서 받아들이고, 함수로부터 반환할 수 있음

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
<br>

### - JSX 속성 정의
<br>

- 어트리뷰트에 따옴표를 이용해 문자열 리터럴을 정의할 수 있음

```jsx
const element = <div tabIndex="0"></div>;
```
<br>

- 중괄호를 사용하여 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있음

```jsx
const element = <img src={user.avatarUrl}></img>;
```
<br>

- 어트리뷰트에 JavaScript 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하지 말기!<br>
따옴표(문자열 값에 사용) 또는 중괄호(표현식에 사용) 중 하나만 사용하고,<br>
동일한 어트리뷰트에 두 가지를 동시에 사용하면 안 됨

<br>

>**< 경 고 >**<br><br>
JSX는 HTML보다는 JavaScript에 가깝기 때문에,<br>
React DOM은 HTML 어트리뷰트 이름 대신 **CamelCase** 프로퍼티 명명 규칙을 사용함

<br>

### - JSX로 자식 정의
<br>

- 태그가 비어있다면 XML처럼 /> 를 이용해 바로 닫아주어야 함

```jsx
const element = <img src={user.avatarUrl} />;
```
<br>

- JSX 태그는 자식을 포함할 수 있음

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
<br>

### - JSX는 주입 공격을 방지
<br>

- JSX에 사용자 입력을 삽입하는 것은 안전

```jsx
const title = response.potentiallyMaliciousInput;
// 이것은 안전합니다.
const element = <h1>{title}</h1>;
```
<br>

- 기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로,<br>
애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않음<br>
모든 항목은 렌더링 되기 전에 문자열로 변환됨<br>
이런 특성으로 인해 XSS (cross-site-scripting) 공격을 방지할 수 있음

<br>

### - JSX는 객체를 표현
<br>

- Babel은 JSX를 React.createElement() 호출로 컴파일함

- 다음 두 예시는 동일함

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
<br>

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
<br>

- React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록<br>
몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성함

```jsx
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
<br>

- 이러한 객체를 **React 엘리먼트**라고 하며,<br> 화면에서 보고 싶은 것을 나타내는 표현이라 생각하면 됨<br>
React는 이 객체를 읽어서, DOM을 구성하고 최신 상태로 유지하는 데 사용함

<br>

>**< 팁 >**<br><br>
ES6 및 JSX 코드가 올바르게 표시되도록 편집기에<br>
**Babel** 언어 설정을 사용하는 것을 권장

<br><br>

## 엘리먼트 렌더링

- 엘리먼트는 React 앱의 가장 작은 단위

- 엘리먼트는 화면에 표시할 내용을 기술함

```jsx
const element = <h1>Hello, world</h1>;
```


- 브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object)<br>
쉽게 생성할 수 있음<br>
React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트함

<br>

### - DOM에 엘리먼트 렌더링하기
<br>

- HTML 파일 어딘가에 div 태그가 있다고 가정

```html
<div id="root"></div>
```


- 이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에<br>
이것을 **“루트(root)” DOM 노드**라고 부름

- React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있음<br>
React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의<br>
독립된 루트 DOM 노드가 있을 수 있음

- React 엘리먼트를 루트 DOM 노드에 렌더링하려면<br>
둘 다 ReactDOM.render()로 전달하면 됨

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

<br><br>

## Components와 Props

- 개념적으로 컴포넌트는 JavaScript 함수와 유사함<br>
“props”라고 하는 임의의 입력을 받은 후,<br>
화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환함

<br>

### - 함수 컴포넌트와 클래스 컴포넌트
<br>

- 컴포넌트를 정의하는 가장 간단한 방법은<br>
**JavaScript 함수**를 작성하는 것

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 이 함수는 데이터를 가진 하나의 “props” (props는 속성을 나타내는 데이터) 객체 인자를 받은 후<br>
React 엘리먼트를 반환하므로 유효한 React 컴포넌트<br>
이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 “함수 컴포넌트”라고 호칭함

- 또한 ES6 class를 사용하여 컴포넌트를 정의할 수 있음

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일함

<br>

### - 컴포넌트 렌더링
<br>

- 이전까지는 DOM 태그만을 사용해 React 엘리먼트를 나타냈음

```jsx
const element = <div />;
```

- React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있음

```jsx
const element = <Welcome name="Sara" />;
```

- React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면<br>
JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달함<br>
이 객체를 “props”라고 함


- 다음은 페이지에 “Hello, Sara”를 렌더링하는 예시

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

- 이 예시에서는 다음과 같은 일들이 일어납니다.

```
1. <Welcome name="Sara" /> 엘리먼트로 ReactDOM.render()를 호출함
2. React는 {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출함
3. Welcome 컴포넌트는 결과적으로 <h1>Hello, Sara</h1> 엘리먼트를 반환함
4. React DOM은 <h1>Hello, Sara</h1> 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트함
```
<br>

> 주의 : 컴포넌트의 이름은 항상 대문자로 시작함<br><br>
React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리함<br>
예를 들어 < div />는 HTML div 태그를 나타내지만,<br>
< Welcome />은 컴포넌트를 나타내며 범위 안에 Welcome이 있어야 함

<br>

### - 컴포넌트 합성
<br>

- 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있음<br>
이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미함<br>
React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이<br>
흔히 컴포넌트로 표현됨

- 예를 들어 Welcome을 여러 번 렌더링하는 App 컴포넌트를 만들 수 있음

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
<br>

### - 함수에서 클래스로 변환하기
<br>

- React.Component를 확장하는 동일한 이름의 ES6 class를 생성

- render()라고 불리는 빈 메서드를 추가

- 함수의 내용을 render() 메서드 안으로 옮기기

- render() 내용 안에 있는 props를 this.props로 변경

- 남아있는 빈 함수 선언을 삭제

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
<br>

### - 클래스에 로컬 State 추가하기
<br>

- render() 메서드 안에 있는 this.props.date를 this.state.date로 변경

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- 초기 this.state를 지정하는 class constructor를 추가

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- date prop을 삭제

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```





<br><br><br>

# [ 11월 17일 ]

## < 3번째 예제 - Todo List >

- **TodoApp**과 **TodoList** 두개의 컴포넌트로 구성

- handleChange는 모든 키보드 입력마다 React의 state를 갱신해서 보여줌<br>
✔ element에서 확인

- 시간순으로 보면 다음과 같이 동작<br>
✔ 유저 입력 -> handleChange -> React의 state 갱신 -> form element가 React state를 참조

- 유저 입력을 강제로 대문자로 변경할 경우에도 사용

> handleChange(event) {<br>
this.setState({value: event.target.value.toUpperCase( )})<br>
}

- handleSubmit은 버튼이 클릭될 때 발생하는 event를 처리

- render( )메소드 에서 초기 렌더링을 실행함

- onChange를 통해 input에 입력되는 값으로 state 상태 변경을 준비함

- 입력된 값은 state의 "text: '' "에 임시로 저장됨

- lavel의 htmlFor은 input과의 연결을 위한 id값<br>
✔ className처럼 html과 구분하기 위해 JSX에서 사용하는 키워드

- 버튼을 클릭하면 버튼의 숫자를 증가시킴

- 리스트는 배열로 저장되기 때문에 item.length를 통해 list의 수를 확인함

- input area에 이벤트가 발생하면 handleChange(e)가 동작하여 State의 text값을 변경

- “Add #x”버튼을 클릭하면 리스트의 item.length에 1을 더해서 버튼에 출력

- 크롬 DevTool을 열어 실시간으로 state가 변화하는 것을 확인

- 이제 handleSubmit 메소드에 대해 살펴보기<br>
제일 중요한 것은 **preventDefault 메소드를 사용하는 이유**
<br>

### - handleSubmit(e)에서 e.preventDefault() 메소드를 사용하는 이유?

브라우저에서 양식을 제출할 때는 기본적으로 브라우저의 새로 고침이 발생하는데,<br>
React나 SPA(single page application)의 경우 필요 없는 동작임으로 이를 방지하기 위해 사용

- stae.text의 길이가 0이면 아무 것도 반환하지 않음
 
- 0이 아니면 newItem에 입력 받은 text와 현재 시간을 저장
 
- 이렇게 저장된 newItem을 state의 item배열에 저장하고, text를 비움
<br>

### - TodoList Component

1. TodoList class를 생성

2. ul 안에 추가된 task를 li로 출력

3. 앞서 저장한 id값은 key props로 사용

4. 마지막으로 ReactDOM으로 랜더링만 하면 끝
<br>

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script crossorigin src=""></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel">
    class TodoApp extends React.Component {
        constructor(props) {
          super(props);
          this.state = { items: [], text: '' };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }
      
        render() {
          return (
            <div>
              <h3>TODO</h3>
              <TodoList items={this.state.items} />
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="new-todo">
                  What needs to be done?
                </label>
                <input
                  id="new-todo"
                  onChange={this.handleChange}
                  value={this.state.text}
                />
                <button>
                  Add #{this.state.items.length + 1}
                </button>
              </form>
            </div>
          );
        }
      
        handleChange(e) {
          this.setState({ text: e.target.value });
        }
      
        handleSubmit(e) {
          e.preventDefault();
          if (this.state.text.length === 0) {
            return;
          }
          const newItem = {
            text: this.state.text,
            id: Date.now()
          };
          this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
          }));
        }
      }
      
      class TodoList extends React.Component {
        render() {
          return (
            <ul>
              {this.props.items.map(item => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          );
        }
      }
      
      ReactDOM.render(
        <TodoApp />,
        document.getElementById('todos-example')
      );
    </script>
    </head>

    <body>
      <div id="todos-example"></div>    
    </body>
      
    </html>
```
<br>

### - 혹시 key props의 역할이 기억나지 않는다면...

- key는 props의 안정적으로 사용할 수 있도록 고유성을 부여하기 위해 필요

- React가 어떤 props를 변경, 추가 또는 삭제할지 식별하는 것을 도와줌

- 반드시 date를 사용하지 않아도 되고 배열의 index값을 사용해도 됨

- 유일한 값이라면 그 값이 무엇이든 상관없음

<br><br>

## < 4번째 예제 - 외부 플러그인을 사용하는 컴포넌트 >

<br>

> **Remarkable 오픈 소스 사이트** <br><br>
https://github.com/jonschlinkert/remarkable

<br>

- 외부컴포넌트를 사용한 **markdown 에디터**

- CDN 방법으로 진행했음으로 동일하게 진행

- 다만 외부 플러그인은 Remarkable을 사용함으로 **CDN으로 링크를 추가**

- remarkable.js로 검색<br>
✔ https://github.com/jonschlinkert/remarkable

- 사이트에서 제공하는 CDN사이트 2곳 중 한 곳에서 링크를 복사해 추가하기

- 공식사이트의 소스코드를 복사해 넣기

- 테스트 하기

<br>

### - creat-react-app으로 Remarkable 사용하기
<br>

1. creat-react-app으로 markdown-editor 프로젝트를 생성

2. 정상 동작을 확인

3. App.js에 있는 필요없는 코드를 삭제

4. App.js에 문서의 코드를 복사해 넣기

5. component의 이름을 App으로 수정

6. rendering은 index.js에 위임

7. Remarkable을 설치
> npm install remarkable

8. React와 Remarkable을 import

```jsx
import { Remarkable } from 'remarkable'
```

9. 동작이 되는지 확인

<br><br><br>



### - **APP.js 완성 소스**

<br>

```jsx
import React from 'react';
import { Remarkable } from 'remarkable';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
```
<br>

- 외부 컴포넌트를 사용하기 위해 생성자 내에 객체를 생성

- state를 이용하여 Remarkable에 변환할 마크다운 문장을 제출

- 글이 입력되면 handleChange 이벤트를 사용하여 state의 value를 갱신

- getRawMarkup() 메소드를 통해 html을 반환 받음

<br><br><br>

# [ 11월 10일 ]

 **계정 변경 방법**

> **git config --global user.name 변경을 희망하는 계정**<br>

> **git config --global user.email 변경을 희망하는 이메일**

<br><br>

## 영화 앱 깃허브에 배포하기

### 01/02. package.json 파일 수정

+ 가장 먼저 해야 할 일은 깃허브 주소를 영화 앱이 인식할 수 있도록<br>
**package.json 파일**을 수정하는 것
+ homepage 키와 키값을 browserslist키 아래에 추가하기
+ 깃허브 계정과 저장소 이름에 주의하여 입력

```json

"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "homepage":"https://Owen1414.github.io/movie_app_2021"
```
<br>

+ package.json 파일을 열어 **scripts 키캆**으로 명령어를 추가

```json

  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build", 
    "deploy":"gh-pages -d build"
  },

```
<br>

### 03. 최종 코드 깃허브에 업로드하기

```
git add .
git commit -m "최종 완성 코드"
git push origin master
```
<br>

### 04. gh-pages 설치하기

+ 최종 완성 코드를 깃허브에 업로드함
+ 배포 서비스를 이용해서 다른 사람들이<br>
영화 앱을 사용할 수 있도록 해야 함
+ **이 책에서는 깃허브에서 제공하는 GitHub Pages 서비스(무료)로<br>
영화 앱을 배포**
+ 프로젝트 루트 폴더에서 명령어를 입력하여 **gh-pages** 설치하기

```
> npm install gh-pages
```
<br>

### 05. 깃허브 저장소 다시 확인하기

+ 명령어를 입력하면 업로드한 깃허브의 저장소의 주소를 확인할 수 있음
+ 저장소 주소에 있는 깃허브 계정 이름과 깃허브 저장소 이름을 확인
+ 이 이름들이 깃허브에 배포한 영화 앱 주소에 사용될 것임

```
> git remote -v
```
<br>

### 06. 영화 앱 깃허브에 배포하기

+ 터미널에서 명령어 입력하여 영화 앱 배포하기

```
> npm run deploy
```
<br>

### 07. GitHub Pages에 접속하여 영화 앱 확인하기

+ URL에 **https:// [깃허브 계정].github.io/ [저장소 이름]** 을 입력
+ 깃허브에 배포한 영화 앱을 확인<br><br>

## CDN 이란?

+ 특정 헤더를 통해서 브라우저에게 원 출처에서 실행되고 있는<br>
웹 애플리케이션이 다른 출처에 원하는 리소스에 접근할 수 있는 권한이<br>
있는지 없는지를 알려주는 매커니즘<br><br>

```
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>

<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```
<br><br>

## 새 폴더 생성

<br>

> 폴더명 : react_201740126

<br>

### 1. 기본 컴포넌트 실습 (index.html)
<br>

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script crossorigin src=""></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel">
        class HelloMessage extends React.Component {
            render() {
                return (
                <div>
                Hello {this.props.name}
                </div>
                );
            }
        }
    
        ReactDOM.render(  //html body 태그 안의 id가 hello-example 인 태그를 가리킴 => Taylor란 값을 넣는다
        <HelloMessage name="Taylor" />,
         document.getElementById('hello-example')
        );
        </script>
    </head>
    <body>
    <div id="hello-example"></div>    
    </body>
    
</html>
```
<br>

### 2. timer 컴포넌트 실습 (timer.html)
<br>

```html
.
.
.

<script type="text/babel">
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);
    </script>
</head>
<body>
<div id="timer-example"></div>    
</body>
</html>
```

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
