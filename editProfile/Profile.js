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