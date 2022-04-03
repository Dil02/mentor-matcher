import logo from './FDMlogo.png';

function Registration() {
  return (
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

This line is here to prevent firefox bug
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="signup-form">
                        <form action="" method="POST" className="mt-5 border p-4 bg-light shadow">
                            
                            <h4 className="text-secondary text-center float-lg-none">  Mentor Matcher Registration Form </h4>
                            
                            <hr/>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <div id="display_image"></div>
                                    <input type="file" id="image_input" accept="image/jpg, image/png"/>

                                </div>
                                <div className="mb-3 col-md-6">
                                    <label>First Name<span className="text-danger">*</span></label>
                                    <input type="text" name="fname" className="form-control" placeholder="Enter First Name" required />
                                    <label>Surname<span className="text-danger">*</span></label>
                                    <input type="text" name="sname" className="form-control" placeholder="Enter Surname" required />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Email Address:<span className="text-danger">*</span></label>
                                    <input type="text" name="password" className="form-control" placeholder="Enter Email Address" required />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Phone Number<span className="text-danger">*</span></label>
                                    <input type="text" name="password" className="form-control" placeholder="Enter Phone Number" required />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Password<span className="text-danger">*</span></label>
                                    <input type="password" name="password" className="form-control" placeholder="Enter Password"required />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Confirm Password<span className="text-danger">*</span></label>
                                    <input type="password" name="confirmpassword" className="form-control " placeholder="Confirm Password" required />
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <button className="btn btn-danger float-">Cancel</button>
                                    <button className="btn btn-primary float-end">Register</button>
                                </div>
                            
                            </div>
                        </form>
                        <p className="text-center mt-3 text-secondary">If you already have an account, <a href="#">Click here to Login</a> </p>
                    </div>
                </div>
            </div>
        </div>




        <script src="imageview.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </div>
  );
}

export default Registration;
