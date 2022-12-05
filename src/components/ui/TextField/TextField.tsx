import { ITextField, ITextFieldInputRule } from '@/interfaces'
import { useEffect, useState } from 'react'
import FormError from '../FormError';
import getStyles from './TextField.styles';
export default function TextField(props: ITextField) {
  const {
    placeholder,
    name,
    className,
    type,
    onChange,
    rules,
  } = props

  const [error, setError] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState({isValid});
  const [touched, setTouched] = useState<boolean>(false);
  useEffect(() => {
    setCurrentState({
      isValid: isValid || !touched
    })
    return () => {
      setCurrentState({
        isValid: true
      })
    }
  }, [isValid, touched])
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const rule = testInputString(e.target.value);
    setIsValid(!rule);
    setShowError(true);
  }

  const testInputString = (value: string) => {
    const rule = rules?.find(({rule}: ITextFieldInputRule) => !rule(value));
    setError(rule?.message)
    return rule;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTouched(true);
    setError(''); // clear error
    const rule = testInputString(e.target.value);
    setIsValid(!rule);
    if (onChange) onChange(e, !rule);
  }

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTouched(true);
    setShowError(false);
  }
  
  const styles = getStyles(currentState);
  return <>
    <div className="relative">
      <label>{name}</label>
      <input 
        type={type} 
        className={`pl-3 py-1 border-2 rounded w-full ${className} ${styles.join()}`} 
        placeholder={placeholder} 
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        />
        <FormError>{showError ? error: ''}</FormError>
    </div>
  </>
}
