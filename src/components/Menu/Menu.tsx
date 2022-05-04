import BoardsContainer from '../Boards/BoardsContainer'
import styled from 'styled-components/macro'
import { memo } from 'react'

const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 239, 239, 0.91);
    width: 200px;
    align-items: start;
    z-index: 1;
    padding: 10px;
`

interface props {
    isOnOpenSettingsMenu: Function
}
const Menu: React.FC<props> = ({ isOnOpenSettingsMenu }) => {
    return (
        <StyledMenuContainer>
            <BoardsContainer onOpenSettingsMenu={isOnOpenSettingsMenu} />
        </StyledMenuContainer>
    )
}

export default memo(Menu)
