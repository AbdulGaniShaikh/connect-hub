import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDescription } from './../../../redux/slices/userInfoSlice';
import { toastService, userService } from './../../../service';
import { HttpStatusCode } from 'axios';

const DescriptionSection = (props) => {
  const { isVisitingProfile, user } = props;
  const [isDespEdtVisible, setIsDespEdtVisible] = useState(false);
  const [desp, setDesp] = useState('');
  const [editDesp, setEditDesp] = useState(desp);
  const dispatch = useDispatch();

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

  const onUpdateClick = () => {
    if (editDesp === desp) {
      setIsDespEdtVisible(false);
      return;
    }
    userService
      .updateDesp(user.userId, editDesp)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          toastService.success('description was updated successfully');
          dispatch(updateDescription(editDesp));
          setDesp(editDesp);
        }
      })
      .catch((error) => {
        toastService.error(error.response.data.message);
      })
      .finally(() => {
        setIsDespEdtVisible(false);
      });
  };

  useEffect(() => {
    if (!isVisitingProfile) {
      editDespRef.current.style.height = 'auto';
      editDespRef.current.style.height = editDespRef.current.scrollHeight + 'px';
    }
  }, [editDesp]);

  useEffect(() => {
    if (!isVisitingProfile) editDespRef.current.style.height = document.getElementById('desp').scrollHeight + 'px';
  }, []);

  useEffect(() => {
    setDesp(user.description);
  }, [user]);

  return (
    <div className="rounded-3xl bg-white p-5">
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
            className="text-gray-900 min-h-10 focus:outline-none w-full resize-none"
          ></textarea>
          <div className="flex gap-x-3 w-1/2 self-end">
            <button
              onClick={() => {
                setIsDespEdtVisible(false);
              }}
              className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
            >
              Cancel
            </button>
            <button
              onClick={onUpdateClick}
              className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionSection;
