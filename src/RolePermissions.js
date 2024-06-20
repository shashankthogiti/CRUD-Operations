import React, { useState } from 'react';
import {
  Button, Dialog, DialogContent, DialogActions, Container, Box, Typography, TextField, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Hidden
} from '@mui/material';

const roles = [
  { name: 'User Management' },
  { name: 'Content Management' },
  { name: 'Disputes Management' },
  { name: 'Database Management' },
  { name: 'Financial Management' },
  { name: 'API Control' },
  { name: 'Repository Management' },
  { name: 'Payroll' }
];

const RolePermissions = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckAll = (event) => {
    const newChecked = {};
    roles.forEach(role => {
      newChecked[role.name] = {
        create: event.target.checked,
        read: event.target.checked,
        update: event.target.checked,
        delete: event.target.checked,
        additional: event.target.checked,
      };
    });
    setChecked(newChecked);
  };

  const handleCheck = (role, permission) => (event) => {
    if (permission === 'additional') {
      setChecked({
        ...checked,
        [role]: {
          create: event.target.checked,
          read: event.target.checked,
          update: event.target.checked,
          delete: event.target.checked,
          additional: event.target.checked,
        }
      });
    } else {
      setChecked({
        ...checked,
        [role]: {
          ...checked[role],
          [permission]: event.target.checked,
        }
      });
    }
  };

  const handleSubmit = () => {
    console.log('Selected Permissions:', checked);
    setChecked({}); // Reset the checkboxes
    handleClose();
  };

  const handleCancel = () => {
    setChecked({});
    handleClose();
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Role
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <Container>
            <Box textAlign="center" mb={2}>
              <Typography variant="h4">Edit Role</Typography>
              <Typography variant="h5">Set Role Permission</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Role Name</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Administrator"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Box mt={4}>
              <Typography variant="h6">Role Permissions</Typography>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Administrator Access</Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleCheckAll} />}
                    label="Select All"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {filteredRoles.map((role) => (
                  <Grid item xs={12} key={role.name}>
                    <Paper variant="outlined">
                      <Box p={2}>
                        <Grid container>
                          <Hidden smDown>
                            <Grid item xs={4}>
                              <Typography variant="subtitle1">{role.name}</Typography>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} sm={8}>
                            <Hidden smUp>
                              <Typography variant="subtitle1">{role.name}</Typography>
                            </Hidden>
                            <FormGroup row style={{ marginBottom: 0 }}>
                              <Grid item xs={6} sm={2} style={{ paddingRight: 8 }}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked[role.name]?.create || false} onChange={handleCheck(role.name, 'create')} />}
                                  label="Create"
                                />
                              </Grid>
                              <Grid item xs={6} sm={2} style={{ paddingRight: 8 }}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked[role.name]?.read || false} onChange={handleCheck(role.name, 'read')} />}
                                  label="Read"
                                />
                              </Grid>
                              <Grid item xs={6} sm={2} style={{ paddingRight: 8 }}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked[role.name]?.update || false} onChange={handleCheck(role.name, 'update')} />}
                                  label="Update"
                                />
                              </Grid>
                              <Grid item xs={6} sm={2} style={{ paddingRight: 8 }}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked[role.name]?.delete || false} onChange={handleCheck(role.name, 'delete')} />}
                                  label="Delete"
                                />
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked[role.name]?.additional || false} onChange={handleCheck(role.name, 'additional')} />}
                                  label="select Row"
                                />
                              </Grid>
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '8px' }}>
                  Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RolePermissions;
