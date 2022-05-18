import Layout from '../Layout'
import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'

const StyledHomeContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const StyledTitle = styled.h1`
    font-size: 70px;
    text-transform: uppercase;
`
const StyledButton = styled.button`
    color: black;
    text-transform: uppercase;
    font-size: 15px;
    padding: 12px 30px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`

const HomePage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <Layout>
            <StyledHomeContainer>
                <StyledTitle>welcome to your tasks</StyledTitle>
                <StyledButton onClick={handleClick}>
                    create account
                </StyledButton>
            </StyledHomeContainer>
        </Layout>
    )
}

export default HomePage
