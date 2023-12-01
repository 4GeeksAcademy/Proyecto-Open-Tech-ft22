import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseData from './information.json';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
			user_id: null,
			username: [],
			email: [],
			password: [],
			name: [],
			apiURL: 'https://orange-space-garbanzo-qw9gwj7rgqp264r9-3001.app.github.dev',
			roles: [],
			categories: [],
			salaries: [],
			category: "",
			role: "",
			years_of_experience: "",
			country: "",
			amount: "",
			city: "",
			pdf: null
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
					console.log(data.user); // SEE WHAT IT IS PRINTING
					setStore({ ...getStore(), user: data.user, token: data.token, user_id: data.user.id });
					console.log(getStore().user); // SEE WHAT IT IS PRINTING
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




			handleChangeFile: e => {
				const { name, files } = e.target;
				setStore({
					[name]: files[0]
				})
			},





			handleSubmitForm: (e, navigate) => {
				e.preventDefault();
				const { category, role, years_of_experience, country, city, amount, user, pdf } = getStore();
				console.log(category)
				const { uploadForm } = getActions();

				const formData = new FormData()

				// añadimos campos al formulario
				formData.append("category", category)
				formData.append("role", role)
				formData.append("years_of_experience", years_of_experience)
				formData.append("country", country)
				formData.append("city", city)
				formData.append("amount", amount)
				formData.append("user_id", user.id)
				formData.append("pdf", pdf)

				uploadForm(formData, navigate);
				console.log("Enviando Formulario Form");
			},




			uploadForm: (credentials, navigate) => {
				const { apiURL } = getStore();
				// See all credentials in the console
				console.log(credentials)
				const url = `${apiURL}/api/salary`;
				const options = {
					method: 'POST',
					body: credentials, //credentials
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





			fetchSalaries: () => {
				const { apiURL } = getStore();
				fetch(`${apiURL}/api/salary`)
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then(salaries => {
						setStore({
							...getStore(),
							salaries: salaries
						});
					})
					.catch(error => {
						console.error('Error during fetch:', error);
					});
			},











			// TODO INUTIL DE AQUI EN ADELANTE

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
