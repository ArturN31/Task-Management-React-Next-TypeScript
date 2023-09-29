import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch; //funcion dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //state selector
