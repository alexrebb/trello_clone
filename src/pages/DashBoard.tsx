import Layout from '../Layout'
import BoardSetting from '../components/Boards/BoardSetting'
import styled from 'styled-components/macro'
import Menu from '../components/Menu/Menu'
import ListContainer from '../components/Lists/ListsContainer'
import { useState, useEffect } from 'react'
import { BoardListState, userDevice } from '../store/atoms'
import { useSetRecoilState } from 'recoil'
// А чем fetch не устраивает, зачем ради запроса axios в сборку добавлять?
import axios from 'axios'

const StyledDashBoardContainer = styled.div`
    height: calc(100vh - 70px);
    display: flex;
    background: url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`

const DashBoard = () => {
    const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState(false)
    const setState = useSetRecoilState(BoardListState)
    const setUserDevice = useSetRecoilState(userDevice)

    const isOnOpenSettingsMenu = () => {
        setIsOpenSettingsMenu(true)
    }
    const isOnCloseSettingsMenu = () => {
        setIsOpenSettingsMenu(false)
    }

    const getBoardList = async () => {
        try {
            // Советую почитать https://nordicapis.com/10-best-practices-for-naming-api-endpoints/
            // здесь /get-board-list
            const response = await axios.get('http://localhost:8000/boardlist')

            setState(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     localStorage.setItem('boardsList', JSON.stringify(state))
    // }, [state])

    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            setUserDevice('Mobile')
        }

        getBoardList()
        // if (localStorage.length === 0) return
        // try {

        //     setState(
        //         produce(state, (draftState) => {
        //             draftState = JSON.parse(
        //                 `${localStorage.getItem('boardsList')}`
        //             )
        //             return draftState
        //         })
        //     )
        // } catch (error) {
        //     return
        // }
    }, [])

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
