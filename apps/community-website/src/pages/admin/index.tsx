import React from 'react'
import { Admin, Resource } from 'react-admin'
import AdminLayout from '../../shared/admin/AdminLayout'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import LabelIcon from '@mui/icons-material/Label'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import { theme } from '../../shared/theme/admin'
import DataProvider from '../../shared/admin/DataProvider'
import VideoList from '../../shared/admin/Video/VideoList'
import VideoEdit from '../../shared/admin/Video/VideoEdit'
import VideoCreate from '../../shared/admin/Video/VideoCreate'
import SectionList from '../../shared/admin/Section/SectionList'
import SectionCreate from '../../shared/admin/Section/SectionCreate'
import SectionEdit from '../../shared/admin/Section/SectionEdit'
import LiveList from '../../shared/admin/Live/LiveList'
import LiveCreate from '../../shared/admin/Live/LiveCreate'
import LiveEdit from '../../shared/admin/Live/LiveEdit'
import Home from '../../shared/admin/Home'

const AdminMainPage = () => {
    if (!Admin || !Resource) return null
    return (
        <AdminLayout>
            <Admin dashboard={Home} dataProvider={DataProvider} theme={theme}>
                <Resource
                    name="Videos"
                    list={VideoList}
                    edit={VideoEdit}
                    create={VideoCreate}
                    icon={OndemandVideoIcon}
                />
                <Resource
                    name="Lives"
                    list={LiveList}
                    edit={LiveEdit}
                    create={LiveCreate}
                    icon={LiveTvIcon}
                />
                <Resource
                    name="Sections"
                    list={SectionList}
                    edit={SectionEdit}
                    create={SectionCreate}
                    icon={LabelIcon}
                />
            </Admin>
        </AdminLayout>
    )
}

export default AdminMainPage
