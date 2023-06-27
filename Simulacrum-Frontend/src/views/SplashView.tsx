import logo from '../Logo.png';
import '../App.css';
import { Box, Container } from '@chakra-ui/react';

function SplashView() {
    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Simulacrum</p>
            </header>
            <Box mb='250px'></Box>
        </>
    )
}

export default SplashView;