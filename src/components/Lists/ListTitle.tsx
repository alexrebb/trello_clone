import styled from 'styled-components/macro'
import { MdMoreHoriz } from 'react-icons/md'
import { useCallback } from 'react'

const StyledListTitle = styled.div`
    font-weight: bold;
    cursor: pointer;
    word-break: break-all;
`
const StyledTitleContainer = styled.div`
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
interface props {
    setIsOpenInputTitle: Function
    isOpenInputTitle: boolean
    listTitle: string
    onChangeTitleHandler: Function
    inputValue: string
    setInputValue: Function
    setIsOpenRemoveList: Function
}

const ListTitle: React.FC<props> = ({
    setIsOpenInputTitle,
    isOpenInputTitle,
    listTitle,
    setInputValue,
    inputValue,
    onChangeTitleHandler,
    setIsOpenRemoveList,
}) => {
    const handleOpenInput = () => setIsOpenInputTitle(true)
    const handleOpenRemoveList = () => setIsOpenRemoveList(true)
    const handleChange = useCallback(
        (e: { target: { value: string } }) => setInputValue(e.target.value),
        [setInputValue]
    )

    return (
        <StyledTitleContainer>
            {!isOpenInputTitle ? (
                <StyledListTitle onClick={handleOpenInput}>
                    {listTitle}
                </StyledListTitle>
            ) : (
                <StyledInput
                    type="text"
                    onBlur={() => onChangeTitleHandler()}
                    autoFocus
                    value={inputValue}
                    onChange={handleChange}
                />
            )}
            <StyledIcon onClick={handleOpenRemoveList}>
                <MdMoreHoriz />
            </StyledIcon>
        </StyledTitleContainer>
    )
}

export default ListTitle
