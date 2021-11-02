import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import Layout from '../shared/components/Layout'
import { fetchThumbnail, fetchVodFiles } from '../shared/api'
import { VideoOnDemand, Thumbnail } from '../models'
import VideoCard from '../shared/components/Card/VideoCard'

const StyledSearchItem = styled.div`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 50px;
    position: relative;
    height: 42px;
    width: 300px;
    padding: 10px;

    table {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
`

const StyledSearchInput = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    padding: 0 5px;
    border-radius: 50px;
    font-size: 18px;
    background: none;

    &:focus {
        outline: none;
    }
`

const StyledSearch = styled.td`
    & svg {
        color: ${(props) => props.theme.palette.primary.main};
        font-size: 26px;
    }
`

const StyledVideoList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 10px;
    margin-bottom: 50px;
    flex-wrap: wrap;
`

const StyledVideoCard = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

type VideoItemProps = {
    asset: VideoOnDemand
}

const VideoItem = ({ vod }: VideoItemProps) => {
    const [thumbnail, setThumbnail] =
        useState<
            | {
                  obj: Thumbnail
                  url: string
              }
            | undefined
        >(undefined)

    useEffect(() => {
        ;(async () => {
            try {
                if (vod.media?.thumbnail) {
                    const data = await fetchThumbnail(vod.media)
                    setThumbnail({
                        obj: vod.media?.thumbnail,
                        url: data as string,
                    })
                }
            } catch (error) {
                console.error('search.tsx(fetchThumbnail):')
            }
        })()
    }, [vod])

    return (
        <StyledVideoCard>
            <VideoCard video={{ vod, thumbnail }} />
        </StyledVideoCard>
    )
}

const SearchPage = () => {
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')

    const filterAssets = (elem: VideoOnDemand) =>
        elem.media?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.media?.description
            .toLowerCase()
            .includes(searchValue.toLowerCase())

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodFiles(nextToken)
                setNextToken(
                    data?.listVideoOnDemands?.nextToken
                        ? data.listVideoOnDemands.nextToken
                        : null
                )
                setVodAssets(
                    data?.listVideoOnDemands?.items as Array<VideoOnDemand>
                )
            } catch (error) {
                console.error('search.tsx(fetchVodFiles):', error)
            }
        })()
    }, [nextToken])

    return (
        <Layout>
            <StyledSearchItem>
                <table>
                    <tr>
                        <StyledSearch>
                            <StyledSearchInput
                                type="text"
                                placeholder="Search.."
                                name="search"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </StyledSearch>
                        <StyledSearch>
                            <AiOutlineSearch />
                        </StyledSearch>
                    </tr>
                </table>
            </StyledSearchItem>
            <StyledVideoList>
                {vodAssets
                    .filter(filterAssets)
                    .map((elem: VideoOnDemand, key) => {
                        return <VideoItem vod={elem} key={key} />
                    })}
            </StyledVideoList>
        </Layout>
    )
}

export default SearchPage
