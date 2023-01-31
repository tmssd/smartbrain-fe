import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetApiCallDataMutation,
  useUpdateUserImageEntriesMutation,
  useGetSigninUserMutation,
  useGetSigninUserProfileMutation,
} from '../../store/slices/api/apiSlice';
import { loadUser } from '../../store/slices/user/userSlice';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition.jsx';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Profile from '../../components/Profile/Profile.jsx';
import Rank from '../../components/Rank/Rank.jsx';

const Userpage = ({ setIsSignedIn, isProfileOpen, toggleModal }) => {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([12]);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

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

  const [
    getApiCallDataFromApi,
    // {
    // isLoading: isLoadingSigninUserFromApi,
    // isSuccess: isSuccessSigninUserFromApi,
    // isError: isErrorSigninUserFromApi,
    // error: errorSigninUserFromApi,
    // }
  ] = useGetApiCallDataMutation();

  const [
    updateUserImageEntriesFromApi,
    // {
    // isLoading: isLoadingSigninUserFromApi,
    // isSuccess: isSuccessSigninUserFromApi,
    // isError: isErrorSigninUserFromApi,
    // error: errorSigninUserFromApi,
    // }
  ] = useUpdateUserImageEntriesMutation();

  const onButtonSubmit = () => {
    setImageUrl(input);
    getApiCallDataFromApi({ imageUrl: input, token: window.sessionStorage.getItem('token') }).unwrap()
      .then(response => {
        if (response) {
          updateUserImageEntriesFromApi({ userId: user.id, token: window.sessionStorage.getItem('token') }).unwrap()
            .then(count => {
              dispatch(loadUser({ ...user, entries: count }));
            })
            .catch(console.log)
        }
        displayFaceBoxes(calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
  }

  const [
    getSigninUserFromApi,
    // {
    // isLoading: isLoadingSigninUserFromApi,
    // isSuccess: isSuccessSigninUserFromApi,
    // isError: isErrorSigninUserFromApi,
    // error: errorSigninUserFromApi,
    // }
  ] = useGetSigninUserMutation();

  const [
    getSigninUserProfileFromApi,
    // {
    // isLoading: isLoadingSigninUserProfileFromApi,
    // isSuccess: isSuccessSigninUserProfileFromApi,
    // isError: isErrorSigninUserProfileFromApi,
    // error: errorSigninUserProfileFromApi,
    // }
  ] = useGetSigninUserProfileMutation();

  // on each component re-render(e.g. on page refresh, after signin or register) check if user logged in
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      getSigninUserFromApi({ token }).unwrap()
        .then(data => {
          if (data && data.id) {
            getSigninUserProfileFromApi({ userId: data.id, token }).unwrap()
              .then(user => {
                if (user && user.email) {
                  setIsSignedIn(true);
                  dispatch(loadUser(user));
                }
              })
          }
        })
        .catch(console.log());
    }
    //  return () => {
    //    second
    //  }
  }, [setIsSignedIn, getSigninUserFromApi, getSigninUserProfileFromApi, dispatch]);

  return (
    <div>
      <Logo />
      <Rank name={user.name} entries={user.entries} />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
      {isProfileOpen &&
        <Modal>
          <Profile
            isProfileOpen={isProfileOpen}
            toggleModal={toggleModal}
            user={user}
          />
        </Modal>
      }
    </div>
  )
}

export { Userpage }
