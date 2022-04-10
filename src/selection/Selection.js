import './Selection.css';
import profilePic from './profilePic.jpg';
import {auth} from ".././firebase/firebase-config";
import ProgressBar from ".././ProgressBar/ProgressBar";

function MentorBox(i) {
    var color = "#7a3fc2"
    if (i == 2) { color = '#42b0cc'} 
    return(
        <div class="btn w-100" id={"btn-" + i}>
            <a href="" >
            <img  src={profilePic} className="rounded-circle" height="200"/>
            <div class="text-center">
                <h2> FName SName </h2>
                <h4> Job Title </h4>
                <br/>
                <p> <strong>Email: </strong></p>
                <p class="p-0"> genericEmail.com </p>
                <br/>
                <p> <strong> Phone: </strong></p>
                <p> +44 1234 567 8910</p>
                <br/>
                <p> <strong>Description: </strong></p>
                <p> Lorem ipsum dolor sit amet. </p>
            </div>
            <div id="bar">
                <ProgressBar bgcolor={color} completed="60"/>
            </div>
          </a>
        </div>
    )
}
function Selection() {
  return (
    <div class="selection">

        <div class="text-center p-4">
          <h2> We have matched you with the following mentors</h2>
        </div>

        <div class="btn-group d-flex" role="group">
          {MentorBox(1)}
          {MentorBox(2)}
          {MentorBox(1)}
          {MentorBox(2)}
          {MentorBox(1)}
        </div>
    </div>
    
    
  );
}

export default Selection;
