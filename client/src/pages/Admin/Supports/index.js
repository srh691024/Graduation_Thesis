import classNames from "classnames/bind";
import styles from '~/pages/Admin/Supports/Supports.module.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

const cx = classNames.bind(styles);
function Supports() {
    const columns = [
        { field: 'id', headerName: 'No', width: 20 },
        {
            field: 'status',
            headerName: 'STATUS',
            width: 150,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'TYPE',
            width: 150,
            editable: false,
        },
        {
            field: 'avatar',
            headerName: '',
            width: 150,
            editable: false,
        },
        {
            field: 'user',
            headerName: 'USER',
            width: 150,
            editable: false,
        },
        {
            field: 'content',
            headerName: 'CONTENT',
            width: 150,
            editable: false,
        },
        {
            field: 'image',
            headerName: 'IMAGE',
            width: 150,
            editable: false,
        },
    ];
    const columnsBan = [
        { field: 'id', headerName: 'No', width: 20 },
        {
            field: 'status',
            headerName: 'STATUS',
            with: 50,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'TYPE',
            width: 100,
            editable: true,
        },
        {
            field: 'avatar',
            headerName: '',
            width: 150,
            editable: false,
        },
        {
            field: 'user',
            headerName: 'USER',
            width: 150,
            editable: false,
        },
        {
            field: 'content',
            headerName: 'CONTENT',
            width: 150,
            editable: false,
        },
        {
            field: 'image',
            headerName: 'IMAGE',
            width: 150,
            editable: false,
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <IconButton
                    color="secondary"
                    aria-label="Save"
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
        { id: 1, status: 'Not yet', type: 'false', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 2, status: 'Not yet', type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 3,status: 'Not yet', type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 4, status: 'Not yet', type: 'false', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 5, status: 'Not yet',  type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 6, status: 'Not yet', type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 7, status: 'Not yet', type: 'false', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 8, status: 'Not yet', type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 9, status: 'Not yet', type: 'false', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 10, status: 'Not yet',  type: 'true', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 11, status: 'Not yet',  type: 'false', avatar: 'Knsa', user: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },

    ];
    const rows = [
        { id: 1, status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
        { id: 2,status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
        { id: 3,status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
        { id: 4,status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
        { id: 5,status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
        { id: 6,status: 'Done', type: 'Knsa', avatar: 'hakuhanzi@gmail.com', user: 'Connected', content: '10 days', image: 'Image' },
    ];

    const handleSave = (id) => {
        // Handle delete action here
        console.log('Save item with ID:', id);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('accounts')}>
                <div className={cx('accountsTitle')}>
                    <span>Supports</span>
                </div>
            </div>
            <div className={cx('banUsers')}>
                <div className={cx('title')}></div>
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
                <div className={cx('title')}>Problem solved</div>
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

export default Supports;