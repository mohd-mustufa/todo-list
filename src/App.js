import Header from "./components/Header";
import Form from "./components/Form";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Form />
    </Provider>
  );
}

export default App;
