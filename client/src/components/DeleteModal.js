import * as React from 'react';
import { Backdrop, Box, Modal, Fade, Typography, IconButton, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ModalButton = styled(Button)({
  width: '80px',
  height: '40px', 
  border: '1px solid black'
});

export default function DeleteModal({id, setJhas}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteJha = () => {
    try {
      axios.delete(`http://localhost:5000/api/jhas/${id}`);
    } 
    catch (err) {console.log(err)} 
    finally {
      const getJhas = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/jhas');
          setJhas(res.data);
        } catch (err) {console.log(err)}
      };
      getJhas();
    }
  };

  return (
    <>
      <Tooltip title="Delete" onClick={handleOpen}>
        <IconButton>
            <DeleteIcon/>
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              This operation cannot be undone.
            </Typography>
            <Box display='flex' justifyContent='center' paddingTop={2}>
              <ModalButton variant='contained' sx={{backgroundColor: 'red', marginRight: '10px'}} onClick={() => deleteJha()}>Ok</ModalButton>
              <ModalButton variant='contained' sx={{backgroundColor: 'white', color: 'black'}} onClick={() => handleClose()}>Cancel</ModalButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
