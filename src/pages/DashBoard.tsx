import Layout from '../Layout'
import BoardSettingContainer from '../components/BoardSettings/BoardSettingsContainer'
import styled from 'styled-components/macro'
import Menu from '../components/Menu/Menu'
import ListsContainer from '../components/Lists/ListsContainer'
import { useState, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { BoardTitleState } from '../store/atoms'
import { BoardList } from '../types'

const StyledDashBoardContainer = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    background: url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`

const DashBoard = () => {
    const [isOpenBoardSettings, setIsOpenBoardSettings] = useState(false)
    const setBoardTitleState = useSetRecoilState(BoardTitleState)

    const isOnOpenSettingsMenu = useCallback(
        (boardState: BoardList) => {
            setBoardTitleState(boardState)
            setIsOpenBoardSettings(true)
        },
        [setBoardTitleState]
    )
    const handleCloseSettingMenu = useCallback(() => {
        setIsOpenBoardSettings(false)
    }, [setIsOpenBoardSettings])

    return (
        <Layout>
            <StyledDashBoardContainer>
                <Menu isOnOpenSettingsMenu={isOnOpenSettingsMenu} />
                {isOpenBoardSettings && (
                    <BoardSettingContainer
                        handleCloseSettingMenu={handleCloseSettingMenu}
                    />
                )}

                <ListsContainer />
            </StyledDashBoardContainer>
        </Layout>
    )
}

export default DashBoard
