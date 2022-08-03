import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider, IconButton,Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import styled from '@emotion/styled';
import DeleteModal from './DeleteModal';
import axios from "axios";

const StyledTableCell = styled(TableCell)({
    borderRight: '1px solid black'
})

export default function JhaTable({setEditJha, setTab, setViewJha}) {
    const [jhas, setJhas] = useState([]);

    useEffect(() => {
        const getJhas = async () => {
          try {
            const res = await axios.get('http://localhost:5000/api/jhas');
            setJhas(res.data);
          } catch (err) {console.log(err)}
        };
        getJhas();
    }, []);

    const handleEdit = (id) => {
        setEditJha(id)
        setTab(0)
    };

    const Actions = ({id}) => {
        return (
            <div>
                <Tooltip title="View">
                    <IconButton onClick={() => setViewJha(id)}>
                        <PreviewIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(id)}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <DeleteModal id={id} setJhas={setJhas}/>
            </div>
        )
    };

  return (
    <Box margin={4}>
        <Typography variant="subtitle1" align='left'>
            View All JHAs
        </Typography>
        <Divider />
        <Divider sx={{marginTop:1}}/>
        <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <StyledTableCell align='center'>Job</StyledTableCell>
                <StyledTableCell align="center">Dept</StyledTableCell>
                <StyledTableCell align="center">Author</StyledTableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {jhas.map((jha) => (
                <TableRow
                key={jha.job}
                >
                <StyledTableCell component="th" scope="row">
                    {jha.job}
                </StyledTableCell>
                <StyledTableCell align="center">{jha.dept}</StyledTableCell>
                <StyledTableCell align="center">{jha.prepared}</StyledTableCell>
                <TableCell align="center"><Actions id={jha.id}/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
