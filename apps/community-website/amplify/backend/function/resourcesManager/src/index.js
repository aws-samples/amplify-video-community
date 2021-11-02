/* Amplify Params - DO NOT EDIT
	API_COMMUNITYWEBSITEAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_COMMUNITYWEBSITEAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const MediaManager = require('./MediaManager.js')
const SectionManager = require('./SectionManager.js')

const resourcesMap = {
    ...MediaManager,
    ...SectionManager,
}

exports.handler = async ({ arguments: { input } }) => {
    try {
        if (!input.query) {
            throw new Error('query parameter must be defined')
        }
        if (!resourcesMap[input.query]) {
            throw new Error(`Query ${input.query} doesn't exist`)
        }
        const params =
            typeof input.params === 'string'
                ? JSON.parse(input.params)
                : input.params
        const data = await resourcesMap[input.query](params)
        if (data.body && data.body.errors && data.body.errors.length > 0) {
            throw new Error(JSON.stringify(data.body.errors))
        }
        return data
    } catch (error) {
        const message = error.message.replace(/\\n/gm, '\n')
        console.error(`Error on ${input.query} request: `, message)
        return {
            statusCode: 500,
            body: message,
        }
    }
}
