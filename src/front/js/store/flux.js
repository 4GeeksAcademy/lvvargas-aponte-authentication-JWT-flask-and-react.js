const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			message: null,
			joke: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleCreateUser: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}

				try {
					const resp = await fetch('https://upgraded-funicular-pwj4j5x9gwjcrxqx-3001.preview.app.github.dev/api/signup', opts);
					const data = await resp.json();
					if (resp.status === 200) {
						alert("User Created! Redirecting to login page");
						return true;
					} else if (resp.status === 404) {
						alert("You already have an account");
						return false;
					} else {
						console.error("Unexpected error:", data.message)
						return false;
					}
				}

				catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleLogin: async (email, password) => {

				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch('https://upgraded-funicular-pwj4j5x9gwjcrxqx-3001.preview.app.github.dev/api/token', opts);
					const data = await resp.json();
					if (resp.status === 200) {
						sessionStorage.setItem('token', data.token);
						setStore({ token: data.token })
						return true;
					} else if (resp.status === 404) {
						alert("User not found. Create new User with the Signup form")
					} else if (resp.status === 401) {
						alert("Incorrect password")
					} else {
						console.error("Unexpected error:", data.message)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}

			},
			syncToken: () => {
				const token = sessionStorage.getItem('token');
				console.log('Application loaded, synching session storage token', token);
				if (token && token != '' && token != undefined) {
					setStore({ token: token });
				}
			},
			handleLogout: () => {
				sessionStorage.removeItem('token');
				console.log('logout function running');
				setStore({ token: null });
			},
			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: 'Bearer ' + store.token
					}
				}
				try {
					// fetching data from the backend
					const resp = await fetch(`https://upgraded-funicular-pwj4j5x9gwjcrxqx-3001.preview.app.github.dev/api/hello`, opts)
					if (!resp.ok) {
						throw new Error("Network reponse was not ok");
					}
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.error("Error loading message from backend", error);
				}
			},
			handlePrivateJoke: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: 'Bearer ' + store.token
					}
				}
				try {
					const [privateResp, jokeResp] = await Promise.all([
						fetch(`https://upgraded-funicular-pwj4j5x9gwjcrxqx-3001.preview.app.github.dev/api/private`, opts),
						fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
					])

					if (!privateResp.ok) {
						throw new Error("Private API response was not ok");
					}
					const privateData = await privateResp.json();
					setStore({ message: privateData.message });

					if (!jokeResp.ok) {
						throw new Error("Joke APO response was not ok");
					}
					const jokeData = await jokeResp.json();
					setStore({ joke: jokeData.joke });
					return { privateData, jokeData };

				} catch (error) {
					console.error("Error loading message from backend", error);
				}
			}
		}
	};
};

export default getState;
