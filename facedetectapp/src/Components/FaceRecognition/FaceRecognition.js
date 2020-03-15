import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageURL })=> {

	const renderBox = (box, i) => {
		return(<div key={box.r} className='bounding-box' 
				style={{top: box.t, right: box.r, bottom: box.b, left: box.l}}>
				</div>
		)
	}

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' src={imageURL} alt='' width='500px' height='auto'/>
				{boxes.map((box, i) => renderBox(box, i))}
			</div>
		</div>
		);
}

export default FaceRecognition;