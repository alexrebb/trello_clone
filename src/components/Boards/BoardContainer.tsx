import Board from './Board'

import { memo, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { BoardIdState, BoardTitleState, ListsState } from '../../store/atoms'
import ListsProvider from '../../services/ListsProvider'
import loggerErrors from '../../utils/logger'

interface props {
    onOpenSettingsMenu: Function
    boardId: string
    boardTitle: string
}

const BoardContainer: React.FC<props> = ({
    onOpenSettingsMenu,
    boardId,
    boardTitle,
}) => {
    const setBoardIdState = useSetRecoilState(BoardIdState)
    const setBoardTitleState = useSetRecoilState(BoardTitleState)
    const setCurrentBoard = useSetRecoilState(ListsState)
    const boardState = {
        boardId: boardId,
        boardTitle: boardTitle,
    }

    const onOpenSettingsMenuHandle = useCallback(() => {
        onOpenSettingsMenu(boardState)
    }, [onOpenSettingsMenu])

    const onClickHandleBoard = useCallback(() => {
        setCurrentBoard([])
        setBoardIdState(boardId)
        ListsProvider.getCurrentLists(boardId)
            .then((res: any) => {
                setCurrentBoard(res)
                setBoardTitleState(boardState)
            })
            .catch((err) => loggerErrors(err))
    }, [setBoardIdState, setBoardTitleState, setCurrentBoard])

    return (
        <Board
            onClickHandleBoard={onClickHandleBoard}
            onOpenSettingsMenu={onOpenSettingsMenuHandle}
            boardTitle={boardTitle}
        />
    )
}

export default memo(BoardContainer)
