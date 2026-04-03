import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  platform: string;
  technology: string;
}

const initialState: FilterState = {
  category: "",
  platform: "",
  technology: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FilterState>>) {
      return { ...state, ...action.payload };
    },
    clearFilters() {
      return initialState;
    },
  },
});

// export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
