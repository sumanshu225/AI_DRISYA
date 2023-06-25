import { Route } from 'react-router-dom'
import Authenticate from './Pages/Authenticate';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/Post';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';

function App() {
  return (
    <div>
        <Route path='/' component={Authenticate} exact />
        <Route path='/Signup' component={Signup} exact />
        <Route path='/Signin' component={Signin} exact />
        <Route path='/home/:Id?' component={Home} exact />
        <Route path='/create' component={CreatePost} exact />
        <Route path='/post/:postId' component={Post} exact />
    </div>
  );
}



export default App;
