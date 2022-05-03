import Modal from './Modal'
import CardDescription from '../Cards/CardDescription'
import CardActionList from '../Cards/CardActionList'
import CardAddAction from '../Cards/CardAddAction'
import CardTitleDescription from '../Cards/CardTitleDescription'

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
                <CardDescription cardDescription={cardState.cardDescription} />
                <CardAddAction />
                <CardActionList cardState={cardState} />
            </StyledModalContainer>
        </Modal>
    )
}

export default memo(ModalCard)
