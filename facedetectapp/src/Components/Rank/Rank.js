import React from 'react';

const Rank = ({ user }) => {

	return (
		<div>
			<div className='white f3'>
				{`Hello ${user.name} Your current rank is...`}
			</div>
			<div className='white f1'>
				{`Your entries: ${user.entries}`}
			</div>

		</div>
		);
}

export default Rank;