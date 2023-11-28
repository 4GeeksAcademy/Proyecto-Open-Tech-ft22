import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseData from './information.json';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			username: [],
			email: [],
			password: [],
			name: [],
			apiURL: 'https://psychic-space-enigma-qw9gwj7rxg7f9jx6-3001.app.github.dev',
			roles: [],
			categories: [],
			salaries: [],
			category: "",
			role: "",
			years_of_experience: "",
			country: "",
			amount: "",
			city: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},



			handleSubmitRegister: (e, navigate) => {
				e.preventDefault();
				const { username, password, name, email } = getStore();
				const { register } = getActions();
				register({ username, password, name, email }, navigate);
				console.log("Enviando Formulario Register");
			},




			register: (credentials, navigate) => {
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
							navigate('/')
						}

					})
					.catch(error => console.error('Error during fetch:', error));
			},





			login: async ({ username, password }, navigate) => {
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
						const data = await response.json();
						throw new Error(data.msg);
					}

					const data = await response.json();
					setStore({ user: data.user, token: data.token, user_id: data.user.id });
					console.log(getStore().user_id);
					sessionStorage.setItem('user', JSON.stringify(data.user))
					sessionStorage.setItem('token', JSON.stringify(data.token))
					toast.success(data.success)
					navigate('/dashboard');
				} catch (error) {
					console.log("In catch block"); // Add this line
					console.error('Error:', error.message);
					toast(`Error: ${error.message}`, { type: "error", theme: "dark" });
				}
			},





			handleSubmitLogin: (e, navigate) => {
				e.preventDefault()
				const { username, password } = getStore()
				const { login } = getActions()
				login({ username, password }, navigate) // { username: username, password: password }
				console.log("Enviando Formulario")
			},







			logout: () => {
				setStore({
					user: null, token: null, user_id: null
				})
				sessionStorage.removeItem('user')
				sessionStorage.removeItem('token')
				navigate('/'); // Redirects the user to the home page
			},






			checkUser: () => {
				if (sessionStorage.getItem('user')) {
					setStore({
						user: JSON.parse(sessionStorage.getItem('user')),
						token: JSON.parse(sessionStorage.getItem('token'))
					})
				}
			},









			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				})
			},





			handleSubmitForm: (e, navigate) => {
				e.preventDefault();
				const { category, role, years_of_experience, country, city, amount } = getStore();
				const { uploadForm } = getActions();
				uploadForm({ category, role, years_of_experience, country, city, amount }, navigate);
				console.log("Enviando Formulario Form");
			},




			uploadForm: (credentials, navigate) => {
				const { apiURL, user_id } = getStore();
				// Add user_id to the credentials object
				credentials.user_id = user_id;
				// See all credentials in the console
				console.log(credentials)
				const url = `${apiURL}/api/salary`;
				const options = {
					method: 'POST',
					body: JSON.stringify(credentials),
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
							navigate('/dashboard')

						}

					})
					.catch(error => console.error('Error during fetch:', error));
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
