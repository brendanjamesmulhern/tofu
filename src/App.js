import React, { useState } from 'react';
import Register from './screens/Register';
import MyTeams from './screens/MyTeams';

const App = () => {
	let [user, setUser] = useState();
	return (
		<div>
			{ user ? <MyTeams user={user} /> : <Register setUser={setUser} /> }
		</div>
	);
};

export default App;