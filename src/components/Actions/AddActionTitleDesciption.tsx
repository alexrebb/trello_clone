import { BsCardChecklist } from 'react-icons/bs'
import styled from 'styled-components/macro'

const StyledTitle = styled.h3`
    margin-left: 10px;
    cursor: pointer;
`
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`
interface props {
    setIsOpenInputForm: Function
    cardTitle: string
}

const AddActionTitleDesciption: React.FC<props> = ({
    cardTitle,
    setIsOpenInputForm,
}) => {
    const handleOpenForm = () => {
        setIsOpenInputForm(true)
    }

    return (
        <StyledWrapper onClick={handleOpenForm}>
            <BsCardChecklist />
            <StyledTitle>{cardTitle}</StyledTitle>
        </StyledWrapper>
    )
}

export default AddActionTitleDesciption
