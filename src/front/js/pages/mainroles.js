import React, { useState, useContext, useEffect } from 'react';
import RoleCard from '../component/roleCard';
import styled from 'styled-components';
import { Context } from '../store/appContext';

function MainRoles() {
    return (
        <div>
            <h1>Select the category:</h1>
            <TabGroup />
        </div>
    );
}

export default MainRoles;



const Tab = styled(({ isActive, ...props }) => <button {...props} />)`
  font-size: 15px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: grey;
  border: 0;
  outline: 0;
  ${({ isActive }) =>
        isActive &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
    color: purple;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

// Mapping of tab types to their roles
const roles = {
    'Software Development': ['Frontend Developer', 'Backend Developer', 'Full-stack Developer', 'Mobile App Developer', 'DevOps Engineer', 'Software Architect', 'UI/UX Designer', 'Software Engineer in Test', 'Game Developer', 'Embedded Systems Developer'],
    'Cybersecurity': ['Information Security Analyst', 'Ethical Hacker', 'Security Consultant', 'Security Engineer', 'Chief Information Security Officer', 'Security Operations Center Analyst', 'Cryptographer', 'Incident Responder', 'Security Software Developer', 'Cybersecurity Researcher'],
    'Data Science and Analytics': ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst', 'Data Engineer', 'Statistician', 'Quantitative Analyst', 'Operations Analyst', 'Big Data Engineer', 'Data Visualization Specialist'],
    'Network and Systems Administration': ['Network Administrator', 'Systems Administrator', 'Network Engineer', 'Systems Engineer', 'Cloud Administrator', 'IT Support Specialist', 'Database Administrator', 'Virtualization Engineer', 'Wireless Engineer', 'IT Security Administrator'],
    'IT Project Management': ['Project Manager', 'Scrum Master', 'Product Owner', 'IT Program Manager', 'Agile Coach', 'Business Analyst', 'Release Manager', 'Quality Assurance Manager', 'IT Service Manager', 'Change Management Specialist']
};


const types = ['Software Development', 'Cybersecurity', 'Data Science and Analytics', 'Network and Systems Administration', 'IT Project Management'];
function TabGroup() {
    const [active, setActive] = useState(types[0]);
    const [roleCards, setRoleCards] = useState(roles['Software Development']); // Initialize with the roles for 'Software Development'
    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.fetchSalaries();
    }, []);

    useEffect(() => {
        console.log(store.salaries);
    }, [store.salaries]);



    const handleTabClick = (type) => {
        setActive(type);

        // Update roleCards state with the roles for the clicked tab
        setRoleCards(roles[type]);
    };


    return (
        <>
            <ButtonGroup className='mx-auto w-75'>
                {types.map(type => (
                    <Tab
                        key={type}
                        isActive={active === type}
                        onClick={() => handleTabClick(type)}
                    >
                        {type}
                    </Tab>
                ))}
            </ButtonGroup>
            <p />
            <p style={{ color: 'white' }}> Your category selection: {active} </p>
            <div className="mx-auto w-75" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {roleCards.map((roleCard, index) => {
                    // Find the salary data for this role
                    const salaryDataArray = store.salaries.filter(salary => salary.role === roleCard);

                    // If there's no salary data for this role, use default values
                    const salaryData = salaryDataArray.length > 0 ? salaryDataArray[0] : { average: 0, entries: 0 };

                    const sum = salaryDataArray.reduce((total, salaryData) => total + salaryData.amount, 0);

                    const average = salaryDataArray.length > 0 ? sum / salaryDataArray.length : 0;

                    return (
                        <div key={index} style={{ width: '17%', margin: '10px' }}>
                            <RoleCard
                                roleName={roleCard}
                                average={average}
                                entries={salaryDataArray.length}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                Role Amount:
                {store.salaries.map((salary, index) => (
                    <div key={index}>
                        <p>Amount: {salary.amount}</p>
                        <p>Category: {salary.category}</p>
                        <p>City: {salary.city}</p>
                        <p>Country: {salary.country}</p>
                        <p>Role: {salary.role}</p>
                        <p>Years of Experience: {salary.years_of_experience}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
// Usage
<TabGroup />