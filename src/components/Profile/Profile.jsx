import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../features/user/userSlice';
import { useGetUpdateUserProfileMutation } from '../../features/api/apiSlice';
import './Profile.css';


const Profile = ({ toggleModal }) => {
  const user = useSelector(state => state.user);
  const [updateName, setUpdatedName] = useState(user.name);

  const dispatch = useDispatch();

  const onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setUpdatedName(event.target.value);
        break;
      // case 'user-age':
      //   this.setState({ age: event.target.value })
      //   break;
      // case 'user-pet':
      //   this.setState({ pet: event.target.value })
      //   break;
      default:
        return;
    }
  }

  const [
    getUpdateUserProfileFromApi,
    // {
    // isLoading: isLoadingUpdateUserProfile,
    // isSuccess: isSuccessUpdateUserProfile,
    // isError: isErrorUpdateUserProfile,
    // error: errorUpdateUserProfile
    // }
  ] = useGetUpdateUserProfileMutation();

  const onProfileUpdate = (data) => {
    // fetch(`${process.env.REACT_APP_API_URL}/profile/${user.id}`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': window.sessionStorage.getItem('token')
    //   },
    //   body: JSON.stringify({ formInput: data })
    // })
    getUpdateUserProfileFromApi({ data, userId: user.id, token: window.sessionStorage.getItem('token') }).unwrap()
      .then(resp => {
        // if (resp.status === 200 || resp.status === 304) { // 304 - when browser returns cached version of the response
        if (resp === 'success') {
          toggleModal();
          dispatch(loadUser(data));
        }
      }).catch(console.log);
  }

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img src="https://images.rawpixel.com/image_png_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjgzMi10ZS0wMl8xLnBuZw.png" className="h3 w3 dib" alt="avatar" />
          <h1>{updateName}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">Name:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">Age:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div className="mt4" style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() => onProfileUpdate({ name: updateName })}
              // onClick={() => onProfileUpdate({ name, age, pet })}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
              Save
            </button>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
    </div >
  );
}

export default Profile;
