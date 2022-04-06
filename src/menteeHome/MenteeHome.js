import './menteeHome.css';

function MenteeHome() {
  return (
    <div>
        <div class="box1"> 
        <img src = "Fdm-logo-black.jpg" width="200" height="200" class="center"/>
                <h2> Welcome </h2>
                <h2> Lily Michael </h2>
                <div class="center2">
                    <button class="button1"> View Profile </button>
                    <button class="button1"> Edit Profile </button>
                </div>
        </div>
        <div class="box2">
            <table>
                <tr>
                    <th>Mentor </th>
                </tr>
                <tr>
                    <td> John Smith </td>
                </tr>	
                <tr>
                    <td> Last Seen: 10am </td>
                </tr>
                <tr>
                    <button class="button2"> Message Mentor </button>
                </tr>
            </table>
        </div>
        
        <div class="box3">
        <table>
                <tr>
                    <th>Meetings</th>
                </tr>
                <tr>
                    <td> John Smith: 11am <button class="button2"> Join Meeting </button> </td>
                </tr>
            </table>
        </div>
    </div>
    
  );
}

export default MenteeHome;
