import { GrClose } from 'react-icons/gr'
import { MdMoreHoriz } from 'react-icons/md'
import styled from 'styled-components/macro'
import { useCallback } from 'react'

const StyledInput = styled.input`
    width: 180px;
    border-radius: 3px;
    word-break: break-all;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    word-break: break-all;
    border: none;
    &:focus {
        outline: none;
    }
    font-size: 15px;
`
const StyledIconsWrapper = styled.div`
    display: flex;
`
const StyledIcon = styled.div`
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
`
const StyledListTitle = styled.div`
    font-weight: bold;
    cursor: pointer;
    word-break: break-all;
`
const StyledCloseIcon = styled.span`
    font-size: 15px;
    cursor: pointer;
`
const StyledTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    margin-top: 5px;
`
interface props {
    handleOpenRemoveBoard: Function
    handleCloseSettingMenu: Function
    isOpenInputTitle: Boolean
    boardTitle: string
    handleOpenInputTitle: Function
    setInputValue: Function
    inputValue: string
    onChangeTitleHandler: Function
}
const BoardSettingsTitle: React.FC<props> = ({
    handleOpenRemoveBoard,
    handleCloseSettingMenu,
    isOpenInputTitle,
    boardTitle,
    handleOpenInputTitle,
    setInputValue,
    inputValue,
    onChangeTitleHandler,
}) => {
    const handleChange = useCallback(
        (e: { target: { value: string } }) => setInputValue(e.target.value),
        [setInputValue]
    )

    return (
        <StyledTitleWrapper>
            {!isOpenInputTitle ? (
                <StyledListTitle onClick={() => handleOpenInputTitle()}>
                    {boardTitle}
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
            <StyledIconsWrapper>
                <StyledIcon onClick={() => handleOpenRemoveBoard()}>
                    <MdMoreHoriz />
                </StyledIcon>
                <StyledCloseIcon onClick={() => handleCloseSettingMenu()}>
                    <GrClose />
                </StyledCloseIcon>
            </StyledIconsWrapper>
        </StyledTitleWrapper>
    )
}

export default BoardSettingsTitle
