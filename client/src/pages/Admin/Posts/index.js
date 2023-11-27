import classNames from "classnames/bind";
import styles from '~/pages/Admin/Posts/Posts.module.scss';
import {
    DataGrid,
    gridClasses,
    GridToolbar,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import moment from "moment";
import { useEffect, useState } from "react";
import * as postServices from '~/services/postServices'
import * as adminServices from '~/services/adminServices'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import * as notifyServices from '~/services/notifyServices';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}
const PAGE_SIZE = 10;

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

function Posts() {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    const [dataPost, setDataPost] = useState([])


    useEffect(() => {
        async function fetchPosts() {
            const response = await postServices.apiGetAllPosts()
            setDataPost(response.result)
        }
        fetchPosts();
    }, [])

    const customSortComparator = (v1, v2, column) => {
        // Sắp xếp dựa trên độ dài của mảng
        return v1.length - v2.length;
    };

    const BanButton = ({ params }) => {
        const [banButton, setBanButton] = useState(false)

        useEffect(() => {
            if (params.row.isBanned === true) {
                setBanButton(true)
            }
        }, [params.row.isBanned])

        const handleBan = async () => {
            setBanButton(true)
            await adminServices.apiBanReport(params.row._id)

            const notify = {
                recipients: params.row.author._id,
                text: `have been banned your post. You can not share this post in public social anymore.`,
                image: params.row.images[0],
                type: 'image'
            }
            const noti = await notifyServices.apiCreateNotify(notify);
            socket.emit('notifyPublic', { notiId: noti.result._id, notification: noti.result });
        }
        const handleUnBan = async () => {
            setBanButton(false)
            await adminServices.apiUnBanReport(params.row._id)
        }
        return banButton ?
            <strong onClick={handleUnBan}>
                <Button
                    variant="outlined"
                    size="medium"
                    style={{ marginLeft: 16 }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    color="warning"
                >
                    Unban
                </Button>
            </strong>
            :
            <strong onClick={handleBan}>
                <Button
                    variant="contained"
                    size="medium"
                    style={{ marginLeft: 16 }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    color="error"
                >
                    Ban
                </Button>
            </strong>
    }

    const columnsBan = [
        {
            field: 'isBanned', headerName: '', width: 110,
            renderCell: (params) => <BanButton params={params} />,
        },
        {
            field: 'reports', headerName: 'Reports', width: 90,
            sortable: true,
            renderCell: params => params.row.reports.length,
            sortComparator: customSortComparator,
        },
        { field: 'mode', headerName: 'Privacy Settings', width: 120 },
        {
            field: 'avatar', headerName: '', width: 60,
            renderCell: params => <Avatar src={params.row.author.avatar} />,
            sortable: false, editable: false
        },
        {
            field: 'author', headerName: 'Author', width: 150,
            renderCell: params => params.row.author.name
        },
        { field: 'content', headerName: 'Content', width: 150 },
        {
            field: 'createdAt', headerName: 'Created At', width: 150,
            renderCell: params => moment(params.row.createdAt).format('HH:MM A DD/MM/YYYY ')
        },
        {
            field: 'likes', headerName: 'Likes', width: 90,
            sortable: true,
            renderCell: params => params.row.likes.length,
            sortComparator: customSortComparator,
        },
        {
            field: 'comments', headerName: 'Comments', width: 90,
            sortable: true,
            renderCell: params => params.row.comments.length,
            sortComparator: customSortComparator,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('accounts')}>
                <div className={cx('accountsTitle')}>
                    <span>Manage posts</span>
                </div>
            </div>
            <div className={cx('banUsers')}>
                <div className={cx('title')}>Manage reported posts</div>
                <StripedDataGrid
                    rows={dataPost}
                    columns={columnsBan}
                    loading={!dataPost}
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[PAGE_SIZE]}
                    slots={{
                        pagination: CustomPagination,
                        toolbar: GridToolbar
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    sx={{
                        boxShadow: 5,
                        border: 0,
                        borderColor: 'primary.light',
                        borderRadius: 3,
                        fontSize: 13,
                        p: 2,
                        mt: 1,
                        bgcolor: 'white',
                        color: 'rgb(62,51,65)',
                    }}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                />
            </div>
        </div>
    );
}

export default Posts;