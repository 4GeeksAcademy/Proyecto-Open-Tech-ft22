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
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Cash', 'Credit Card', 'Bitcoin'];
function TabGroup() {
    const [active, setActive] = useState(types[0]);
    return (
        <>
            <ButtonGroup className='mx-auto w-75'>
                {types.map(type => (
                    <Tab
                        key={type}
                        active={active === type}
                        onClick={() => setActive(type)}
                    >
                        {type}
                    </Tab>
                ))}
            </ButtonGroup>
            <p />
            <p> Your payment selection: {active} </p>
            <RoleCard />
        </>
    );
}
// Usage
<TabGroup />
