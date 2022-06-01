import styled from 'styled-components/macro'
import { GrClose } from 'react-icons/gr'
import { useCallback } from 'react'

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
    border-radius: 3px;
    border: none;
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
const CloseInputIcon = styled.div`
    font-size: 15px;
    cursor: pointer;
`

interface props {
    handleCloseInput: Function
    onCloseOnBlur: Function
    setInputValue: Function
    inputValue: string
    onAddList: Function
}

const AddListInputForm: React.FC<props> = ({
    handleCloseInput,
    onCloseOnBlur,
    setInputValue,
    inputValue,
    onAddList,
}) => {
    const handleChange = useCallback(
        (e: { target: { value: string } }) => setInputValue(e.target.value),
        [setInputValue]
    )

    return (
        <StyledForm onSubmit={(e) => onAddList(e)}>
            <StyledInput
                placeholder="Enter a list title..."
                autoFocus
                value={inputValue}
                onChange={handleChange}
                onBlur={(e) => onCloseOnBlur(e)}
            />
            <ButtonsWrapper>
                <SubmitButton>Add list</SubmitButton>
                <CloseInputIcon onClick={() => handleCloseInput()}>
                    <GrClose />
                </CloseInputIcon>
            </ButtonsWrapper>
        </StyledForm>
    )
}

export default AddListInputForm
