import React, { useState } from 'react';

const Signin = ({ onRouteChange, login })=> {

	const [signInEmail, setSignInEmail] = useState('');
	const [signInPass, setSignInPass] = useState('');


	const onEmailChange = (event) => {
		setSignInEmail(event.target.value)
	}

	const onPassChange = (event) => {
		setSignInPass(event.target.value);
	}

	const onSubmitSignIn = async () => {
		console.log(signInEmail + " " + signInPass);
		const req = await fetch("http://localhost:3001/signin",
		 {method: 'POST', 
		 headers: {'Content-Type': 'application/json'},
		 body: JSON.stringify({
			email: signInEmail,
			password: signInPass
		 	
		 })});
		const res = await req.json();

		if(res.password === signInPass){
			login(res);
			onRouteChange('home');
		}
	}

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={onEmailChange} />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={onPassChange} />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={() => onSubmitSignIn()}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteChange('register')} className="f6 link dim black db grow pointer">Register!</p>
			    </div>
			  </div>
			</main>
		</article>
		);
}

export default Signin;