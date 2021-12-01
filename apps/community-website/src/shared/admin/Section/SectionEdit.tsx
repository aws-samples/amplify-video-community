import React from 'react'
import { Edit, SimpleForm, TextInput, required } from 'react-admin'

const SectionEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="label" validate={required()} />
            <TextInput
                source="description"
                validate={required()}
                multiline={true}
            />
        </SimpleForm>
    </Edit>
)

export default SectionEdit
