import styled from 'styled-components/macro'
import { MdMoreHoriz } from 'react-icons/md'
import { useState, memo, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { ListsState } from '../../store/atoms'
import produce from 'immer'
import ListsProvider from '../../service/ListsProvider'

const StyledListTitle = styled.div`
    font-weight: bold;
    cursor: pointer;
    word-break: break-all;
`
const StiledTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledIcon = styled.div`
    font-size: 20px;
    cursor: pointer;
`
const StyledInput = styled.input`
    width: 100%;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    border: none;
    &:focus {
        outline: none;
    }
    font-size: 15px;
`
const StyledRemoveList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    font-size: 15px;
    animation: list 800ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @keyframes list {
        from {
            opacity: 0;
            transform: translateY(-1rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
const StyledList = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledBtn = styled.button`
    padding: 2px;
    margin-right: 7px;
    text-transform: uppercase;
    border-radius: 3px;
    border: none;
    cursor: pointer;
`
const SryleRemoveList = styled.span`
    text-transform: uppercase;
`

interface props {
    listTitle: string
    listId: string
}

const ListTitle: React.FC<props> = ({ listTitle, listId }) => {
    const [isOpenInputTitle, setIsOpenInputTitle] = useState(false)
    const [isOpenRemoveList, setOpenRemoveList] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)

    const onOpenInputTitleHandler = () => {
        setIsOpenInputTitle(true)
    }
    const onOpenRemoveListHandler = () => {
        setOpenRemoveList(!isOpenRemoveList)
    }
    const onCloseRemoveListHandler = () => {
        setOpenRemoveList(false)
    }

    const onChangeTitleHandler = useCallback(() => {
        setIsOpenInputTitle(false)
        if (!inputValue) return

        const currentListIndex = state.findIndex(
            (list) => list.listId === listId
        )

        ListsProvider.changeListTitle(inputValue, listId).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })

        setState(
            produce(state, (draftState) => {
                draftState[currentListIndex].listTitle = inputValue
            })
        )
    }, [listId, setState, state, inputValue])

    const onRemoveListHandler = useCallback(() => {
        ListsProvider.deleteList(listId).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })
        setState(
            produce(state, (draftState) => {
                return (draftState = draftState.filter(
                    (list) => list.listId !== listId
                ))
            })
        )
    }, [listId, setState, state])

    return (
        <StyledList>
            <StiledTitleContainer>
                {!isOpenInputTitle && (
                    <StyledListTitle onClick={onOpenInputTitleHandler}>
                        {listTitle}
                    </StyledListTitle>
                )}
                {isOpenInputTitle && (
                    <StyledInput
                        type="text"
                        onBlur={onChangeTitleHandler}
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}
                <StyledIcon onClick={onOpenRemoveListHandler}>
                    <MdMoreHoriz />
                </StyledIcon>
            </StiledTitleContainer>
            {isOpenRemoveList && (
                <StyledRemoveList>
                    <SryleRemoveList>Remove List?</SryleRemoveList>
                    <div>
                        <StyledBtn onClick={onRemoveListHandler}>Yes</StyledBtn>
                        <StyledBtn onClick={onCloseRemoveListHandler}>
                            No
                        </StyledBtn>
                    </div>
                </StyledRemoveList>
            )}
        </StyledList>
    )
}

export default memo(ListTitle)
