import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const FormManual = () => {
    const { store, actions } = useContext(Context)
    const [salary, setSalary] = useState(75000);
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState(""); // Add a state for the city
    const navigate = useNavigate();

    const cities = {
        Chile: ["Arica", "Iquique", "Santiago", "Valparaiso", "Concepcion"],
        Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"],
        USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
        Argentina: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Tucuman"],
        Brazil: ["Sao Paulo", "Rio de Janeiro", "Salvador", "Brasilia", "Fortaleza"],
        India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad"],
        Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
        Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
        Egypt: ["Cairo", "Alexandria", "Giza", "Port Said", "Suez"]
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        actions.handleSubmitForm(e, navigate);
    };


    const roles = {
        software: ['Frontend Developer', 'Backend Developer', 'Full-stack Developer', 'Mobile App Developer', 'DevOps Engineer', 'Software Architect', 'UI/UX Designer', 'Software Engineer in Test', 'Game Developer', 'Embedded Systems Developer'],
        security: ['Information Security Analyst', 'Ethical Hacker', 'Security Consultant', 'Security Engineer', 'Chief Information Security Officer', 'Security Operations Center Analyst', 'Cryptographer', 'Incident Responder', 'Security Software Developer', 'Cybersecurity Researcher'],
        data: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst', 'Data Engineer', 'Statistician', 'Quantitative Analyst', 'Operations Analyst', 'Big Data Engineer', 'Data Visualization Specialist'],
        administration: ['Network Administrator', 'Systems Administrator', 'Network Engineer', 'Systems Engineer', 'Cloud Administrator', 'IT Support Specialist', 'Database Administrator', 'Virtualization Engineer', 'Wireless Engineer', 'IT Security Administrator'],
        management: ['Project Manager', 'Scrum Master', 'Product Owner', 'IT Program Manager', 'Agile Coach', 'Business Analyst', 'Release Manager', 'Quality Assurance Manager', 'IT Service Manager', 'Change Management Specialist']
    };

    return (
        <div className="formManual" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                Submit information
            </h1>

            <form onSubmit={handleSubmit} className='mx-auto p-3 border-1 w-50' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>
                <div className="mb-3">
                    <label htmlFor="categoryInput" className="form-label" style={{ color: 'white' }}>IT category</label>
                    <select className="form-control" id="categoryInput" name="category" value={store.category} onChange={actions.handleChange} required>
                        <option value="">Select a category</option>
                        <option value="software">Software Development</option>
                        <option value="security">Cybersecurity</option>
                        <option value="data">Data Science and Analytics</option>
                        <option value="administration">Network and Systems Administration</option>
                        <option value="management">IT Project Management</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="roleInput" className="form-label" style={{ color: 'white' }}>Specific role</label>
                    <select className="form-control" id="roleInput" name="role" onChange={actions.handleChange} value={store.role} required>
                        <option value="">Select a role</option>
                        {store.category && roles[store.category].map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="experienceInput" className="form-label" style={{ color: 'white' }}>Years of Experience</label>
                    <input type="number" className="form-control" id="experienceInput" name="years_of_experience" min="0" max="50" value={store.years_of_experience} onChange={actions.handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="countryInput" className="form-label" style={{ color: 'white' }}>Country</label>
                    <select className="form-control" id="countryInput" name="country" value={store.country} onChange={actions.handleChange} required>
                        <option value="">Select a country</option>
                        <option value="Chile">Chile</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="USA">USA</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brazil">Brazil</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Egypt">Egypt</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label" style={{ color: 'white' }}>City</label>
                    <select className="form-control" id="cityInput" name="city" onChange={actions.handleChange} value={store.city} required>
                        <option value="">Select a city</option>
                        {store.country && cities[store.country].map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="salaryInput" className="form-label" style={{ color: 'white' }}>Annual salary in USD</label>
                    <input type="number" className="form-control" id="salaryInput" name="amount" min="6000" value={store.amount} onChange={actions.handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="pdfInput" className="form-label" style={{ color: 'white' }}>Upload Salary optional</label>
                    <input type="file" className="form-control" id="pdfInput" name="pdf" onChange={actions.handleChangeFile} />
                </div>




                <button type="submit" className="btn w-100" style={{ backgroundColor: '#4f89ee' }}>Submit</button>
            </form>


            <div className='text-center my-4'>
                <Link to="/">
                    <p>Go back Home</p>
                </Link>
            </div>

        </div>
    );
};