import AddCardBtn from './AddCardBtn'
import AddCardInputForm from './AddCardInputForm'
import { useState, memo, useCallback } from 'react'
import produce from 'immer'
import { useRecoilState } from 'recoil'
import { ListsState } from '../../store/atoms'
import { v4 as uuid } from 'uuid'
import CardsProvider from '../../services/CardsProvider'

interface props {
    listId: string
}

const AddCardContainer: React.FC<props> = ({ listId }) => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)

    const onAddNewCardHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue) return
            const newCard = {
                cardId: uuid(),
                cardTitle: inputValue,
                cardDescription: '',
            }

            const currentListIndex: number = state.findIndex(
                (list) => list.listId === listId
            )
            if (currentListIndex === -1) return

            CardsProvider.createCard(listId, newCard)

            setState(
                produce(state, (draftState) => {
                    draftState[currentListIndex].cards.push(newCard)
                })
            )
            setIsOpenInputForm(false)
            setInputValue('')
        },
        [inputValue, listId, setState, state]
    )

    return (
        <>
            {!isOpenInputForm ? (
                <AddCardBtn setIsOpenInputForm={setIsOpenInputForm} />
            ) : (
                <AddCardInputForm
                    onAddNewCardHandler={onAddNewCardHandler}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setIsOpenInputForm={setIsOpenInputForm}
                />
            )}
        </>
    )
}

export default memo(AddCardContainer)
