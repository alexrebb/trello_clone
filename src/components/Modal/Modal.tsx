import React, { memo, ReactChild } from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
    position: fixed;
    top: 10vh;
    width: 90%;
    height: 600px;
    background-color: white;
    padding: 1rem;
    border-radius: 2px;
    z-index: 30;
    overflow-y: auto;
    animation: slide-down 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @keyframes slide-down {
        from {
            opacity: 0;
            transform: translateY(-5rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @media (min-width: 768px) {
        width: 30rem;
        left: calc(50% - 18rem);
    }
`
const StyledBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.4);
`
interface BackdropProps {
    onCloseModal: Function
}

const Backdrop: React.FC<BackdropProps> = memo(({ onCloseModal }) => {
    const onCLickHandler = () => {
        onCloseModal()
    }

    return <StyledBackDrop onClick={onCLickHandler}></StyledBackDrop>
})

interface ModalWindowProps {
    children: ReactChild
}

const ModalWindow: React.FC<ModalWindowProps> = memo(({ children }) => {
    return <StyledModal>{children}</StyledModal>
})

interface ModalProps {
    children: ReactChild
    onCloseModal: Function
}

const Modal: React.FC<ModalProps> = memo(({ onCloseModal, children }) => {
    return (
        <div>
            <Backdrop onCloseModal={onCloseModal} />,
            <ModalWindow>{children}</ModalWindow>,
        </div>
    )
})

export default memo(Modal)
