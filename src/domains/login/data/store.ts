import { create } from 'zustand';

interface ILoginState {
  email:string;
	password: string;
  setEmail: (email:string) => void,
	setPassword: (password:string) => void
}

export const useLoginStore = create<ILoginState>()(
	(set) => ({
		email: "",
		password:"",
		setEmail: (email: string) => set({ email}),
		setPassword: (password: string) => set({ password}),
	}),
);
