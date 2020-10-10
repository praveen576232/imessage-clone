import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    chart: null ,
    id:null,
    chartName:null
  },
  reducers: {
    setCharts: (state,action) => {
    

      state.chartName = action.payload.chartName;
      state.id = action.payload.id;
    },
   
   
  },
});

export const { setCharts } = chartSlice.actions;



export const selectChartName = state => state.chart.chartName;
export const selectId = state => state.chart.id;





export default chartSlice.reducer;
