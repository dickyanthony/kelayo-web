import { User } from '@nextui-org/react';
import DefaultMale from '../assets/default-male.jpeg';
import DefaultFemale from '../assets/default-female.jpeg';

export default (props) => {
  const { user, name } = props;

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const avatar = user.avatar
    ? createBlobURL(user.avatar.data)
    : user.gender === 'male'
    ? DefaultMale
    : DefaultFemale;

  return (
    <User avatarProps={{ radius: 'lg', src: avatar }} description={user.email ?? ''} name={name}>
      {user?.email ?? ''}
    </User>
  );
};
