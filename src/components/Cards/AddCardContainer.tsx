import AddCardBtn from './AddCardBtn'
import AddCardInputForm from './AddCardInputForm'
import { useState, memo } from 'react'
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

    const onAddNewCardHandler = (e: React.FormEvent) => {
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

        CardsProvider.createCard(listId, newCard).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })

        setState(
            produce(state, (draftState) => {
                draftState[currentListIndex].cards.push(newCard)
            })
        )
        setIsOpenInputForm(false)
        setInputValue('')
    }

    return (
        <>
            {!isOpenInputForm && (
                <AddCardBtn setIsOpenInputForm={setIsOpenInputForm} />
            )}
            {isOpenInputForm && (
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
