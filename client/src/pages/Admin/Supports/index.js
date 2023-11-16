import classNames from "classnames/bind";
import styles from '~/pages/Admin/Supports/Supports.module.scss';
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
import { Avatar } from '@mui/material';
import moment from "moment";
import * as adminServices from '~/services/adminServices'
import { createPortal } from "react-dom";
import { ModalResponseProblem } from "~/components";

const cx = classNames.bind(styles);
const PAGE_SIZE = 10;

const ODD_OPACITY = 0.2;
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
function Supports() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const [dataReport, setDataReport] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    useEffect(() => {
        async function fetchReports() {
            const response = await adminServices.apiGetAllReports()
            setDataReport(response.result)
        }
        fetchReports();
    }, [])

    const columnsBan = [
        {
            field: 'isResponsed', headerName: 'Is Responsed', width: 120, type: 'boolean'
        },
        {
            field: 'avatar', headerName: '', width: 60,
            renderCell: params => <Avatar src={params.row.useSend.avatar} />,
            sortable: false, editable: false
        },
        {
            field: 'userSend', headerName: 'User', width: 200,
            renderCell: params => params.row.useSend.name
        },
        { field: 'content', headerName: 'Problem', width: 320 },
        {
            field: 'createdAt', headerName: 'Created At', width: 150,
            renderCell: params => moment(params.row.createdAt).format('HH:MM A DD/MM/YYYY ')
        },
    ];
    const handleRowClick = (params) => {
        setIsModalOpen(true);
        setSelectedRowData(params.row);
    };

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
                    rows={dataReport}
                    columns={columnsBan}
                    loading={!dataReport}
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
                    onRowClick={handleRowClick}
                />
                {isModalOpen && createPortal(
                    <ModalResponseProblem report={selectedRowData} onClose={() => setIsModalOpen(false)} />,
                    document.body
                )}
            </div>
        </div>
    );
}

export default Supports;