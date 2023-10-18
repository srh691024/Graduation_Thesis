import classNames from "classnames/bind";
import styles from '~/pages/Admin/Accounts/Accounts.module.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

const cx = classNames.bind(styles);
function Accounts() {
    const columns = [
        { field: 'id', headerName: 'No', width: 20 },
        {
            field: 'avatar',
            headerName: 'AVATAR',
            with: 50,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'NAME',
            width: 150,
            editable: false,
        },
        {
            field: 'username',
            headerName: 'USERNAME',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            width: 150,
            editable: false,
        },
        {
            field: 'coupleStatus',
            headerName: 'COUPLE STATUS',
            width: 150,
            editable: false,
        },
        {
            field: 'createdAt',
            headerName: 'CREATED DATE',
            width: 150,
            editable: false,
        },
    ];
    const columnsBan = [
        { field: 'id', headerName: 'No', width: 20 },
        {
            field: 'reported',
            headerName: 'REPORTED (times)',
            with: 50,
            editable: false,
        },
        {
            field: 'avatar',
            headerName: '',
            width: 150,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'NAME',
            width: 150,
            editable: false,
        },
        {
            field: 'username',
            headerName: 'USERNAME',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            width: 150,
            editable: false,
        },
        {
            field: 'select',
            headerName: 'Ban Status',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.row.select}
                    onChange={(e) => handleSelectChange(params.id, e.target.value)}
                >
                    <option value="None">None</option>
                    <option value="10d">10 days</option>
                    <option value="3m">3 months</option>
                    <option value="per">Permanent</option>
                </select>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <IconButton
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => handleSave(params.row.id)}
                >
                    <SaveIcon
                        sx={{
                            fontSize: 20,
                            color: 'rgb(254, 110, 145)'
                        }}
                    />
                </IconButton>
            ),
        },
    ];

    const rowsBan = [
        { id: 1, reported: '1', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '10 days' },
        { id: 2, reported: '3', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '3 months' },
        { id: 3, reported: '23', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '10 days' },
        { id: 4, reported: '16', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '10 days' },
        { id: 5, reported: '5', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '10 days' },
        { id: 6, reported: '2', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: '10 days' },
        { id: 7, reported: '2', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: 'Permanent' },
        { id: 8, reported: '44', avatar: 'Snow', name: 'Knsa', username: 'hakuhanzi@gmail.com', email: 'Connected', action: 'Permanent' },
    ];
    const rows = [
        { id: 1, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 2, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 3, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 4, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 5, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 6, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 7, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 8, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
        { id: 9, avatar: '1', name: 'Snow', username: 'Knsa', email: 'hakuhanzi@gmail.com', coupleStatus: 'Connected', createdAt: 'ban' },
    ];
    const handleSelectChange = (id, value) => {
        // Handle select element change here
        console.log('Select element changed for ID:', id, 'with value:', value);
    };
    const handleSave = (id) => {
        // Handle delete action here
        console.log('Save item with ID:', id);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('accounts')}>
                <div className={cx('accountsTitle')}>
                    <span>Manage users</span>
                </div>
            </div>
            <div className={cx('banUsers')}>
                <div className={cx('title')}>Manage reported user accounts</div>
                <DataGrid
                    rows={rowsBan}
                    columns={columnsBan}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    // disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25]}

                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
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
                />
            </div>
            <div className={cx('allUsers')}>
                <div className={cx('title')}>All user accounts</div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25]}

                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
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
                />
            </div>
        </div>
    );
}

export default Accounts;