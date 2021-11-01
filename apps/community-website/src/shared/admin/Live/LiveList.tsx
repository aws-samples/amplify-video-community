import React from 'react'
import {
    Datagrid,
    DateField,
    List,
    useRecordContext,
    TextField,
    UrlField,
} from 'react-admin'
import EllipsisTextField from '../CustomFields/EllipsisTextField'
import styled from 'styled-components'
import ThumbnailField from '../CustomFields/ThumbnailField'
import { useWindowDimensions } from '../../hooks'

const IsLiveIcon = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ isLive }) => (isLive ? '#06d6a0' : '#ef476f')};
`
const IsLiveField = ({ source }) => {
    const record = useRecordContext()
    return <IsLiveIcon isLive={record[source]} />
}

const LiveList = (props) => {
    const size = useWindowDimensions()
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <IsLiveField source="isLive" label="IsLive" />
                <ThumbnailField source="thumbnail" />
                <EllipsisTextField source="title" width="125px" />
                <EllipsisTextField source="description" width="125px" />
                <TextField source="author" />
                {size.width > 1300 && <UrlField source="url" />}
                {size.width > 1700 && <DateField source="createdAt" />}
                {size.width > 1700 && <DateField source="updatedAt" />}
            </Datagrid>
        </List>
    )
}

export default LiveList
