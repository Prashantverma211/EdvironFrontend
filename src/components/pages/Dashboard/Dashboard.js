import { useDispatch, useSelector } from "react-redux";
import styles from "./_dashboard.module.scss";
import Card from "../../Utils/Card/Card";
import BudgetOverview from "./BudgetOverview/BudgetOverview";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import PieChart from "./PieChart/PieChart";
import BarChart from "./BarChar/BarChart";
import { useEffect } from "react";
import { EdvitronAction } from "../../../store/edvitron-slice.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DotWave, Waveform, DotSpinner } from "@uiball/loaders";

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const edvitronState = useSelector((state) => state.edvitron);

  useEffect(() => {
    if (!edvitronState.schoolId) {
      history.push("/");
    } else {
      const schoolId = { schoolId: edvitronState.schoolId, className: "12" };
      const schoolDataFetch = async () => {
        console.log(schoolId);
        dispatch(EdvitronAction.schoolDataLoading(true));
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/form`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(schoolId),
          }
        );
        dispatch(EdvitronAction.schoolDataLoading(false));
        if (!response.ok) {
          const resData = await response.json();
          throw resData;
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(EdvitronAction.setSchoolData(resData));
      };

      const fetchGraphData = async () => {
        dispatch(EdvitronAction.graphLoading(true));
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/findGraphData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(schoolId),
          }
        );
        dispatch(EdvitronAction.graphLoading(false));
        if (!response.ok) {
          const resData = await response.json();
          throw resData;
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(EdvitronAction.setGraphData(resData));
      };

      try {
        schoolDataFetch();
        fetchGraphData();
      } catch (error) {}
    }
  }, [dispatch, edvitronState.schoolId, history]);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboard_schoolName}>
        {edvitronState.schoolDataLoading ? (
          <DotWave size={47} speed={1} color="black" />
        ) : (
          // <Ring size={40} lineWeight={5} speed={2} color="black" />
          edvitronState.schoolName
        )}
      </h1>

      <div className={styles.grid}>
        <Card className={styles.grid_1}>
          <BudgetOverview />
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_2}`}>
          <div className={styles.studentDetails}>
            <h3>Students</h3>
            <h2>
              {edvitronState.schoolDataLoading ? (
                <DotWave size={47} speed={1} color="black" />
              ) : (
                edvitronState.totalStudent
              )}
            </h2>
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_3}`}>
          <div className={styles.studentDetails}>
            <h3>Sections</h3>
            <p>
              <h2>
                {edvitronState.schoolDataLoading ? (
                  <DotWave size={10} speed={1} color="black" />
                ) : (
                  edvitronState.totalSection
                )}
              </h2>{" "}
              in <span>12</span> classes
            </p>
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_4}`}>
          <div className={styles.studentDetails}>
            <h3>Collection this month</h3>
            <h2>
              {edvitronState.schoolDataLoading ? (
                <DotWave size={47} speed={1} color="black" />
              ) : (
                edvitronState.collThisMonth
              )}
            </h2>
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_5}`}>
          <div className={styles.studentDetails}>
            <h3>Fine Collection till date</h3>
            <h2>
              {edvitronState.schoolDataLoading ? (
                <DotWave size={47} speed={1} color="black" />
              ) : (
                edvitronState.fineCollTillDate
              )}
            </h2>
          </div>
        </Card>

        <Card className={`${styles.grid_container} ${styles.grid_container_6}`}>
          <h2>Overview</h2>
          <h3>Monthly Collection</h3>
          <div className={styles.makeItCenter}>
            {edvitronState.graphDataLoading ? (
              <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
            ) : (
              <BarChart
                barData={edvitronState.graphData}
                total={edvitronState.totalYearlyColl}
              ></BarChart>
            )}
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_7}`}>
          <h2>Payment Mode</h2>
          <h3>
            Split between Online, Cash and Cheque for collection till date
          </h3>
          <div className={styles.makeItCenter}>
            {edvitronState.schoolDataLoading ? (
              <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
            ) : (
              <PieChart></PieChart>
            )}
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_8}`}>
          <h2>Admins</h2>
          <div
            className={`${styles.school_container} ${styles.school_container_border} `}
          >
            <h3>Name</h3>
            <h3>Role</h3>
          </div>
          <div
            className={`${
              edvitronState.schoolDataLoading
                ? `${styles.makeItCenter} ${styles.makeItCenter_content}`
                : ""
            }`}
          >
            {edvitronState.schoolDataLoading ? (
              <DotSpinner
                size={60}
                speed={0.9}
                color="black"
                className={styles.dotSpinner}
              />
            ) : (
              edvitronState.schoolAdmins?.map((admin, i) => {
                return (
                  <div key={i} className={`${styles.school_container}`}>
                    <h4>{admin.name}</h4>
                    <h4>{admin.access}</h4>
                  </div>
                );
              })
            )}
          </div>
        </Card>
        <Card className={`${styles.grid_container} ${styles.grid_container_9}`}>
          <h2>Disbursal</h2>
          <div
            className={`${styles.school_container} ${styles.school_container_border} `}
          >
            <h3>Date</h3>
            <h3>Amount</h3>
            <h3>Status</h3>
          </div>

          <div
            className={`${
              edvitronState.schoolDataLoading
                ? `${styles.makeItCenter} ${styles.makeItCenter_content}`
                : ""
            }`}
          >
            {edvitronState.schoolDataLoading ? (
              <DotSpinner
                size={60}
                speed={0.9}
                color="black"
                className={styles.dotSpinner}
              />
            ) : (
              edvitronState.disbursal.map((dis, i) => {
                return (
                  <div key={i} className={`${styles.school_container}`}>
                    <h4>{dis.date}</h4>
                    <h4>{dis.amount}</h4>
                    <div className={styles.status}>
                      <div className={styles.status_icon}>
                        {dis.status === "Pending" ? (
                          <AlertCircle className={styles.alert} />
                        ) : (
                          <CheckCircle2 className={styles.check} />
                        )}
                      </div>
                      <h4>{dis.status}</h4>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
