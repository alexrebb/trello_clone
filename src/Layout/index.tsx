import { ReactChild } from 'react'
import styled from 'styled-components/macro'
import { useRecoilValue } from 'recoil'
import { currentBoardTitle } from '../store/selectors'

const Overlay = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
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
    flex: 1;
    overflow: auto;
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
const StyledBoardTitle = styled.h3`
    padding: 0 40px;
    color: rgba(31, 27, 27, 0.822);
`
interface props {
    children: ReactChild
}

const Layout: React.FC<props> = ({ children }) => {
    const boardTitle = useRecoilValue(currentBoardTitle)

    return (
        <Overlay>
            <Header>
                <TitleLogo>
                    <h2>TODOSTER</h2>
                    {boardTitle && (
                        <StyledBoardTitle>
                            Current board: {boardTitle}
                        </StyledBoardTitle>
                    )}
                </TitleLogo>

                <Button>LOGIN</Button>
            </Header>
            <Container>{children}</Container>
        </Overlay>
    )
}

export default Layout
