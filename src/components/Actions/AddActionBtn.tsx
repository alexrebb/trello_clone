import styled from 'styled-components/macro'
import { BsJournalPlus } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'

const StyledIconPlus = styled.span`
    padding: 4px 4px 0 4px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
        background-color: rgba(128, 128, 128, 0.8);
    }
    &:active {
        background-color: rgba(128, 128, 128, 0.45);
    }
`
const StyleDescr = styled.h4`
    margin-left: 10px;
    margin-right: 15px;
`
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`

interface props {
    setIsOpenInputForm: Function
}
const AddActionBtn: React.FC<props> = ({ setIsOpenInputForm }) => {
    const handleOpenInput = () => {
        setIsOpenInputForm(true)
    }

    return (
        <StyledWrapper>
            <MdOutlineDescription />
            <StyleDescr>Actions</StyleDescr>
            <StyledIconPlus onClick={handleOpenInput}>
                <BsJournalPlus />
            </StyledIconPlus>
        </StyledWrapper>
    )
}

export default AddActionBtn
