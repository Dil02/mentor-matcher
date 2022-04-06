import './mentorHome.css';

function MentorHome() {
  return (
    <div>
        <div class="box1" > 
        <img src = "Fdm-logo-black.jpg" width="200" height="200" class="center"/>
                <h2> Welcome </h2>
                <h2> John Smith </h2>
                <div class="center2">
                    <button class="button1"> View Profile </button>
                    <button class="button1"> Edit Profile </button>
                </div>
        </div>
        <div class="box2">
            <table>
                <tr>
                    <th>Mentees </th>
                </tr>
                <tr>
                    <td> Mentee1: <button class="button2"> Message </button> </td>
                </tr>	
                <tr>
                    <td> Mentee2: <button class="button2"> Message </button> </td>
                </tr>
                <tr>
                    <td> Mentee3: <button class="button2"> Message </button> </td>
                </tr>
                <tr> 
                    <td> Mentee4: <button class="button2"> Message </button> </td>
                </tr>
                <tr>
                    <td> Mentee5: <button class="button2"> Message </button> </td>
                </tr>
            </table>
        </div>
        
        <div class="box3">
        <table>
                <tr>
                    <th>Meetings</th>
                </tr>
                <tr>
                    <td> Mentee1: 9am <button class="button2"> Join Meeting </button> </td>
                </tr>	
                <tr>
                    <td> Mentee2: 10:30am <button class="button2"> Join Meeting </button> </td>
                </tr>
                <tr>
                    <td> Mentee3: 11:30am <button class="button2"> Join Meeting </button> </td>
                </tr>
                <tr>
                    <td> Mentee4: 2pm <button class="button2"> Join Meeting </button> </td>
                </tr>
                <tr>
                    <td> Mentee5: 4pm <button class="button2"> Join Meeting </button> </td>
                </tr>
            </table>
        </div>

</div>
  );
}

export default MentorHome;
