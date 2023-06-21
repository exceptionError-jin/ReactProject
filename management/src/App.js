import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';

const customer = {
    name: '김진',
    birthday: '980216',
    gender: '남',
    job: '무직(로또 당첨 예정)'
}

function App() {
  return (
    <Customer
    name={customer.name}
    birthday={customer.birthday}
    gender={customer.gender}
    job={customer.job}
    />
  );
}

export default App;
