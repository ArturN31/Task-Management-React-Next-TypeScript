'use client';

import './globals.css';
import { store } from '@/lib/store/store';
import { Provider } from 'react-redux/es/exports';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}
