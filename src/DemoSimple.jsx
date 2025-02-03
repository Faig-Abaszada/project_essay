import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        created_at: '2021-10-10',
        role: 'Admin',
        status: 'a',
        action: null
    },
    {
        id: 2,
        name: 'John Doe',
        created_at: '2021-10-11',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 3,
        name: 'Jane Smith',
        created_at: '2021-10-12',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 4,
        name: 'Alice Johnson',
        created_at: '2021-10-13',
        role: 'Admin',
        status: 'a',
        action: null
    },
    {
        id: 5,
        name: 'Bob Brown',
        created_at: '2021-10-14',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 6,
        name: 'Charlie Davis',
        created_at: '2021-10-15',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 7,
        name: 'Diana Evans',
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
        created_at: '2021-10-18',
        role: 'User',
        status: 'a',
        action: null
    },
    {
        id: 10,
        name: 'Grace Harris',
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
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.front_end_key]
                                        {column.front_end_key ? console.log(column.front_end_key) : console.log('no front end key')}
                                        return (
                                            <TableCell component="th" scope="row">
                                                {column.front_end_key === 'action' ? (
                                                    <div>
                                                        <button>Settings</button>
                                                        <button>Delete</button>
                                                    </div>
                                                ) : (
                                                    column.format ? column.format(value) : value
                                                )}
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
    );
}
