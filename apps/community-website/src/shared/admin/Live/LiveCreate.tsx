import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    required,
    BooleanInput,
} from 'react-admin'

const LivestreamCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput
                    source="description"
                    multiline={true}
                    validate={required()}
                />
                <BooleanInput source="isLive" label="Start live when created" />
                <TextInput source="author" validate={required()} />
                <ImageInput
                    source="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    multiple={false}
                    validate={required()}
                >
                    <ImageField source="thumbnailBlob" title="Thumbnail" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}

export default LivestreamCreate
