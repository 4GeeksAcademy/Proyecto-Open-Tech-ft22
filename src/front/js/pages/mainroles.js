import React, { useState } from 'react';
import RoleCard from '../component/roleCard';
import styled from 'styled-components';

function MainRoles() {
    return (
        <div>
            <h1>MainComponent</h1>
            <TabGroup />
        </div>
    );
}

export default MainRoles;



const Tab = styled.button`
  font-size: 15px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: grey;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
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
    'Network and Systems Administration': ['Network Administrator', 'Systems Administrator', 'Network Engineer', 'Systems Engineer', 'Cloud Administrator', 'IT Support Specialist', 'Database Administrator', 'Virtualization Engineer', 'Wireless Communication Engineer', 'IT Security Administrator'],
    'IT Project Management': ['Project Manager', 'Scrum Master', 'Product Owner', 'IT Program Manager', 'Agile Coach', 'Business Analyst', 'Release Manager', 'Quality Assurance Manager', 'IT Service Manager', 'Change Management Specialist']
};


const types = ['Software Development', 'Cybersecurity', 'Data Science and Analytics', 'Network and Systems Administration', 'IT Project Management'];
function TabGroup() {
    const [active, setActive] = useState(types[0]);
    const [roleCards, setRoleCards] = useState(roles['Software Development']); // Initialize with the roles for 'Software Development'

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
                        active={active === type}
                        onClick={() => handleTabClick(type)}
                    >
                        {type}
                    </Tab>
                ))}
            </ButtonGroup>
            <p />
            <p style={{ color: 'white' }}> Your category selection: {active} </p>
            <div className="mx-auto w-75" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {roleCards.map((roleCard, index) => (
                    <div key={index} style={{ width: '17%', margin: '10px' }}>
                        <RoleCard roleName={roleCard} />
                    </div>
                ))}
            </div>
        </>
    );
}
// Usage
<TabGroup />