import React from 'react';
import WaitForInitilization from './components/WaitForInitilization';
import Routes from './Routes';
export default function App() {
    return (
        <WaitForInitilization>
            <Routes />
        </WaitForInitilization>
    );
}
