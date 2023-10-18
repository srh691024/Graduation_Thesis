import classNames from "classnames/bind";
import styles from '~/pages/Admin/Posts/Posts.module.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

const cx = classNames.bind(styles);
function Posts() {
    const columns = [
        { field: 'id', headerName: 'No', width: 20 },
        {
            field: 'avatar',
            headerName: '',
            width: 150,
            editable: false,
        },
        {
            field: 'author',
            headerName: 'AUTHOR',
            width: 150,
            editable: false,
        },
        {
            field: 'couple',
            headerName: 'COUPLE',
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
            field: 'reported',
            headerName: 'REPORTED (times)',
            with: 50,
            editable: false,
        },
        {
            field: 'publicStatus',
            headerName: 'PUBLIC STATUS',
            width: 100,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'avatar',
            headerName: '',
            width: 150,
            editable: false,
        },
        {
            field: 'author',
            headerName: 'AUTHOR',
            width: 150,
            editable: false,
        },
        {
            field: 'couple',
            headerName: 'COUPLE',
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
        { id: 1, reported: '1', publicStatus: 'false', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 2, reported: '122', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 3, reported: '2', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 4, reported: '1', publicStatus: 'false', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 5, reported: '65', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 6, reported: '7', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 7, reported: '3', publicStatus: 'false', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 8, reported: '2', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 9, reported: '1', publicStatus: 'false', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 10, reported: '77', publicStatus: 'true', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 11, reported: '90', publicStatus: 'false', avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },

    ];
    const rows = [
        { id: 1, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 2, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 3, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 4, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 5, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 6, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 7, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 8, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 9, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 10, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
        { id: 11, avatar: 'Knsa', author: 'hakuhanzi@gmail.com', couple: 'Connected', content: '10 days', image: 'Image' },
    ];

    const handleSave = (id) => {
        // Handle delete action here
        console.log('Save item with ID:', id);
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
                <div className={cx('title')}>All public posts</div>
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

export default Posts;