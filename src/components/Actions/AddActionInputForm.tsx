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
    font-size: 12px;
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
    padding: 7px;
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
    onAddCardAction: Function
    setInputValue: Function
    inputValue: string
}

const AddActionInputForm: React.FC<props> = ({
    setIsOpenInputForm,
    onAddCardAction,
    setInputValue,
    inputValue,
}) => {
    return (
        <StyledInputForm onSubmit={(e) => onAddCardAction(e)}>
            <StyledTextArea
                placeholder="Write a comment..."
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

export default AddActionInputForm
