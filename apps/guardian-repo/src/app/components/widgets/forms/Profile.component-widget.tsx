import { Paper, Button, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { useOnMount } from '@shared-hooks';

import guardianService from '../../../providers/api/users/guardian/guardian.service';
import VerifyGuardianEmailDialog from '../../dialogs/verify-guardian-email/VerifyGuardianEmail.component-dialog';
import ClaimStudentDialog from '../../dialogs/claim-student/ClaimStudent.component-dialog';
import SignupStudentDialog from '../../dialogs/guardian-signup-student.component-dialog.tsx/SignupStudent.component-dialog';
import { IUserProfile } from '../../../providers/api/users/guardian/response/user-profile.response';

type GuardianProfileProps = unknown;

const initialValues: IUserProfile = {
  uid: '',
  name: '',
  email: '',
  phone: '',
  students: [],
};

const GuardianProfile: FC<GuardianProfileProps> = (
  _props
): React.JSX.Element => {
  const [profile, setProfile] = useState<typeof initialValues>(initialValues);

  useOnMount(() => {
    const apiRequest = async () => {
      const { data: userProfile } = await guardianService.userProfile();
      setProfile(userProfile);
    };

    apiRequest();
  });

  return (
    <Paper
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Typography textAlign={'center'} variant="h1" component="h1">
        {'Guardian Profile'}
      </Typography>
      <Paper
        sx={{
          maxWidth: 700,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={profile.name}
          margin="normal"
          id="name"
          name="name"
          label="Name"
        />
      </Paper>
      <Paper
        sx={{
          maxWidth: 700,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={profile.email}
          margin="normal"
          id="email"
          name="email"
          label="Email"
        />
        <VerifyGuardianEmailDialog
          email={profile.email}
          render={(openDialog) => (
            <Button
              type="button"
              onClick={openDialog}
              variant="contained"
              sx={{ p: 2, m: 2, minWidth: 'fit-content' }}
            >
              {'Verify email'}
            </Button>
          )}
        />
      </Paper>
      <Paper
        sx={{
          maxWidth: 700,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <MuiTelInput
          margin="normal"
          id="phone"
          name="phone"
          fullWidth
          value={profile.phone}
          disableDropdown
        />
      </Paper>
      <Paper
        sx={{
          maxWidth: 700,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <SignupStudentDialog
          phone={profile.phone}
          name={profile.name}
          render={(openDialog) => (
            <Button
              type="button"
              onClick={openDialog}
              fullWidth
              variant="outlined"
              sx={{ p: 3 }}
            >
              {'Add a new student'}
            </Button>
          )}
        />
        <ClaimStudentDialog
          phone={profile.phone}
          render={(openDialog) => (
            <Button
              type="button"
              onClick={openDialog}
              fullWidth
              variant="outlined"
              sx={{ p: 3 }}
            >
              {'Claim a student'}
            </Button>
          )}
        />
      </Paper>
    </Paper>
  );
};

export default GuardianProfile;
