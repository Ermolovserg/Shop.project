import styled, { keyframes } from 'styled-components';

const Loader = () => {
    return (
        <Container>
            <Text>Loading...</Text>
            <MainSpinner />
            <AdditionalSpinner />
        </Container>
    );
};


const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const Text = styled.p`
    margin: 0;
    padding-bottom: 5px;
`;

const MainSpinner = styled.div`
    width: 50px;
    height: 50px;
    border-bottom: 2px solid #451199;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
`;

const AdditionalSpinner = styled.div`
    width: 100%;
    height: 100%;
    border: 5px solid #fff;
    border-top: 5px solid #451199;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
`;

export default Loader;
