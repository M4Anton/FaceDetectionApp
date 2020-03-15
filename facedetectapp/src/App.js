import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';


const app = new Clarifai.App({
	apiKey: 'c3e50efff0ed4f5f93aefdcfad21b984'
})

const particlesOptions = {
	particles: {
		number:{
			value: 150,
			density: {
				enable: true,
				value_area: 600
			}
		}
	}
}

function App() {

	const [input, setInput] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [boxes, setBoxes] = useState([]);
	const [route, setRoute] = useState('signin');
	const [isSignedIn, setSignIn] = useState(false);

	const calculateFaceLocation = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions;
		
		const calculateFaces = (face) =>{
			const image = document.getElementById('inputimage');
			const width = Number(image.width);
			const height = Number(image.height);
			
			return{
				l: face.region_info.bounding_box.left_col * width,
				t: face.region_info.bounding_box.top_row * height,
				r: width - (face.region_info.bounding_box.right_col * width),
				b: height - (face.region_info.bounding_box.bottom_row * height)
			};
		}

		const facesTable = clarifaiFace.map(calculateFaces)

		return facesTable;
	}

	const displayFaceBox = (boxes) =>{
		setBoxes(boxes);
	}

	const onInputChange = (e) => {
		
		setInput(e.target.value);

	}

	const onButtonSubmit = (e) => {
		setImageURL(input);
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			//URL
			input
			)
			.then(response => displayFaceBox(calculateFaceLocation(response)))
			.catch(err => console.log(err));
			}

	const onRouteChange = (route) => {
		if(route === 'home'){
			setSignIn(true)
		}else if(route === 'signout'){
			setSignIn(false);
		}
		setRoute(route);

	}


  return (
    <div className="App">
    	<Particles className="particles" params ={particlesOptions} />
      <Navigation 
      onRouteChange = {onRouteChange}
      isSignedIn = {isSignedIn}
      />
      { route === 'home' ?
    	<div>
	      <Logo />
	      <Rank />
	      <ImageLinkForm 
	      	onInputChange = {onInputChange}
	      	onButtonSubmit = {onButtonSubmit}
	      />
	        <FaceRecognition 
	        imageURL={imageURL}
	        boxes = {boxes}
	        />
        </div>
    	: (
    		route === 'register' ?
    		<Register onRouteChange = {onRouteChange} />
    		:
    		<Signin onRouteChange = {onRouteChange} />
    		) 
    }
    </div>
  );
}

export default App;
