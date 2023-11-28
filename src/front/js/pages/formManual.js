import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const FormManual = () => {
    const [salary, setSalary] = useState(75000);
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [experience, setExperience] = useState(0);

    const cities = {
        Chile: ["Santiago", "Valparaiso", "Concepcion"],
        // Add more countries and cities as needed
    };

    const roles = {
        software: ['Frontend Developer', 'Backend Developer', 'Full-stack Developer', 'Mobile App Developer', 'DevOps Engineer', 'Software Architect', 'UI/UX Designer', 'Software Engineer in Test', 'Game Developer', 'Embedded Systems Developer'],
        security: ['Information Security Analyst', 'Ethical Hacker', 'Security Consultant', 'Security Engineer', 'Chief Information Security Officer', 'Security Operations Center Analyst', 'Cryptographer', 'Incident Responder', 'Security Software Developer', 'Cybersecurity Researcher'],
        data: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst', 'Data Engineer', 'Statistician', 'Quantitative Analyst', 'Operations Analyst', 'Big Data Engineer', 'Data Visualization Specialist'],
        administration: ['Network Administrator', 'Systems Administrator', 'Network Engineer', 'Systems Engineer', 'Cloud Administrator', 'IT Support Specialist', 'Database Administrator', 'Virtualization Engineer', 'Wireless Communication Engineer', 'IT Security Administrator'],
        management: ['Project Manager', 'Scrum Master', 'Product Owner', 'IT Program Manager', 'Agile Coach', 'Business Analyst', 'Release Manager', 'Quality Assurance Manager', 'IT Service Manager', 'Change Management Specialist']
    };

    return (
        <div className="formManual" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                Submit information
            </h1>

            <form className='mx-auto p-3 border-1 w-50' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>
                <div className="mb-3">
                    <label htmlFor="categoryInput" className="form-label" style={{ color: 'white' }}>IT category</label>
                    <select className="form-control" id="categoryInput" value={category} onChange={e => setCategory(e.target.value)}>
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
                    <select className="form-control" id="roleInput">
                        {category && roles[category].map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="experienceInput" className="form-label" style={{ color: 'white' }}>Years of Experience</label>
                    <input type="number" className="form-control" id="experienceInput" min="0" max="50" value={experience} onChange={e => setExperience(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="countryInput" className="form-label" style={{ color: 'white' }}>Country</label>
                    <select className="form-control" id="countryInput" value={country} onChange={e => setCountry(e.target.value)}>
                        <option value="">Select a country</option>
                        <option value="Chile">Chile</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label" style={{ color: 'white' }}>City</label>
                    <select className="form-control" id="cityInput">
                        {country && cities[country].map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="salaryInput" className="form-label" style={{ color: 'white' }}>Annual salary</label>
                    <input type="range" className="form-control" id="salaryInput" min="7000" max="150000" step="100" value={salary} onChange={e => setSalary(e.target.value)} />
                    <output id="salaryOutput">{salary}</output>
                </div>


                <button className="btn w-100" style={{ backgroundColor: '#4f89ee' }}>Submit</button>
            </form>


            <div className='text-center my-4'>
                <Link to="/">
                    <p>Go back Home</p>
                </Link>
            </div>

        </div>
    );
};