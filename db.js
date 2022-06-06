import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, orderByKey, limitToLast, query, get } from 'firebase/database';
import { jQuery } from "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"; 


const firebaseConfig = {
	databaseURL: 'https://traveladdict-e7037-default-rtdb.europe-west1.firebasedatabase.app',
	apiKey: 'AIzaSyDNv9kggxZD6eekY4_MR74GNs_hQxPms8w',
	authDomain: 'traveladdict-e7037.firebaseapp.com',
	projectId: 'traveladdict-e7037',
	storageBucket: 'traveladdict-e7037.appspot.com',
	messagingSenderId: '590300434587',
	appId: '1:590300434587:web:0ed0cbd7ecf61bee69763e',
	measurementId: 'G-3DB8DX0S2Y',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getUserByUsername = (username) => {
	const userRef = ref(db, `/Users/${username}`);
	onValue(userRef, (snapshot) => {
		// Here you have the value of the user, you can use that to load it into the HTML labels, textboxes, w/e (just get the object by id from the HTML page, and update it's data)
		console.log(snapshot.val());
	});
};

const getBlogById = (id) => {
	const userRef = ref(db, `/Blogs/${id}`);
	onValue(userRef, (snapshot) => {
		// Here you have the value of the user, you can use that to load it into the HTML labels, textboxes, w/e (just get the object by id from the HTML page, and update it's data)
		console.log(snapshot.val());
	});
};

getUserByUsername('MP');

getBlogById(1);

const createBlog = (author, comment, title) => {
	const blogsRef = ref(db, `/Blogs/`);
	const tQuery = query(blogsRef, orderByKey(), limitToLast(1));
	let maxId = 0;
	const newBlog = {
		author,
		comment,
		title,
	};
	get(tQuery).then((snapshot) => {
		maxId = parseInt(Object.keys(snapshot.val())[0]);
		maxId++;
		console.log(maxId);
		const newBlogRef = ref(db, '/Blogs/' + maxId);
		set(newBlogRef, newBlog);
	});
};

const createUser = (username, email, password) => {
	const newUser = {
		email,
		password,
	};

	const usersRef = ref(db, `/Users/` + username);
	const existingUserQuery = query(usersRef);
	get(existingUserQuery).then((snapshot) => {
		if (snapshot.val() === null) {
			const newUserRef = ref(db, '/Users/' + username);
			set(newUserRef, newUser);
		} else {
			console.log('User already exists');
		}
	});
};

const userLogin = (username, password) => {
	const usersRef = ref(db, `/Users/` + username);
	const existingUserQuery = query(usersRef);
	get(existingUserQuery).then((snapshot) => {
		if (snapshot.val() === null) {
			console.log('User does not exist');
		} else {
			// The user exists, checking that the password matches
			if (snapshot.val().password === password) {
				$("#btnprijava").click(function() {
					alert( "Handler for .click() called." );
				  });
			} else {
				console.log('Wrong password');
			}
		}
	});
};

// createBlog('a', 'b', 'c');
// createUser('MP', 'MP@MP.COM', 'MPASS');
// userLogin('MP', 'MPASS');
