import Modal from './Modal'
import ActionDescriptionContainer from '../Actions/ActionDescriptionContainer'
import ActionList from '../Actions/ActionsList'
import AddActionContainer from '../Actions/AddActionContainer'
import CardTitleDescription from '../Actions/ActionTitleDescriptionContainer'
import { memo } from 'react'
import styled from 'styled-components/macro'
import { useRecoilValue } from 'recoil'
import { filteredCardState } from '../../store/selectors'
import { MdOutlineDescription } from 'react-icons/md'

const StyledModalContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`
const StyleDescr = styled.h4`
    margin-left: 10px;
    margin-right: 15px;
`

interface props {
    onCloseModal: Function
}

const ModalCard: React.FC<props> = ({ onCloseModal }) => {
    const cardState = useRecoilValue(filteredCardState)

    return (
        <Modal onCloseModal={onCloseModal}>
            <StyledModalContainer>
                <CardTitleDescription />
                <StyledWrapper>
                    <MdOutlineDescription />
                    <StyleDescr>Description</StyleDescr>
                </StyledWrapper>
                <ActionDescriptionContainer
                    cardDescription={cardState.cardDescription}
                />
                <AddActionContainer />
                <ActionList />
            </StyledModalContainer>
        </Modal>
    )
}

export default memo(ModalCard)
