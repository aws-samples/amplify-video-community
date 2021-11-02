import styled from 'styled-components'

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 100px;
    overflow: scroll;
`

const ListSearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const ListSearchBarInput = styled.input`
    background-color: #f9f9f9;
    width: 100%;
    border: none;
    height: 100%;

    &:focus-visible {
        outline: none;
    }
`

const ListSearchBarButton = styled.button`
    background-color: #ff9900;
    color: #ffffff;
    border: none;
    font-size: 14px;
    padding: 0 20px;

    &:hover {
        cursor: pointer;
    }
`

const ListModal = styled.div`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ListModalContent = styled.div`
    z-index: 11;
    margin: 100px;
    border-radius: 15px;
    background-color: #ffffff;
    contain: content;
    display: flex;
    flex-direction: column;
`

const ListModalContentHeader = styled.div`
    background-color: #ffffff;
    color: #000000;
    border-bottom: rgba(0, 0, 0, 0.2) solid 1px;
    padding: 10px;
    text-align: center;
`

const ListModalContentBody = styled.div`
    background-color: #ffffff;
    overflow: scroll;
    margin: 25px;
    gap: 10px;
`

const ListModalContentFooter = styled.div`
    background-color: #ffffff;
    border-top: rgba(0, 0, 0, 0.2) solid 1px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px;
`

export {
    ListContainer,
    ListSearchBarWrapper,
    ListSearchBarInput,
    ListSearchBarButton,
    ListModal,
    ListModalContent,
    ListModalContentHeader,
    ListModalContentBody,
    ListModalContentFooter,
}
