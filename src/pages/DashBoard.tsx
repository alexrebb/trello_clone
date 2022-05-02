import Layout from '../Layout'
import BoardSetting from '../components/Boards/BoardSetting'
import styled from 'styled-components/macro'
import Menu from '../components/Menu/Menu'
import ListContainer from '../components/Lists/ListsContainer'
import { useState } from 'react'

const StyledDashBoardContainer = styled.div`
    display: flex;
    background: url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`

const DashBoard = () => {
    const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState(false)

    const isOnOpenSettingsMenu = () => {
        setIsOpenSettingsMenu(true)
    }
    const isOnCloseSettingsMenu = () => {
        setIsOpenSettingsMenu(false)
    }

    return (
        <Layout>
            <StyledDashBoardContainer>
                <Menu isOnOpenSettingsMenu={isOnOpenSettingsMenu} />
                {isOpenSettingsMenu && (
                    <BoardSetting
                        isOnCloseSettingsMenu={isOnCloseSettingsMenu}
                    />
                )}

                <ListContainer />
            </StyledDashBoardContainer>
        </Layout>
    )
}

export default DashBoard
