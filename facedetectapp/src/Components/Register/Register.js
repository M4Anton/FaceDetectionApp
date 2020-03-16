import React, { useState } from 'react';

const Register = ({ onRouteChange, login })=> {


	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [name, setName] = useState('');

	const onEmailChange = (event) => setEmail(event.target.value);

	const onPassChange = (event) =>	setPass(event.target.value);

	const onNameChange = (event) => setName(event.target.value);

	const onRegisterSubmit = async () => {
		console.log(email + " " + pass + " " + name);
		const req = await fetch("http://localhost:3001/register",
		 {method: 'POST', 
		 headers: {'Content-Type': 'application/json'},
		 body: JSON.stringify({
			email: email,
			password: pass,
			name: name
		 })});
		const res = await req.json();

		if(res){
		login(res);
		onRouteChange('home');
		}
	}



	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={onNameChange} />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={onEmailChange} />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange= {onPassChange} />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={() => onRegisterSubmit()}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign up" 
			      />
			    </div>
			  </div>
			</main>
		</article>
		);
}

export default Register;