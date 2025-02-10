import React, { FC } from 'react';
import ProfileWidget from '../../widgets/forms/Profile.component-widget';

type ProfilePageProps = unknown;

const ProfilePage: FC<ProfilePageProps> = (_props): React.JSX.Element => {
  return <ProfileWidget />;
};

export default ProfilePage;
