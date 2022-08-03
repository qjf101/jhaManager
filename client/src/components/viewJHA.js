import * as React from 'react';
import { useState, useEffect } from 'react';
import {Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, TextField, Button, IconButton, Tooltip} from '@mui/material';
import styled from '@emotion/styled';
import InputList from './InputList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from "axios";

const StyledTableCell = styled(TableCell)({
  borderRight: '1px solid black',
  position: 'relative'
});

export default function ViewJHA({viewJha}) {
  const [jha, setJha] = useState(null);
  const [site, setSite] = useState('');
  const [dept, setDept] = useState('');
  const [ap, setAp] = useState('');
  const [br, setBr] = useState('');
  const [job, setJob] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [prepared, setPrepared] = useState('');
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState();
  const [training, setTraining] = useState();
  const [ppe, setPpe] = useState();

  useEffect(() => {
    const getJha = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/jhas/${viewJha}`);
            const prevJHA = res.data;
            setJha(prevJHA);
            setSite(prevJHA.site);
            setDept(prevJHA.dept);
            setAp(prevJHA.ap);
            setBr(prevJHA.br);
            setJob(prevJHA.job);
            setSupervisor(prevJHA.supervisor);
            setPrepared(prevJHA.prepared);
            setDate(prevJHA.date);
            setSteps(JSON.parse(prevJHA.steps));
            setTraining(JSON.parse(prevJHA.training));
            setPpe(JSON.parse(prevJHA.ppe));
        } catch (err) {console.log(err)}
    };
    getJha();
  }, []);

  const TableHeadings = styled(Typography)({
    fontWeight: 'bold'
  });

  const CellInput = (title, value) => {
    return (
      <Box sx={{display: 'flex', textAlign: 'center'}}>
      <TableHeadings sx={{paddingRight: '5px', lineHeight: '1.75'}}>{title}</TableHeadings>
      <Typography variant="subtitle1" sx={{alignItems:'center', paddingRight:'10px', minWidth:'max-content'}}>
        {value}
      </Typography>
      </Box>
    )
  };

  function createData(
    c1,
    c2
  ) {
    return { c1, c2 };
  }
  
  const rows = jha ? [
    createData(CellInput('Site: ', jha.site), CellInput('Department: ', jha.dept)),
    createData(CellInput('Activity or Process: ', jha.ap), CellInput('Building/Room: ', jha.br)),
    createData(CellInput('Job Title: ', jha.job), CellInput('Supervisor: ', jha.supervisor)),
    createData(CellInput('Prepared By: ', jha.prepared), CellInput('Date: ', jha.date))
  ]: [];

  return (
    <>
    { jha ?
    <Box margin={4}>
        <Typography variant="subtitle1" align='left'>
            Job Hazard Analysis
        </Typography>
        <Divider/>
        <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableBody>
            {rows.map((row, i) => (
                <TableRow
                key={i}
                >
                <StyledTableCell component="th" scope="row">
                    {row.c1}
                </StyledTableCell>
                <TableCell align="center">{row.c2}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <>
        <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <StyledTableCell align='center'><TableHeadings>Tasks/Steps</TableHeadings></StyledTableCell>
                <StyledTableCell align="center"><TableHeadings>Hazards - Consequences</TableHeadings></StyledTableCell>
                <TableCell align="center"><TableHeadings>Controls (safeguards)</TableHeadings></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {steps.map((step, i) => (
                <TableRow
                key={i}
                >
                <StyledTableCell>
                    { !i ?
                    <></> :
                    <Tooltip title="Remove Step" sx={{position: 'absolute', top: '-7%', left: '-2%'}}>
                      <IconButton>
                          <DisabledByDefaultIcon sx={{color:'red'}}/>
                      </IconButton>
                    </Tooltip>
                    }
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography variant="subtitle1" sx={{alignItems:'center', paddingRight:'10px', minWidth:'max-content'}}>
                        {i+1+'. '+steps[i]['s']}
                    </Typography>
                    </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                    <ul>
                        { steps[i]['h'].map ((hazard, j) => {
                            return (
                                <li key={j} style={{fontSize: '16px'}}>{hazard}</li>
                            )
                        })
                        }
                    </ul>                    
                </StyledTableCell>
                <TableCell align="left">
                    <ul>
                        { steps[i]['c'].map ((control, j) => {
                            return (
                                <li key={j} style={{fontSize: '16px'}}>{control}</li>
                            )
                        })
                        }
                    </ul>   
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                <StyledTableCell><TableHeadings>Required Training</TableHeadings></StyledTableCell>
                <TableCell><TableHeadings>Required PPE</TableHeadings></TableCell>
                </TableRow>
                <TableRow>
                <StyledTableCell align="left">
                    <ul>
                        { training.map ((t, j) => {
                            return (
                                <li key={j} style={{fontSize: '16px'}}>{t}</li>
                            )
                        })
                        }
                    </ul>   
                </StyledTableCell>
                <TableCell align="left">
                    <ul>
                        { ppe.map ((p, j) => {
                            return (
                                <li key={j} style={{fontSize: '16px'}}>{p}</li>
                            )
                        })
                        }
                    </ul>   
                </TableCell>
              </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        </>
    </Box>
    :
    <></>
    }
    </>
  );
}
