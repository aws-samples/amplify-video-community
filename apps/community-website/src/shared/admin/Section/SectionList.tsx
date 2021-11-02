import React from 'react'
import { List, Datagrid, TextField, DateField } from 'react-admin'

const SectionList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="label" />
            <TextField source="description" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
)

export default SectionList
