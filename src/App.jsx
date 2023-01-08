import { useState, useEffect, useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import Modal from './components/Modal/Modal.jsx'
import Profile from './components/Profile/Profile.jsx';
import './App.css';

const particlesOptions = {
  // background: {
  //   color: {
  //     value: "#0d47a1",
  //   },
  // },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

const App = () => {
  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // await console.log(container);
  }, []);

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([12]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    entries: 0,
    joined: '',
  });

  const loadUser = (data) => {
    setUser(
      {
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      }
    )
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setInput('');
      setImageUrl('');
      setBoxes([]);
      setRoute('signin');
      setIsSignedIn(false);
      setIsProfileOpen(false);
      setUser({
        id: '',
        name: '',
        entries: 0,
        joined: ''
      });
      return
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`${process.env.REACT_APP_API_URL}/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  loadUser(user);
                  onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log());
    }
    //  return () => {
    //    second
    //  }
  }, []);

  const calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map((face) => {
        let clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      })
    }
    return;
  }

  const displayFaceBoxes = (boxes) => {
    if (boxes) {
      setBoxes(boxes);
    }
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        url: input,
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${process.env.REACT_APP_API_URL}/image`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser({ ...user, entries: count })
            })
            .catch(console.log)
        }
        displayFaceBoxes(calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
  }

  const toggleModal = () => {
    setIsProfileOpen(
      (isProfileOpen) => !isProfileOpen
    )
  }

  return (
    <div className="App">
      <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} toggleModal={toggleModal} />
      {isProfileOpen &&
        <Modal>
          <Profile
            isProfileOpen={isProfileOpen}
            toggleModal={toggleModal}
            loadUser={loadUser}
            user={user}
          />
        </Modal>
      }
      {route === 'home'
        ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
        : (
          route === 'signin'
            ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
            : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
