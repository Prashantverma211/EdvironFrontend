import { createSlice } from "@reduxjs/toolkit";

const edvitronInitialState = {
  collThisMonth: "",
  totalCollection: "",
  totalSection: 0,
  fineCollTillDate: "",
  totalStudent: "",
  balance: "",
  paymentMode: [],
  schoolAdmins: [],
  disbursal: [],
  defaulter: 0,
  schoolDataLoading: false,
  defaulterLoading: false,
  idLoading: false,
  schoolId: "",
  schoolName: "DAV Public School,Bhilai",
  graphData: [
    { month: "Jan", spent: 15.01 },
    { month: "Feb", spent: 35.05 },
    { month: "Mar", spent: 52.36 },
    { month: "Apr", spent: 31.07 },
    { month: "May", spent: 27.32 },
    { month: "Jun", spent: 40.32 },
    { month: "July", spent: 31.01 },
    { month: "Aug", spent: 45.01 },
    { month: "Sep", spent: 2.01 },
    { month: "Oct", spent: 25.01 },
    { month: "Nov", spent: 17.01 },
    { month: "Dec", spent: 21.01 },
  ],
  totalYearlyColl: 0,
  graphDataLoading: false,
  pieData: {
    labels: ["Online", "Cheque", "Cash"],
    datasets: [
      {
        label: "Payment Mode",
        data: [63, 25, 11],
      },
    ],
  },
};

const Edvitron = createSlice({
  name: "edvitron",
  initialState: edvitronInitialState,
  reducers: {
    setSchoolId(state, action) {
      state.schoolId = action.payload.schoolId;
      state.schoolName = action.payload.schoolName;
    },
    setDefaulter(state, action) {
      state.defaulter = action.payload.totalDefaulters;
    },
    setSchoolData(state, action) {
      state.collThisMonth = action.payload.collThisMonth;
      state.totalCollection = action.payload.totalCollection;
      state.totalSection = action.payload.totalSection;
      state.fineCollTillDate = action.payload.fineCollTillDate;
      state.totalStudent = action.payload.totalStudent;
      state.balance = action.payload.balance;
      state.paymentMode = action.payload.paymentMode;
      state.schoolAdmins = action.payload.schoolAdmins;
      state.disbursal = action.payload.disbursal;

      const pieDataArr = [
        action.payload.paymentMode.online,
        action.payload.paymentMode.cheque,
        action.payload.paymentMode.cash,
      ];
      state.pieData.datasets[0].data = pieDataArr;
    },
    setGraphData(state, action) {
      state.graphData.map(
        (data, i) =>
          (state.graphData[i].spent = action.payload.monthlyCollArr[i])
      );
      state.totalYearlyColl = action.payload.totalCollThisYr;
    },
    schoolDataLoading(state, action) {
      state.schoolDataLoading = action.payload;
    },
    defaulterLoading(state, action) {
      state.defaulterLoading = action.payload;
    },
    idLoading(state, action) {
      state.idLoading = action.payload;
    },
    graphLoading(state, action) {
      state.graphDataLoading = action.payload;
    },
  },
});

export const EdvitronAction = Edvitron.actions;
export default Edvitron.reducer;
