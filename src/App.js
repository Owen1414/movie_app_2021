import PropTypes from 'prop-types';

function Food({ name, picture, alt, rating }) {
  return (
  <div>
    <h2>I like {name}</h2>
    <h4>{rating}/5.0</h4>
    <img src={picture} alt={alt} />
    </div>
  );
}

const foodILike = [
  {
    id: 1,
    name: 'Kimchi',
    image: 'images/Kimchi.jpg',
    alt: '김치',
    rating: 5.0
  },
  {
    id: 2,
    name: 'Samgyeopsal',
    image: 'images/Samgyeopsal.jpg',
    alt: '삼겹살',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Bibimbap',
    image: 'images/Bibimbap.jpg',
    alt: '비빔밥',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Tteokbokki',
    image: 'images/Tteokbokki.jpg',
    alt: '떡볶이',
    rating: 4.7
  }
];


function App() {
  return (
    <div>
      {foodILike.map(dish => (
        <Food
        key={dish.id}
        name={dish.name}
        picture={dish.image}
        alt={dish.alt}
        rating={dish.rating}
        />
      ))}
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

export default App;
