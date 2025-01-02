import React from 'react';
import './PostManager.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
const PostManager = ({post}) => {
    return (
        <div className='postmanagercontainer'>
            <div className='postmanagerbody'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Post Id</b></TableCell>
            <TableCell align="left"><b>Title</b></TableCell>
            <TableCell align="left"><b>Date</b></TableCell>
            <TableCell align="right"><b>Actions-Etc</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(post) ? post.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="right"><Button size="small" variant="outlined">Suspend</Button></TableCell>
              
            </TableRow>
          )): <div className='m-4'><b>No content</b></div>}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
    );
};

export default PostManager;