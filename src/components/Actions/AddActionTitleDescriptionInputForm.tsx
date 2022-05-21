import styled from 'styled-components/macro'
import { GrClose } from 'react-icons/gr'

const StyledInputForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const StyledTextArea = styled.textarea`
    resize: none;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    border: none;
    &:focus {
        outline: none;
    }
    font-size: 15px;
    word-break: break-all;
`
const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin-top: 5px;
`
const SubmitButton = styled.button`
    border: none;
    padding: 10px;
    border-radius: 7px;
    background-color: rgba(26, 151, 223, 0.8);
    color: white;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        background-color: rgb(26, 151, 223);
    }
`
const CloseInputIcon = styled.span`
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: black;
    }
`

interface props {
    setIsOpenInputForm: Function
    onChangeCardTitle: Function
    inputValue: string
    setInputValue: Function
}

const AddActionTitleDescriptionInputForm: React.FC<props> = ({
    setIsOpenInputForm,
    onChangeCardTitle,
    inputValue,
    setInputValue,
}) => {
    return (
        <StyledInputForm onSubmit={(e) => onChangeCardTitle(e)}>
            <StyledTextArea
                placeholder="Change a title..."
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonsWrapper>
                <SubmitButton>Save</SubmitButton>
                <CloseInputIcon onClick={() => setIsOpenInputForm(false)}>
                    <GrClose />
                </CloseInputIcon>
            </ButtonsWrapper>
        </StyledInputForm>
    )
}

export default AddActionTitleDescriptionInputForm
