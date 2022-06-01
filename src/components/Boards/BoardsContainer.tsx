import BoardList from '../Boards/BoardList'
import AddBoardBtn from './AddBoardBtn'
import AddBoardInputForm from './AddBoardInputForm'
import { memo, useState, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { BoardListState } from '../../store/atoms'
import produce from 'immer'
import { v4 as uuid } from 'uuid'
import BoardsProvider from '../../services/BoardsProvider'
import loggerErrors from '../../utils/logger'

interface props {
    onOpenSettingsMenu: Function
}

const BoardsContainer: React.FC<props> = ({ onOpenSettingsMenu }) => {
    const [isOpenNewBoardInputForm, setIsOpenNewBoardInputForm] =
        useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] =
        useRecoilState(BoardListState)

    const handleCloseInput = useCallback(() => {
        setIsOpenNewBoardInputForm(false)
    }, [])

    const handleOpenInput = useCallback(() => {
        setIsOpenNewBoardInputForm(true)
    }, [])

    const onAddBoardHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue.length) return

            const addBoard = {
                boardId: uuid(),
                boardTitle: inputValue,
            }

            if (currentBoardState.length >= 10) return

            BoardsProvider.createBoard(addBoard).catch((err) =>
                loggerErrors(err)
            )

            setCurrentBoardState(
                produce(currentBoardState, (draftState) => {
                    draftState.push(addBoard)
                })
            )
            setIsOpenNewBoardInputForm(false)
            setInputValue('')
        },
        [currentBoardState, inputValue, setCurrentBoardState]
    )

    useEffect(() => {
        BoardsProvider.getBoardList()
            .then((res: any) => setCurrentBoardState(res))
            .catch((err) => loggerErrors(err))
    }, [])

    return (
        <>
            <h4>Your boards</h4>
            <BoardList onOpenSettingsMenu={onOpenSettingsMenu} />
            {!isOpenNewBoardInputForm ? (
                <AddBoardBtn handleOpenInput={handleOpenInput} />
            ) : (
                <AddBoardInputForm
                    handleCloseInput={handleCloseInput}
                    onAddBoardHandler={onAddBoardHandler}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
            )}
        </>
    )
}

export default memo(BoardsContainer)
