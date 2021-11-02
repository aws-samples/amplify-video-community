const https = require('https')
const http = require('http')
const AWS = require('aws-sdk')
const urlParse = require('url').URL
const queries = require('./gql.js')

const appsyncUrl = process.env.API_AMPVIDEOCOMMUWEBAPI_GRAPHQLAPIENDPOINTOUTPUT
const region = process.env.REGION
const endpoint = new urlParse(appsyncUrl).hostname.toString()
const apiKey = process.env.API_AMPVIDEOCOMMUWEBAPI_GRAPHQLAPIKEYOUTPUT

const executeQuery = (name, params) => {
    if (!queries[name]) {
        throw new Error(`This lambda doesn't manage ${name} query`)
    }
    const req = new AWS.HttpRequest(appsyncUrl, region)

    req.method = 'POST'
    req.path = '/graphql'
    req.headers.host = endpoint
    req.headers['Content-Type'] = 'application/json'
    req.body = JSON.stringify({
        query: queries[name],
        operationName: name,
        variables: params,
    })

    if (apiKey) {
        req.headers['x-api-key'] = apiKey
    } else {
        const signer = new AWS.Signers.V4(req, 'appsync', true)
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())
    }

    const promise = new Promise((resolve, reject) => {
        const requestClient = req.endpoint.protocol === 'http:' ? http : https
        const httpRequest = requestClient.request(
            { ...req, host: endpoint },
            (result) => {
                let data = ''

                result.on('data', (chunk) => {
                    data += chunk
                })

                result.on('end', () => {
                    resolve(JSON.parse(data.toString()))
                })

                result.on('error', (error) => {
                    reject(error)
                })
            }
        )

        httpRequest.write(req.body)
        httpRequest.end()
    })
    return promise
}

module.exports = executeQuery
