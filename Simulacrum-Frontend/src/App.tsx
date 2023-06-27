import logo from './Logo.png'
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import HomeView from './views/HomeView';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SplashView from './views/SplashView';
import RegistrationView from './views/RegistrationView';
import LogInView from './views/LogInView';
import UploadProfilePictureView from './views/UploadProfilePictureView';
import NavbarComponent from './components/NavbarComponent';

import ViewProjectView from './views/ViewProjectView';
import SearchView from './views/SearchView';
import RegisterSkillsView from './views/RegisterSkillsView';
import ProfileView from './views/ProfileView';
import AssignedProjectsView from './views/AssignedProjectsView';
import UpdateProfileView from './views/UpdateProfileView';
import FavouritesView from './views/FavouritesView';
import CreateProjectStep1View from './views/CreateProjectStep1View';
import CreateProjectStep2View from './views/CreateProjectStep2View';
import CreateProjectStep3View from './views/CreateProjectStep3View';
import RegisterLinksView from './views/RegisterLinksView';
import ExploreView from './views/ExploreView';
import EditProjectView from './views/EditProjectView';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Container padding={0}>
          <Routes>
            <Route path='/' element={<HomeView />}></Route>
            <Route index element={<HomeView />}></Route>
            <Route path='/splash' element={<SplashView />}></Route>
            <Route path='/login' element={<LogInView />}></Route>
            <Route path='/register' element={<RegistrationView />}></Route>
            <Route path='/viewproject/:id' element={<ViewProjectView />}></Route>
            <Route path='/viewproject/' element={<ViewProjectView />}></Route>
            <Route path='/uploadprofilepicture' element={<UploadProfilePictureView />}></Route>
            <Route path='/createprojectstep1' element={<CreateProjectStep1View />}></Route>
            <Route path='/createprojectstep2' element={<CreateProjectStep2View />}></Route>
            <Route path='/createprojectstep3' element={<CreateProjectStep3View />}></Route>
            <Route path='/search' element={<SearchView />}></Route>
            <Route path='/registerSkills' element={<RegisterSkillsView />}></Route>
            <Route path='/registerLinks' element={<RegisterLinksView />}></Route>
            <Route path='/myprofile' element={<ProfileView key={69} />}></Route>
            <Route path='/profile/:userId' element={<ProfileView />}></Route>
            <Route path='/assignedprojects' element={<AssignedProjectsView />}></Route>
            <Route path='/updateprofile' element={<UpdateProfileView />}></Route>
            <Route path='/favourites' element={<FavouritesView />}></Route>
            <Route path='/explore' element={<ExploreView />}></Route>
            <Route path='/editproject/:id' element={<EditProjectView />}></Route>

          </Routes>
        </Container>
        <NavbarComponent />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
