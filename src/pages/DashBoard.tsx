import Layout from '../Layout/Layout'
import SettingsMenu from '../components/Boards/BoardSetting'
import styled from 'styled-components'
import Menu from '../components/Menu/Menu'
import ListContainer from '../components/Lists/ListsContainer'
import { useState } from 'react'

const StyledDashBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    background: url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`

const DashBoard = () => {
    const [openSettingsMenu, setOpenSettingsMenu] = useState(false)

    const onOpenSettingsMenu = () => {
        setOpenSettingsMenu(true)
    }
    const onCloseSettingsMenu = () => {
        setOpenSettingsMenu(false)
    }

    return (
        // Что-то у тебя не так тут с ограничениями по ширине, если карточек много то меню боковое ширину не держит
        // Скукоживается, уезжает за экран налево
    
        <Layout>
            <StyledDashBoardContainer>
                <Menu onOpenSettingsMenu={onOpenSettingsMenu} />
                {openSettingsMenu && (
                    <SettingsMenu onCloseSettingsMenu={onCloseSettingsMenu} />
                )}

                <ListContainer />
            </StyledDashBoardContainer>
        </Layout>
    )
}

export default DashBoard
