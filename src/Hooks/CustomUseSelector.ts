import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppRootStateType } from '../Store/store';


export const useTypeSelector: TypedUseSelectorHook<AppRootStateType> = useSelector