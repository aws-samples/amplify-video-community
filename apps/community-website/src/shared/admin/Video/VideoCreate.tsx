import React, { useEffect, useState } from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    RadioButtonGroupInput,
    ImageInput,
    ImageField,
    FileInput,
    FileField,
} from 'react-admin'
import { FormDataConsumer } from 'react-admin'
import styled from 'styled-components'
import TagsInput from '../CustomFields/TagsInput'
import ProgressField from '../CustomFields/ProgressField'
import { fetchSections } from '../../api'

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const CommonInputs = () => {
    const [existingSections, setExistingSections] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                if (!data || !data.listSections || !data.listSections.items)
                    throw 'Received invalid sections list'
                const formatedSections = data.listSections.items.map(
                    (element) => ({ id: element.id, name: element.label })
                )
                setExistingSections(formatedSections)
            } catch (error) {
                console.error('Form/VideoUpload.tsx(fetchSections):', error)
            }
        })()
    }, [])

    return (
        <InputsContainer>
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
            <BooleanInput source="highlighted" />
            <TextInput source="author" />
            <TagsInput source="sections" choices={existingSections} />
        </InputsContainer>
    )
}

const SelfSourceVideo = (props) => (
    <InputsContainer>
        <CommonInputs {...props} />
        <ImageInput
            source="thumbnail"
            label="Thumbnail"
            accept="image/*"
            multiple={false}
        >
            <ImageField source="thumbnailBlob" title="Thumbnail" />
        </ImageInput>
        <FileInput
            source="video"
            label="Video"
            accept="video/*"
            placeholder={<p>Drop a video to upload, or click to select it.</p>}
            mutiple={false}
        >
            <FileField source="videoBlob" title="video" />
        </FileInput>
        <ProgressField source="progress" />
    </InputsContainer>
)

const YoutubeSourceVideo = (props) => (
    <InputsContainer>
        <CommonInputs {...props} />
        <TextInput source="url" />
    </InputsContainer>
)

const validate = (values) => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    if (!values.author) {
        errors.author = 'Required'
        return errors
    }
    if (
        values.source === 'SELF' &&
        (!values.thumbnail || !values.thumbnail.rawFile)
    ) {
        errors.thumbnail = 'Required'
    }
    if (values.source === 'SELF' && (!values.video || !values.video.rawFile)) {
        errors.video = 'Required'
    }
    if (values.source === 'YOUTUBE' && !values.url) {
        values.url = 'Required'
    }
    return errors
}

const VideoCreate = (props) => (
    <Create {...props}>
        <SimpleForm validate={validate}>
            <RadioButtonGroupInput
                source="source"
                choices={[
                    { id: 'SELF', name: 'Amplify' },
                    { id: 'YOUTUBE', name: 'Youtube' },
                ]}
            />
            <FormDataConsumer>
                {({ formData }) => {
                    if (formData.source === 'SELF')
                        return <SelfSourceVideo {...props} />
                    else if (formData.source === 'YOUTUBE')
                        return <YoutubeSourceVideo {...props} />
                }}
            </FormDataConsumer>
        </SimpleForm>
    </Create>
)

export default VideoCreate
