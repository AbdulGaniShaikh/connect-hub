import useErrorBehavior from 'hooks/useErrorBehavior';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { toastService, userService } from 'service';
import { isValidPassword } from 'utility/inputValidators';
import SubmitButton from 'components/buttons/SubmitButton';
import PasswordInput from 'components/shared/PasswordInput';
import StrongPasswordInput from 'components/shared/StrongPasswordInput';
import hashPassword from 'utility/hashPassword';

const ChangePassword = () => {
  const defaultErrorBehavior = useErrorBehavior();
  const { userId } = useSelector(selectUserInfo);
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const onClick = async (setLoading) => {
    try {
      if (oldPassword.trim().length === 0) {
        setOldPasswordError('Old password length cannot be zero');
        return;
      }
      setOldPasswordError('');
      if (!isValidPassword(newPassword.trim())) {
        setNewPasswordError('New password must fulfill the requirments');
        return;
      }
      setNewPasswordError('');

      setLoading(true);

      const hashOld = hashPassword(oldPassword);

      const hashNew = hashPassword(newPassword);

      await userService.changePassword(userId, hashOld, hashNew);
      toastService.success('Password was changed successfully');
      setNewPassword('');
      setOldPassword('');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full  p-5   gap-y-5">
      <div>
        <h1 className="font-medium text-2xl	">Change Password</h1>
        <p>Log in to your account.</p>
      </div>

      <PasswordInput
        val={oldPassword}
        label="Old password"
        id="oldPassword"
        hint={'Type your old password'}
        error={oldPasswordError}
        onChange={(val) => {
          setOldPassword(val);
        }}
      />

      <StrongPasswordInput
        val={newPassword}
        label="New password"
        id="newPassword"
        hint={'Type your new password'}
        error={newPasswordError}
        onChange={(val) => {
          setNewPassword(val);
        }}
      />

      <SubmitButton text="Update password" onClick={onClick} />
    </div>
  );
};

export default ChangePassword;
