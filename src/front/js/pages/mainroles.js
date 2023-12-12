import React, { useState, useContext, useEffect } from 'react';
import RoleCard from '../component/roleCard';
import styled from 'styled-components';
import { Context } from '../store/appContext';
import { ChartDoughnut } from './chars/charDoughnut';
import { WorldMap } from "react-svg-worldmap";
import "../../styles/mainroles.css";
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function MainRoles() {
    const [selectedCategory, setSelectedCategory] = useState("Software Development");
    return (
        <div>
            <TabGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} style={{ marginTop: '40px' }} />
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
function TabGroup({ selectedCategory, setSelectedCategory }) {
    const { t } = useTranslation();
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
        setSelectedCategory(type); // Update selectedCategory when a tab is clicked
        // Update roleCards state with the roles for the clicked tab
        setRoleCards(roles[type]);
    };

    const handleTabSelect = (category) => {
        setSelectedCategory(category);
    }


    return (
        <>
            <div className="d-none d-lg-block mx-auto w-75">
                <ButtonGroup className="centered-content">
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
            </div>
            <div className="d-block d-lg-none">
                <DropdownButton id="dropdown-basic-button" title={active} variant="secondary">
                    {types.map(type => (
                        <Dropdown.Item key={type} onClick={() => handleTabClick(type)}>
                            {type}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <p />
            <p style={{ color: 'white' }}> {t('Your category selection')}: {active} </p>
            <div className="mx-auto w-75 d-flex flex-wrap justify-content-start card-parent-container">
                {roleCards.map((roleCard, index) => {
                    // Find the salary data for this role
                    const salaryDataArray = store.salaries.filter(salary => salary.role === roleCard);

                    // If there's no salary data for this role, use default values
                    const salaryData = salaryDataArray.length > 0 ? salaryDataArray[0] : { average: 0, entries: 0 };

                    const sum = salaryDataArray.reduce((total, salaryData) => total + salaryData.amount, 0);

                    const average = salaryDataArray.length > 0 ? Math.floor(sum / salaryDataArray.length) : 0;

                    return (
                        <div key={index} className="custom-col">
                            <RoleCard
                                roleName={roleCard}
                                average={average}
                                entries={salaryDataArray.length}
                            />
                        </div>
                    );
                })}
            </div>
            <div className='container text-center mx-auto mb-5'>
                <div className='row'>
                    <div className='col-8 mx-auto'>
                        <ChartDoughnut category={active} roles={roles} salaries={store.salaries} />
                    </div>
                </div>
            </div>
            <div className='divdivdiv'>
                <h1 style={{ color: 'white' }}>{t('Entries by country')}</h1>
            </div>
            <Map />
            {/*<div>
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
                </div>*/}
        </>
    );
}
// Usage
<TabGroup />

function Map() {
    const { store } = useContext(Context);
    const countryNameToCode = { //ISO Alpha-2 country codes to identify countries
        'USA': 'US',
        'Brazil': 'BR',
        'Chile': 'CL',
        'Venezuela': 'VE',
        'Argentina': 'AR',
        'India': 'IN',
        'Australia': 'AU',
        'Germany': 'DE',
        'Egypt': 'EG'
    };
    const data = store.salaries.reduce((acc, salary) => {
        const countryCode = countryNameToCode[salary.country];
        if (!countryCode) {
            console.warn(`No country code found for "${salary.country}"`);
            return acc;
        }

        const existingCountry = acc.find(item => item.country === countryCode);
        if (existingCountry) {
            existingCountry.value += 1;
        } else {
            acc.push({ country: countryCode, value: 1 });
        }
        return acc;
    }, []);

    const stylingFunction = ({ countryValue, minValue, maxValue, country, color }) => {
        if (countryValue === undefined) {
            return {
                fill: "#c3c0c4",
                stroke: "white",
                strokeWidth: 1,
                strokeOpacity: 0.2,
                cursor: "pointer",
            };
        }

        const calculatedValue = typeof countryValue === "string" ? minValue : countryValue;
        const opacityLevel = 0.1 + (1.5 * (calculatedValue - minValue)) / (maxValue - minValue);
        return {
            fill: color,
            fillOpacity: opacityLevel,
            stroke: "white",
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer",
        };
    };

    return (
        <div className='map-container'>
            <div className="map-styles">
                <WorldMap
                    color="#e357ff"
                    value-suffix="entries"
                    size="xxl"
                    data={data}
                    styleFunction={stylingFunction}
                />
            </div>
        </div>
    );
}