import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'

const StyledAddCard = styled.div`
    color: gray;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 3px;

    &:hover {
        background-color: rgba(128, 128, 128, 0.45);
        color: black;
    }
`
interface props {
    handleOpenInput: Function
}

const AddCardBtn: React.FC<props> = ({ handleOpenInput }) => {
    return (
        <StyledAddCard onClick={() => handleOpenInput()}>
            <HiOutlinePlus />
            <span>Add a card</span>
        </StyledAddCard>
    )
}

export default AddCardBtn
