import styled from 'styled-components/macro'
import { GrClose } from 'react-icons/gr'
import { useCallback } from 'react'

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`
const StyledInput = styled.input`
    border-radius: 3px;
    border: none;
    font-size: 15px;
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
const CloseInputIcon = styled.div`
    font-size: 15px;
    cursor: pointer;
`

interface props {
    handleCloseInput: Function
    onAddBoardHandler: Function
    inputValue: string
    setInputValue: Function
}

const AddBoardInputForm: React.FC<props> = ({
    handleCloseInput,
    onAddBoardHandler,
    setInputValue,
    inputValue,
}) => {
    const handleChange = useCallback(
        (e: { target: { value: string } }) => setInputValue(e.target.value),
        [setInputValue]
    )

    return (
        <StyledForm onSubmit={(e) => onAddBoardHandler(e)}>
            <StyledInput
                placeholder="Enter a board title..."
                autoFocus
                value={inputValue}
                onChange={handleChange}
                maxLength={20}
            />
            <ButtonsWrapper>
                <SubmitButton>Add board</SubmitButton>
                <CloseInputIcon onClick={() => handleCloseInput()}>
                    <GrClose />
                </CloseInputIcon>
            </ButtonsWrapper>
        </StyledForm>
    )
}

export default AddBoardInputForm
