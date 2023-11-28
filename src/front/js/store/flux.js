import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseData from './information.json';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			username: [],
			email: [],
			password: [],
			name: [],
			apiURL: 'https://miniature-winner-qw9gwj7rg4g24xq6-3001.app.github.dev',
			roles: [{
				"title": "Example Role 1",
				"category_id": "This is an example role."
			},
			{
				"title": "Example Role 2",
				"category_id": "This is an example role."
			},
			],
			categories: [{
				"name": "Example Category 1"
			},
			{
				"name": "Example Category 2"
			},
			],
			salaries: [{
				"amount": "Example Salary 1",
				"years_of_experience": "This is an example salary.",
				"city": "Example City 1",
				"country": "Example Country 1",
				"user_id": "Example User 1",
				"category_id": "Example Category 1",
			},
			{
				"amount": "Example Salary 2",
				"years_of_experience": "This is an example salary.",
				"city": "Example City 2",
				"country": "Example Country 2",
				"user_id": "Example User 2",
				"category_id": "Example Category 2",
			}]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},



			handleSubmitRegister: e => {
				e.preventDefault();
				const { username, password, name, email } = getStore();
				const { register } = getActions();
				register({ username, password, name, email });
				console.log("Enviando Formulario");
			},




			register: (credentials) => {
				const { apiURL } = getStore();
				//console.log(credentials)
				const url = `${apiURL}/api/register`;
				const options = {
					method: 'POST',
					body: JSON.stringify(credentials), //  { username: 'user', password: 'pass', name: 'name', email: 'email' }
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





			login: async ({ username, password }) => {
				const { apiURL } = getStore();
				try {
					const response = await fetch(`${apiURL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ username, password })
					});

					if (!response.ok) {
						throw new Error('Login failed');
					}

					const data = await response.json();
					setStore({ user: data.user, token: data.token });
				} catch (error) {
					console.error('Error:', error);
				}
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


			getRoles: async () => {
				const response = await fetch(getStore().apiURL + '/api/role');
				const data = await response.json();
				setStore({
					roles: data
				})
			},

			getCategories: async () => {
				const response = await fetch(getStore().apiURL + '/api/category');
				const data = await response.json();
				setStore({
					category: data
				})
			},

			getSalaries: async () => {
				const response = await fetch(getStore().apiURL + '/api/salary');
				const data = await response.json();
				setStore({
					salary: data
				})
			},








			//specifics
			getRoleAmount: async () => {
				const response = await fetch('/api/salary'); // Replace with your API endpoint
				const salaries = await response.json();
				const totalAmount = salaries.reduce((total, salary) => total + salary.amount, 0);
				setStore({ totalAmount });
			},





		}
	}
};

export default getState;
