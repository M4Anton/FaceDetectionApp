const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());

const database = {
	users:[
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	]
}

app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0]. password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('error logging in');

	}
})

app.post('/register', (req, res) => {
	let { email, name, password } = req.body;
	bcrypt.hash(password, null, null, (err, hash) => {
		console.log(hash);
	})
	database.users.push({
			
		id: String(Number(database.users[database.users.length-1].id) + 1),
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	
	})
	res.json(database.users[database.users.length-1]);
	console.log(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			return res.json(user);
		}});
	 if(!found) {
			res.status(404).json('no such user');
		}
});


app.put('/image', (req, res) => {
		const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			++user.entries;
			console.log(user.entries)
			return res.json(user.entries);
		}});
	 if(!found) {
			res.status(404).json('no such user');
		}
})

app.listen(3001, () => {
	console.log('the server is running on port 3001')
})


/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT(update) --> updated user

*/