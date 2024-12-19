import React from 'react';
import '../Register.css';


const Register = () => {
    return (
        <div className='registerbody'>
            <p className='h1'> Register</p>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-8">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="form-group col-md-8">
                    <label for="inputEmail4">UserName</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="UserName"/>
                    </div>

                    <div class="form-group col-md-8">
                    <label for="inputEmail4">Name</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Name"/>
                    </div>
                    <div class="form-group col-md-8">
                    <label for="inputEmail4">Surname</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Surname"/>
                    </div>

                    
                    <div class="form-group col-md-8">
                    <label for="inputPassword4">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity"/>
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div>
                <div>
                     <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
                </form>
        </div>
    );
};

export default Register;