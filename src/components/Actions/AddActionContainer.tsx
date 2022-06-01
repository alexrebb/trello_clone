import AddActionBtn from './AddActionBtn'
import AddActionInputForm from './AddActionInputForm'
import { CardAction } from '../../types'
import { useState, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CardActionsState, CardIdState } from '../../store/atoms'
import produce from 'immer'
import moment from 'moment'
import ActionsProvider from '../../services/ActionsProvider'
import { v4 as uuid } from 'uuid'
import loggerErrors from '../../utils/logger'

const AddActionContainer = () => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [actionsState, setActionsState] = useRecoilState(CardActionsState)
    const cardState = useRecoilValue(CardIdState)

    const displayDateWithTime = moment().format('LLLL')

    const handleOpenInput = useCallback(() => {
        setIsOpenInputForm(true)
    }, [])

    const handleCloseInput = useCallback(() => {
        setIsOpenInputForm(false)
    }, [])

    const onAddCardAction = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue) return
            setIsOpenInputForm(false)
            const newAction: CardAction = {
                listId: cardState.listId,
                cardId: cardState.cardId,
                actionId: uuid(),
                action: inputValue,
                date: displayDateWithTime,
            }
            ActionsProvider.createAction(newAction).catch((err) =>
                loggerErrors(err)
            )

            setActionsState(
                produce(actionsState, (draftState) => {
                    draftState.push(newAction)
                })
            )
            setInputValue('')
        },
        [
            actionsState,
            cardState.cardId,
            cardState.listId,
            displayDateWithTime,
            inputValue,
            setActionsState,
        ]
    )

    return (
        <>
            <AddActionBtn handleOpenInput={handleOpenInput} />
            {isOpenInputForm && (
                <AddActionInputForm
                    handleCloseInput={handleCloseInput}
                    onAddCardAction={onAddCardAction}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
            )}
        </>
    )
}

export default AddActionContainer
