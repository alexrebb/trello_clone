import styled from 'styled-components/macro'

const StyledDescription = styled.div`
background-color: background-color: rgba(218, 220, 224, 0.7);
border-radius: 3px;
box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
padding: 15px;
font-size: 14px;

cursor: pointer;
word-break: break-all;
&:hover {
    background-color: rgb(235, 236, 240);
}
`
interface props {
    setIsOpenInputForm: Function
    cardDescription: string
}

const AddCardActionDescription: React.FC<props> = ({
    setIsOpenInputForm,
    cardDescription,
}) => {
    const handleOpenInput = () => {
        setIsOpenInputForm(true)
    }

    return (
        <StyledDescription onClick={handleOpenInput}>
            {cardDescription || 'Add a more deteiled description...'}
        </StyledDescription>
    )
}

export default AddCardActionDescription
