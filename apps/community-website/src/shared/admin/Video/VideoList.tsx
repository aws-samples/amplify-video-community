import React from 'react'
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin'
import ThumbnailField from '../CustomFields/ThumbnailField'
import EllipsisTextField from '../CustomFields/EllipsisTextField'
import SourceField from '../CustomFields/SourceField'
import { useWindowDimensions } from '../../hooks'

const VideoList = (props) => {
    const size = useWindowDimensions()

    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <ThumbnailField source="thumbnail" />
                <EllipsisTextField source="title" width="125px" />
                <EllipsisTextField source="description" width="125px" />
                <TextField source="viewCount" label="Views" />
                <TextField source="author" />
                {size.width > 1450 && <BooleanField source="highlighted" />}
                {size.width > 1600 && <SourceField source="source" />}
                {size.width > 1700 && <DateField source="createdAt" />}
                {size.width > 1700 && <DateField source="updatedAt" />}
            </Datagrid>
        </List>
    )
}

export default VideoList
