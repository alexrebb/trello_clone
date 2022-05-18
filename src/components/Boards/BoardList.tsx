import Board from './Board'
import styled from 'styled-components/macro'
import { memo, useEffect } from 'react'
import { BoardListState } from '../../store/atoms'
import { useRecoilState } from 'recoil'
import BoardsProvider from '../../service/BoardsProvider'

const StyledBoardList = styled.div`
    display: flex;
    flex-direction: column;
`

interface props {
    onOpenSettingsMenu: Function
}

const BoardList: React.FC<props> = ({ onOpenSettingsMenu }) => {
    const [boardList, setBoardList] = useRecoilState(BoardListState)

    useEffect(() => {
        BoardsProvider.getBoardList().then((res: any) => {
            if (res.status === 200) {
                setBoardList(res.data)
            }
        })
    }, [])

    return (
        <StyledBoardList>
            {boardList?.map((board) => {
                return (
                    <Board
                        key={board.boardId}
                        boardId={board.boardId}
                        boardTitle={board.boardTitle}
                        onOpenSettingsMenu={onOpenSettingsMenu}
                    />
                )
            })}
        </StyledBoardList>
    )
}

export default memo(BoardList)
