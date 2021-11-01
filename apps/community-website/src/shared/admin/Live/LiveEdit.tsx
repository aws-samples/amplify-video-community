import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    ImageInput,
    ImageField,
    required,
} from 'react-admin'
import ThumbnailField from '../CustomFields/ThumbnailField'

const LiveEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ThumbnailField source="thumbnail" width={400} height={200} />
            <TextInput source="title" validate={required()} />
            <TextInput
                source="description"
                multiline={true}
                validate={required()}
            />
            <BooleanInput source="isLive" label="Start live" />
            <TextInput source="author" validate={required()} />
            <ImageInput
                source="thumbnail"
                label="Thumbnail"
                accept="image/*"
                multiple={false}
            >
                <ImageField source="thumbnailBlob" title="Thumbnail" />
            </ImageInput>
        </SimpleForm>
    </Edit>
)

export default LiveEdit
