import BoardsContainer from '../Boards/BoardsContainer'
import styled from 'styled-components'
import { memo } from 'react'

// А почему в процентах?  Тебе здесь наверное нужна конкрентая ширина в пикселях.
// Кто-нибудь откроет на ультрашироком мониторе и получит неадекватно широкое меню
const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 239, 239, 0.91);
    width: 9%;
    align-items: start;
    z-index: 1;
    padding: 10px;
`

interface props {
    onOpenSettingsMenu: Function
}
const Menu: React.FC<props> = memo(({ onOpenSettingsMenu }) => {
    return (
        <StyledMenuContainer>
            <BoardsContainer onOpenSettingsMenu={onOpenSettingsMenu} />
        </StyledMenuContainer>
    )
})

export default memo(Menu)
