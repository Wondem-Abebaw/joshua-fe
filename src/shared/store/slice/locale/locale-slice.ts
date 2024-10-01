import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Language {
  name: string;
  locale: string;
}
export interface LocaleState {
  locale: string;
  language: Language[];
}

const initialState: LocaleState = {
  locale: 'en',
  language: [
    {
      name: 'አማረኛ',
      locale: 'am',
    },
    {
      name: 'English',
      locale: 'en',
    },
    {
      name: 'Oromiffa',
      locale: 'om',
    },
    {
      name: 'Tigrigna',
      locale: 'Ti',
    },
  ],
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>): void => {
      state.locale = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
