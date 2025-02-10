import { IUserProfile } from '../response/user-profile.response';

export const USER_PROFILE: IUserProfile = {
  uid: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1', // Example UUID
  email: 'josh.lav@example.com', // Updated to a more professional email format
  name: 'Joshua Doe', // More formal name
  phone: '+972545233644',
  students: [
    {
      uid: 'b5f1a8c2-9c4e-4b89-8d5f-2a7b3e1e4c5a',
      name: 'John Doe',
      phone: '+972551235644',
    },
    {
      uid: 'd3f4b2a9-1e6f-42ab-93bc-9a8e7f4c3d12',
      name: 'Jane Doe',
      phone: '+972545213644',
    },
    {
      uid: '7e1c3a45-8f9d-4d2b-9c5f-b2a1e6c4d789',
      name: 'Alice Doe',
      phone: '+972545233612',
    },
  ],
};
