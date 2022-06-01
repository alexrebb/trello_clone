import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'

const StyledNewBoard = styled.div`
    width: 180px;
    font-size: 15px;
    background-color: rgba(255, 248, 248, 0.849);
    border-radius: 3px;
    padding: 10px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: rgba(128, 128, 128, 0.9);
    }
`

interface props {
    setIsOpenNewBoardInputForm: Function
}

const AddBoardBtn: React.FC<props> = ({ setIsOpenNewBoardInputForm }) => {
    const handleOpenInput = () => setIsOpenNewBoardInputForm(true)

    return (
        <StyledNewBoard onClick={handleOpenInput}>
            <HiOutlinePlus />
            <span>New board</span>
        </StyledNewBoard>
    )
}

export default AddBoardBtn
