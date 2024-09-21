import { useContext } from "react";
import { TFormStore } from "../data/store";
import { FormStoreContext } from "../data/FormStoreProvider";
import { useStore } from "zustand";

export const useFormStore = <T,>(selector: (store: TFormStore) => T): T => {
  const formStoreContext = useContext(FormStoreContext);

  if (!formStoreContext) {
    throw new Error(
      `useFormStore must be used within FormStoreContextProvider`
    );
  }

  return useStore(formStoreContext, selector);
};
