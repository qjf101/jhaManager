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

export default function CreateJHA({editJha, setTab}) {
  const tempJHA = {
    site: '',
    dept: '',
    ap: '',
    br: '',
    job: '',
    supervisor: '',
    prepared: '',
    date: '',
    steps: [{s: 'add task/step', h: ['add a hazard and consequence'], c: ['add a control']}],
    training: ['add required training'],
    ppe: ['add required PPE']
  };

  const [jha, setJha] = useState();
  const [site, setSite] = useState('');
  const [dept, setDept] = useState('');
  const [ap, setAp] = useState('');
  const [br, setBr] = useState('');
  const [job, setJob] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [prepared, setPrepared] = useState('');
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState(tempJHA.steps);
  const [training, setTraining] = useState();
  const [ppe, setPpe] = useState();

  const getJha = () => {
    //if Jha exists
    if (editJha) {
      const getJha = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/jhas/${editJha}`);
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
    } else {
      setJha(tempJHA);
      setSite(tempJHA.site);
      setDept(tempJHA.dept);
      setAp(tempJHA.ap);
      setBr(tempJHA.br);
      setJob(tempJHA.job);
      setSupervisor(tempJHA.supervisor);
      setPrepared(tempJHA.prepared);
      setDate(tempJHA.date);
      setSteps(tempJHA.steps);
      setTraining(tempJHA.training);
      setPpe(tempJHA.ppe);
    }
  };
  
  useEffect(() => {
    getJha();
  }, []);

  const TableHeadings = styled(Typography)({
    fontWeight: 'bold'
  });

  const CellInput = (title, value, state) => {
    return (
      <Box sx={{display: 'flex', textAlign: 'center'}}>
      <TableHeadings variant="subtitle2" sx={{alignItems:'center', paddingRight:'10px', minWidth:'max-content'}}>
        {title}
      </TableHeadings>
      <TextField id="outlined-basic" variant="outlined" size="small" fullWidth onChange={(e) => state(e.target.value)} value={value} />
      </Box>
    )
  };

  function createData(
    c1,
    c2
  ) {
    return { c1, c2 };
  }
  
  const rows = [
    createData(CellInput('Site:', site, setSite), CellInput('Department:', dept, setDept)),
    createData(CellInput('Activity or Process:', ap, setAp), CellInput('Building/Room:', br, setBr)),
    createData(CellInput('Job Title:', job, setJob), CellInput('Supervisor:', supervisor, setSupervisor)),
    createData(CellInput('Prepared By:', prepared, setPrepared), CellInput('Date:', date, setDate))
  ];

  const addListItem = (list, step) => {
    const newSteps = [...steps];
    steps[step][list].push(tempJHA.steps[step][list][0]);
    setSteps(newSteps);
  };

  const removeItem = (list, step) => {
    const newSteps = [...steps];
    newSteps[step][list].pop();
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, tempJHA.steps[0]])
  };

  const removeStep = () => {
    setSteps([...steps].splice(0, steps.length-1))
  };

  const updateSteps = (step, item, v) => {
    const newSteps = [...steps];
    if (item === 's') {
      newSteps[step]['s'] = v;
      setSteps(newSteps);
    } else {
      newSteps[step][item] = v;
      setSteps(newSteps);
    }
  };

  const updateJha = async (savedJHA) => {
    try {
      axios.put(`http://localhost:5000/api/jhas/${editJha}`, savedJHA);
      console.log(`jha: ${editJha} updated`)
    } catch (err) {
      console.log(err)
    }
  };

  const createJha = async (savedJHA) => {
    try {
      axios.post(`http://localhost:5000/api/jhas`, savedJHA);
      console.log(`jha created`)
    } catch (err) {
      console.log(err)
    }
  };

  const save = () => {
    const savedJHA = {
      site,
      dept,
      ap,
      br,
      job,
      supervisor,
      prepared,
      date,
      steps: JSON.stringify(steps),
      training: JSON.stringify(training),
      ppe: JSON.stringify(ppe)
    };

    if (editJha) {
      updateJha(savedJHA)
    } else {
      createJha(savedJHA)
    };

    setTab(1);
  };

  return (
    <Box margin={4}>
        <Typography variant="subtitle1" align='left'>
            Create/Edit JHA
        </Typography>
        <Divider />
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
        { jha ?
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
                    <Tooltip title="Remove Step" onClick={removeStep} sx={{position: 'absolute', top: '-7%', left: '-2%'}}>
                      <IconButton>
                          <DisabledByDefaultIcon sx={{color:'red'}}/>
                      </IconButton>
                    </Tooltip>
                    }
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '25px'}}>
                    <p style={{paddingRight: '10px'}}>{i+1+'.'}</p>
                    <TextField id="outlined-basic" variant="outlined" size="small" fullWidth onChange={(e) => updateSteps(i, 's', e.target.value)} value={steps[i]['s']}/>
                    </div>
                </StyledTableCell>
                <StyledTableCell align="center"><InputList listItems={steps[i]['h']} removeItem={() => removeItem('h', i)} updateSteps={updateSteps} step={i} item={'h'}/><Button onClick={() => addListItem('h', i)} variant="contained">Add Hazard</Button></StyledTableCell>
                <TableCell align="center"><InputList listItems={steps[i]['c']} removeItem={() => removeItem('c', i)} updateSteps={updateSteps} step={i} item={'c'}/><Button onClick={() => addListItem('c', i)} variant="contained">Add Control</Button></TableCell>
                </TableRow>
            ))}
              <TableRow>
                <TableCell align='left'>
                  <Button variant="contained" endIcon={<AddBoxIcon/>} size='small' onClick={() => addStep()}>Add Job Step</Button>
                </TableCell>
              </TableRow>
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
                <StyledTableCell align="center"><InputList listItems={training} removeItem={() => setTraining([...training].splice(0, training.length-1))} setTraining={setTraining} item='t'/><Button onClick={() => setTraining([...training, tempJHA.training])} variant="contained">Add Training</Button></StyledTableCell>
                <TableCell align="center"><InputList listItems={ppe} removeItem={() => setPpe([...ppe].splice(0, ppe.length-1))} setPpe={setPpe} item='p'/><Button onClick={() => setPpe([...ppe, tempJHA.ppe])} variant="contained">Add PPE</Button></TableCell>
              </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        </>
         :
         <></>
         }
        <Box display='flex' alignItems='flex-start' paddingTop='10px'>
          <Button variant='contained' sx={{backgroundColor:'green', ':hover' : {backgroundColor: 'grey !important'}}} onClick={() => save()}>save</Button>
        </Box>
    </Box>
  );
}
