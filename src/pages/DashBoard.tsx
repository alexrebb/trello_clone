import Layout from '../Layout'
import BoardSetting from '../components/Boards/BoardSetting'
import styled from 'styled-components/macro'
import Menu from '../components/Menu/Menu'
import ListContainer from '../components/Lists/ListsContainer'
import { useState, useEffect } from 'react'
import { BoardListState, userDevice } from '../store/atoms'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { updateBoardList } from '../service/api'
import axios from 'axios'
import { baseURL } from '../service/api'

const StyledDashBoardContainer = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    background: url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`

const DashBoard = () => {
    const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState(false)
    const [state, setState] = useRecoilState(BoardListState)
    const setUserDevice = useSetRecoilState(userDevice)

    const isOnOpenSettingsMenu = () => {
        setIsOpenSettingsMenu(true)
    }
    const isOnCloseSettingsMenu = () => {
        setIsOpenSettingsMenu(false)
    }

    const getBoardList = async () => {
        try {
            const response = await axios.get(`${baseURL}/get-board-list`)
            setState(response.data.boardList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            setUserDevice('Mobile')
        }
        getBoardList()
    }, [])

    useEffect(() => {
        updateBoardList(state)
    }, [state])

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
