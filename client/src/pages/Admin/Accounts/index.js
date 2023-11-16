import classNames from "classnames/bind";
import styles from '~/pages/Admin/Accounts/Accounts.module.scss';
import {
    DataGrid,
    gridClasses,
    GridToolbar,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import * as authServices from '~/services/authServices'
import * as adminServices from '~/services/adminServices';

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
const ODD_OPACITY = 0.2;
const PAGE_SIZE = 10;

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
function Accounts() {
    const [dataPost, setDataPost] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    useEffect(() => {
        async function fetchAccounts() {
            const response = await authServices.apiGetAllUsers()
            setDataPost(response.result)
        }
        fetchAccounts()
    }, [])


    const customSortComparator = (v1, v2, column) => {
        // Sắp xếp dựa trên độ dài của mảng
        return v1.length - v2.length;
    };
    const BanButton = ({ params }) => {
        const [banButton, setBanButton] = useState(false)

        useEffect(() => {
            if (params.row.isBlocked === true) {
                setBanButton(true)
            }
        }, [params.row.isBlocked])

        const handleBan = async () => {
            setBanButton(true)
            const response = await adminServices.apiBanAccount(params.row._id)
            console.log(response.result)
        }
        const handleUnBan = async () => {
            setBanButton(false)
            const response = await adminServices.apiUnBanAccount(params.row._id)
            console.log(response.result)
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
            field: 'isBlocked', headerName: '', width: 110,
            renderCell: (params) => <BanButton params={params} />,
        },
        {
            field: 'reports', headerName: 'Reports', width: 90,
            sortable: true,
            renderCell: params => params.row.reports.length,
            sortComparator: customSortComparator,
        },
        {
            field: 'avatar', headerName: '', width: 60,
            renderCell: params => <Avatar src={params.row.avatar} />,
            sortable: false, editable: false
        },
        {
            field: 'name', headerName: 'Name', width: 150,
            renderCell: params => params.row.name
        },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 }
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('accounts')}>
                <div className={cx('accountsTitle')}>
                    <span>Manage users</span>
                </div>
            </div>
            <div className={cx('banUsers')}>
                <div className={cx('title')}>Manage reported accounts</div>
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

export default Accounts;