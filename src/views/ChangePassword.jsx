import useErrorBehavior from 'hooks/useErrorBehavior';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { toastService, userService } from 'service';
import { isValidPassword } from 'utility/inputValidators';
import SubmitButton from 'components/shared/SubmitButton';
import PasswordInput from 'components/shared/PasswordInput';
import StrongPasswordInput from 'components/shared/StrongPasswordInput';
import hashPassword from 'utility/hashPassword';

const ChangePassword = () => {
  const defaultErrorBehavior = useErrorBehavior();
  const { userId } = useSelector(selectUserInfo);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onClick = async (setLoading) => {
    try {
      if (oldPassword.trim().length === 0) return;
      if (!isValidPassword(newPassword.trim())) return;

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
    <div className="flex flex-col h-full w-full rounded-3xl p-5 bg-white mx-5 gap-y-5">
      <div>
        <h1 className="font-medium text-2xl	">Change Password</h1>
        <p>Log in to your account.</p>
      </div>

      <PasswordInput
        val={oldPassword}
        label="Old password"
        id="oldPassword"
        hint={'Type your old password'}
        onChange={(val) => {
          setOldPassword(val);
        }}
      />

      <StrongPasswordInput
        val={newPassword}
        label="New password"
        id="newPassword"
        hint={'Type your new password'}
        onChange={(val) => {
          setNewPassword(val);
        }}
      />

      <SubmitButton text="Update password" onClick={onClick} />
    </div>
  );
};

export default ChangePassword;
