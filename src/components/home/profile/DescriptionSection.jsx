import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDescription } from './../../../redux/slices/userInfoSlice';
import { toastService, userService } from 'service';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Button from 'components/buttons/Button';
import NeutralButton from 'components/buttons/NeutralButton';

const DescriptionSection = (props) => {
  const { isVisitingProfile, user } = props;
  const [isDespEdtVisible, setIsDespEdtVisible] = useState(false);
  const [desp, setDesp] = useState('');
  const [editDesp, setEditDesp] = useState(desp);
  const dispatch = useDispatch();
  const defaultErrorBehavior = useErrorBehavior();

  const editDespRef = useRef(null);

  const onEditClick = () => {
    if (!isVisitingProfile) {
      setIsDespEdtVisible(!isDespEdtVisible);
      setEditDesp(desp);
    }
  };

  const onChange = (e) => {
    setEditDesp(e.target.value);
  };

  const onUpdateClick = async () => {
    if (editDesp === desp) {
      setIsDespEdtVisible(false);
      return;
    }
    try {
      await userService.updateDesp(user.userId, editDesp);
      toastService.success('Description was updated successfully');

      dispatch(updateDescription(editDesp));
      setDesp(editDesp);
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setIsDespEdtVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisitingProfile) {
      editDespRef.current.style.height = 'auto';
      editDespRef.current.style.height = editDespRef.current.scrollHeight + 'px';
    }
  }, [editDesp, isVisitingProfile]);

  useEffect(() => {
    if (!isVisitingProfile) editDespRef.current.style.height = document.getElementById('desp').scrollHeight + 'px';
  }, []);

  useEffect(() => {
    setDesp(user.description);
  }, [user]);

  return (
    <div className="rounded-3xl   p-5">
      <p onClick={onEditClick} className="font-bold hover:cursor-pointer select-none inline">
        About me &nbsp; {!isVisitingProfile && <i className="fa-regular fa-edit"></i>}
      </p>
      <p id="desp" className={isDespEdtVisible ? 'hidden' : ''}>
        {desp}
      </p>
      {!isVisitingProfile && (
        <div className={isDespEdtVisible ? 'flex flex-col' : 'hidden'}>
          <textarea
            type="text"
            ref={editDespRef}
            name="description"
            value={editDesp}
            onChange={onChange}
            placeholder="Description"
            className="bg-lightBg dark:bg-darkBg min-h-10 focus:outline-none w-full resize-none"
          ></textarea>
          <div className="flex gap-x-3 w-1/2 self-end">
            <NeutralButton
              onClick={() => {
                setIsDespEdtVisible(false);
              }}
              text="Cancel"
            />
            <Button onClick={onUpdateClick} text="Save" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionSection;
