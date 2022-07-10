import logo from './logo.svg';
import './App.css';
import Categories from './components/Categories';

const options = [
  {
    label: 'Sports & Outdoor',
    value: 1,
    children: [
      {
        label: 'Excercise & Fitness',
        value: 4,
        children: [
          { label: 'Yoga', value: 6 },
          { label: 'Pilates', value: 7 },
          { label: 'Cardio Equipments', value: 8 },
        ]
      },
      {
        label: 'Pedro',
        value: 4,
        children: [
          { label: 'Yasdga', value: 6 },
          { label: 'dasd', value: 7 },
          { label: 'asdasd Equipments', value: 8 },
        ]
      },
    ]
  },
  {
    label: 'Motors',
    value: 9,
    children: [
      {
        label: 'Automotive',
        value: 12,
        children: [
          { label: 'Services', value: 13 },
          { label: 'Exterior Accessories', value: 14 },
          { label: 'Oils & Fluids', value: 15 },
        ]
      },
    ]
  },
];

function App() {

  return (
    <div className="App max-w-5xl m-auto h-screen flex items-center">
      <Categories categories={options} />
    </div>
  );
}

export default App;
