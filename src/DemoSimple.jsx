// todo - pagination
// todo - delete zamani confirm etmek ucun modal acmaq
// todo - ad new user button ile modal acmaq ve yeni user yaratmaq
// todo - Responsive design
// todo - Export varsa etmek

import './assets/styles/components/tableToolbar.scss'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {TablePagination} from "@mui/material";
import Paper from '@mui/material/Paper';
import {TableFooter} from "@mui/material";
import {useState} from "react";

// for pagination custom
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const status = {
    a: { label: 'Active', value: 'a', bg_color: 'green' },
    s: { label: 'Suspended', value: 's', bg_color: 'red'},
    i: { label: 'Inactive', value: 'i', bg_color: 'gray'},

    getByValue(value) {
        return this[value] ? this[value] : null;
    },
    // (status.getByValue('a')); // { label: 'Active', value: 'a', bg_color: 'green' }

    getByLabel(label) {
        const entry = Object.values(this).find(status => status.label === label);
        return entry ? entry : null;
    },
    // (status.getByLabel('Suspended')); // { label: 'Suspended', value: 's', bg_color: 'red'},

    list() {
        return Object.values(this);
    }
    // (status.list()); // [{ value: 'a', label: 'Active' }, { value: 's', label: 'Suspended' }, { value: 'i', label: 'Inactive' }]
};

const rows = [
    {
        id: 1,
        name: 'Faik Abaszada',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-10',
        role: 'Admin',
        status: 'a',
        action: null
    },
    {
        id: 2,
        name: 'John Doe',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-11',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 3,
        name: 'Jane Smith',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-12',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 4,
        name: 'Alice Johnson',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-13',
        role: 'Admin',
        status: 'a',
        action: null
    },
    {
        id: 5,
        name: 'Bob Brown',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-14',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 6,
        name: 'Charlie Davis',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-15',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 7,
        name: 'Diana Evans',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-16',
        role: 'Admin',
        status: 'a',
        action: null
    },
    {
        id: 8,
        name: 'Eve Foster',
        created_at: '2021-10-17',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 9,
        name: 'Frank Green',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-18',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 10,
        name: 'Grace Harris',
        avatar: 'https://robohash.org/RandomUser.png',
        created_at: '2021-10-19',
        role: 'Admin',
        status: 'a',
        action: null
    }
]
const columns = [
    {
        front_end_key: 'id',
        back_end_key: 'id',
        name: 'ID',
        format: (value) => {
            return value  + '55';
        }
    },
    {
        front_end_key: 'name',
        back_end_key: 'name',
        name: 'Name',
        format: (value) => {
            return value;
        }
    },
    {
        front_end_key: 'created_at',
        back_end_key: 'date_created',
        name: 'Date Created',
        format: (value) => {
            return value;
        }
    },
    {
        front_end_key: 'role',
        back_end_key: 'role',
        name: 'Role',
        format: (value) => {
            return value;
        }
    },
    {
        front_end_key: 'status',
        back_end_key: 'status',
        name: 'Status',
        format: (value) => {
            return <div>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: status.getByValue(value).bg_color }}>
                </span>
                {status.getByValue(value).label}
            </div>
        }
    },
    {
        front_end_key: 'action',
        back_end_key: 'action',
        name: 'Action',
        format: (value) => {
            return value;
        }
    }

];


export default function BasicTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
       <>
           <div className="report-page">
               <div className="table-toolbar">
                   <Button variant="contained" size="medium">
                       Create new user
                   </Button>
                   <Button variant="outlined" className="btn btn-outlined" startIcon={<ContentCopyIcon/>}>
                       Duplicate
                   </Button>
                   <Button variant="outlined" className="btn btn-outlined" startIcon={<DeleteIcon/>}>
                       Delete
                   </Button>
                   <Button variant="outlined" className="btn btn-outlined btn-outlined--export" startIcon={<FileDownloadIcon/>}>
                       Export
                   </Button>
               </div>
               <TableContainer component={Paper}>
                   <Table sx={{minWidth: 650}} aria-label="simple table">
                       <TableHead>
                           <TableRow>
                               {
                                   columns.map((column) => {
                                       return (
                                           <TableCell key={column.front_end_key}>{column.name}</TableCell>
                                       )
                                   })
                               }
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {rows.map((row) => {
                               return (
                                   <TableRow
                                       key={row.id}
                                       sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                   >
                                       {columns.map((column) => {
                                           const value = row[column.front_end_key]
                                           {
                                               column.front_end_key ? console.log(column.front_end_key) : console.log('no front end key')
                                           }
                                           return (
                                               <TableCell component="th" scope="row">
                                                   {
                                                       column.front_end_key === 'action' ? (
                                                       <div>
                                                           <IconButton aria-label="delete">
                                                               <MoreHorizIcon/>
                                                           </IconButton>
                                                           <IconButton aria-label="delete">
                                                               <DeleteIcon/>
                                                           </IconButton>
                                                       </div>
                                                   ) : column.front_end_key === 'name' ? (
                                                           <div className="avatar_wrapper">
                                                               <img className="avatar" src={row.avatar} alt="avatar"/>
                                                                <span>{value}</span>
                                                           </div>
                                                       ) : (column.format ? column.format(value) : value)
                                                   }
                                               </TableCell>
                                           )
                                       })}
                                   </TableRow>
                               )
                           })
                           }

                       </TableBody>
                   </Table>
               </TableContainer>
               <Stack spacing={2}>
                   <Pagination
                       count={10}
                       renderItem={(item) => (
                           <PaginationItem
                               slots={{previous: 'ArrowBackIcon', next: 'ArrowForwardIcon'}}
                               {...item}
                           />
                       )}
                   />
               </Stack>
           </div>
       </>
    );
}
