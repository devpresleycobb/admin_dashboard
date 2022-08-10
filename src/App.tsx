import Routes from './routes';
import {
  Layouts,
  Drawer,
  NavBar
} from './views/Layouts';
function App() {
  return (
    <Layouts>
      <Drawer/>
      <div className="w-full mt-4 mx-10">
        <NavBar/>
        <Routes/>
      </div>
    </Layouts>
  );
}

export default App;
