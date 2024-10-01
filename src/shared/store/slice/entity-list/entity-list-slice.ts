import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionQuery } from '../../../../models/collection.model';

export interface EntityListStateModel {
    collection: CollectionQuery|null;
    key: string;
}
export interface EntityListState {
  collections: EntityListStateModel[];
}

const initialState: EntityListState = {
 collections: []
};

export const entityListSlice = createSlice({
  name: 'entityList',
  initialState,
  reducers: {
    setEntityListCollection: (state, action: PayloadAction<any>): void => {
        const filteredCollection = state.collections.filter((collection) => collection.key === action.payload.key);
        if(filteredCollection.length > 0){
            
            state.collections = state.collections.map((collection) => {
                if(collection.key === action.payload.key){
                    return action.payload;
                }
                return collection;
            });
        }else{
            state.collections = [...state.collections, action.payload];
        }

      
    },
    removeEntityListCollection: (state, action: PayloadAction<string>): void => {
        state.collections = state?.collections?.filter((collection) => collection.key !== action.payload);

      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEntityListCollection,removeEntityListCollection } = entityListSlice.actions;
export default entityListSlice.reducer;
