import './App.scss';
import Main from './components/Main/Main'
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      <h1>Checkout page</h1>
      <Main>
        <ProductList />
        <ShoppingCart />
      </Main>
    </div>
  );
}

export default App;
