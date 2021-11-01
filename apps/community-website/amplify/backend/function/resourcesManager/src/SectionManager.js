const executeQuery = require('./executeQuery.js')

const SectionManager = {
    deleteSection: async ({ id }) => {
        const mediasSectionsData = await executeQuery('ListMediasSections', {
            filter: { sectionID: { eq: id } },
        })

        for (const mediasSection of mediasSectionsData.data.listMediasSections
            .items) {
            if (!mediasSection) continue
            await executeQuery('DeleteMediasSections', {
                input: { id: mediasSection.id },
            })
        }
        const sectionData = await executeQuery('DeleteSection', {
            input: { id },
        })
        return {
            statusCode: 200,
            body: sectionData,
        }
    },
    listSectionsAndMedias: async () => {
        const sectionsData = await executeQuery('ListSections')
        if (
            !sectionsData ||
            !sectionsData.data ||
            !sectionsData.data.listSections ||
            !sectionsData.data.listSections.items
        ) {
            return {
                statusCode: 500,
                body: 'Failed to list sections',
            }
        }

        const mediasSectionsData = await executeQuery('ListMediasSections')
        if (
            !mediasSectionsData ||
            !mediasSectionsData.data ||
            !mediasSectionsData.data.listMediasSections ||
            !mediasSectionsData.data.listMediasSections.items
        ) {
            return {
                statusCode: 500,
                body: 'Failed to list mediasSections',
            }
        }

        const mediasData = await executeQuery('ListMedias')
        if (
            !mediasData ||
            !mediasData.data ||
            !mediasData.data.listMedias ||
            !mediasData.data.listMedias.items
        ) {
            return {
                statusCode: 500,
                body: 'Failed to list medias',
            }
        }

        const list = sectionsData.data.listSections.items.map((section) => {
            const mediasSections =
                mediasSectionsData.data.listMediasSections.items.filter(
                    (mediasSection) => mediasSection.sectionID === section.id
                )
            const medias = mediasSections.map((mediasSection) =>
                mediasData.data.listMedias.items.find(
                    (media) => media.id === mediasSection.mediaID
                )
            )
            return {
                ...section,
                medias,
            }
        })
        return {
            statusCode: 200,
            body: list,
        }
    },
}

module.exports = SectionManager
