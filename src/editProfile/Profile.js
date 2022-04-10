import { useEffect, useState } from "react";
import { useAuth, upload } from "../firebase/firebase-config";


// export for use elsewhere
export default function Profile() {
  const currentUser = useAuth();
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"); //default image from online source

  function whenClicked() {
    upload(image, currentUser, setLoading);
  }


  //to render 
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])



  function modify(e) {
    if (e.target.files[0]) {
      setimage(e.target.files[0])
    }
  }

  // return statement html
  return (
    <div>
    <div className="border rounded">
      <br></br>
      <input type="file" onChange={modify} />
      <button disabled={loading || !image} onClick={whenClicked}>Upload</button>
      <img src={photoURL} alt="Avatar" className="avatar" />
      <br></br>
    </div>
    </div>

  );
}

// import { useEffect, useState } from "react";
// import { useAuth, upload } from "../firebase/firebase-config";

// export default function Profile() {
//   const currentUser = useAuth();
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

//   function handleChange(e) {
//     if (e.target.files[0]) {
//       setPhoto(e.target.files[0])
//     }
//   }

//   function handleClick() {
//     upload(photo, currentUser, setLoading);
//   }

//   useEffect(() => {
//     if (currentUser?.photoURL) {
//       setPhotoURL(currentUser.photoURL);
//     }
//   }, [currentUser])

//   return (
//     <div className="fields">
//       <input type="file" onChange={handleChange} />
//       <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
//       <img src={photoURL} alt="Avatar" className="avatar" />
//     </div>
//   );
// }