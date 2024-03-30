import { useEffect, useState } from 'react';
import { checkPasswordCriteriaMap } from 'utility/inputValidators';
import PasswordInput from 'components/shared/PasswordInput';

const StrongPasswordInput = (props) => {
  const [criteria, setCriteria] = useState({
    size: false,
    digit: false,
    lower: false,
    upper: false,
    symbol: false
  });

  const crossed = 'not-crossed text-green-600 crossed w-fit';
  const notCrossed = 'not-crossed text-red-600 w-fit';

  useEffect(() => {
    setCriteria(checkPasswordCriteriaMap(props.val));
  }, [props.val]);

  return (
    <div className="flex flex-col">
      <PasswordInput {...props} />
      <div className="text-md font-medium ml-1 select-none criteria-con">
        <div>New password must meet the following requirements:</div>
        <p className={criteria.size ? crossed : notCrossed}>
          <i className="fa-solid fa-check mr-2"></i>Atleast 8 characters
        </p>
        <p className={criteria.digit ? crossed : notCrossed}>
          <i className="fa-solid fa-check mr-2"></i>Contains a digit
        </p>
        <p className={criteria.lower ? crossed : notCrossed}>
          <i className="fa-solid fa-check mr-2"></i>Contains a lowercase letter
        </p>
        <p className={criteria.upper ? crossed : notCrossed}>
          <i className="fa-solid fa-check mr-2"></i>Contains a uppercase letter
        </p>
        <p className={criteria.symbol ? crossed : notCrossed}>
          <i className="fa-solid fa-check mr-2"></i>Contains a symbol
        </p>
      </div>
    </div>
  );
};

export default StrongPasswordInput;
