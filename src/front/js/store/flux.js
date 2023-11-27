import { toast } from 'react-toastify';
import baseData from './information.json';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			username: [],
			password: [],
			name: [],
			apiURL: 'https://cuddly-space-goggles-9pq4pr7vwqxcxx9j-3001.app.github.dev'
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},



			handleSubmitRegister: e => {
				e.preventDefault()
				const { username, password } = getStore()
				const { register } = getActions()
				register({ username, password }) // { username: username, password: password }
				console.log("Enviando Formulario")
			},




			register: (credentials) => {
				const { apiURL } = getStore();
				//console.log(credentials)
				const url = `${apiURL}/api/register`;
				const options = {
					method: 'POST',
					body: JSON.stringify(credentials), //  { username: 'lili.aqueveque', password: '123456' }
					headers: {
						'Content-Type': 'application/json'
					}
				}
				fetch(url, options)
					.then(response => response.json())
					.then(data => {
						console.log(data)

						if (data.msg) {
							toast.error(data.msg)
						} else {
							setStore({
								currentUser: data
							})
							toast.success(data.success)
						}

					})
					.catch(error => console.error('Error during fetch:', error));
			},



			handleSubmitLogin: e => {
				e.preventDefault()
				const { username, password } = getStore()
				const { login } = getActions()
				login({ username, password }) // { username: username, password: password }
				console.log("Enviando Formulario")
			},






			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				})
			},










			//ACTIONS FROM THE ADMINS
			postSalary: async () => {
				const response = await fetch(getStore().apiURL + '/api/salary', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(baseData.salaryData)
				});
				const data = await response.json();
				return data;
			},

			postRole: async () => {
				const response = await fetch(getStore().apiURL + '/api/role', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(baseData.roleData)
				});
				const data = await response.json();
				return data;
			},

			postCategory: async () => {
				const response = await fetch(getStore().apiURL + '/api/category', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include',  // Add this line
					body: JSON.stringify(baseData.categoryData)
				});
				const data = await response.json();
				return data;
			},





		}
	}
};

export default getState;
