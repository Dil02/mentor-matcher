// importing libraries and components
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ViewTickets from '../ViewTickets/viewTickets'
import Pairings from './Pairings'

  /*
  | Renders the home page for the system administrator 
  |
  | 
  */
function AdminHome() {
  
  return (
    <div >
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

.

        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="mt-4 border p-4 bg-light shadow">
                        <h3 className="text-secondary text-center float-lg-none">
                            Welcome System Administrator
                        </h3>
                        <hr/>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <h5 className="font-weight-bold">Admin Name: Test</h5>
                                
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-6 border">
                                <h5 className="text-secondary text-center float-lg-none">
                                    List of Pairings
                                </h5>
                                <Pairings/>
                            </div>
                            <div className="col-md-6 border text-center">
                                <h5 className="text-secondary text-center float-lg-none pb-3">Support Tickets
                                </h5>
                                <button type="button align-center" class="btn btn-primary mb-3"><Link to="/ViewTickets" className="home">VIEW TICKETS</Link></button>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>



        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </div>
  );
}

export default AdminHome;