import { ReactChild, memo } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { filteredBoardsState } from '../../store/selectors'

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
`
const Header = styled.header`
    max-width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(175, 163, 163, 0.5);
    padding: 0 30px;
`
const Container = styled.section`
    max-width: 100%;
    margin: 0 auto;
    height: 100vh;
`
const Button = styled.button`
    color: black;
    text-transform: uppercase;
    font-size: 15px;
    padding: 12px 30px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`
const TitleLogo = styled.div`
    display: flex;
    align-items: center;
`
interface props {
    children: ReactChild
}

const Layout: React.FC<props> = memo(({ children }) => {
    const board: any = useRecoilValue(filteredBoardsState)

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <Overlay>
            <Header>
                <TitleLogo>
                    <h2>TODOSTER</h2>
                    <h4>{board?.boardTitle}</h4>
                </TitleLogo>

                <Button onClick={handleClick}>LOGIN</Button>
            </Header>
            <Container>{children}</Container>
        </Overlay>
    )
})

export default memo(Layout)
