import React from 'react'
import { required, Create, SimpleForm, TextInput } from 'react-admin'

const SectionCreate = (props) => (
    <Create {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="label" validate={required()} />
            <TextInput
                source="description"
                multiline={true}
                validate={required()}
            />
        </SimpleForm>
    </Create>
)

export default SectionCreate
