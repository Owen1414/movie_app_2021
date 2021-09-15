
function Food( { name, picture }){
  return (
  <div>
  <h2>I Like {name}</h2>;
  <img src={picture} />
  </div>
  );
}

const foodILike = [
  {
    name: 'Kimchi',
    image: 'https://ncc-phinf.pstatic.net/ncc02/2010/8/18/50/01.jpg?type=f540_313',
  },
  {
    name: 'Samgyeopsal',
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MzBfMjc1%2FMDAxNjMwMjg1NTU5NTkz.92zHX1YS7C049r_vO3LcqghoGlr-orGQO80mjtkub0kg.TQpciXYKko_HrZsnOrOxUmwJqziQuSA8En2KPGIL4tEg.JPEG.ravvvit%2FIMG_9268.jpg&type=sc960_832',
  },
  {
    name: 'Bibimbap',
    image: 'https://ncc-phinf.pstatic.net/ncc02/2010/10/1/289/img01.jpg?type=f490_296',
  }
];

function App() {
  return (
    <div>
      {foodILike.map(dish => (
      <Food name={dish.name} picture={dish.image} />
      ))}
    </div>
  )
}

export default App
