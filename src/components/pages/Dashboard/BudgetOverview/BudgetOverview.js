import { useDispatch, useSelector } from "react-redux";
import styles from "./_budgetOverview.module.scss";
import { CircleDollarSign, Wallet2, BarChart2 } from "lucide-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EdvitronAction } from "../../../../store/edvitron-slice";
import { DotWave, RaceBy } from "@uiball/loaders";

function BudgetOverview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const edvitronState = useSelector((state) => state.edvitron);

  useEffect(() => {
    const schoolId = { schoolId: edvitronState.schoolId };
    if (!schoolId.schoolId) {
      history.push("/");
    } else {
      dispatch(EdvitronAction.defaulterLoading(true));
      const fetchDefaulters = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/findDefaulter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(schoolId),
          }
        );
        dispatch(EdvitronAction.defaulterLoading(false));
        if (!response.ok) {
          const resData = await response.json();
          throw resData;
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(EdvitronAction.setDefaulter(resData));
      };
      try {
        fetchDefaulters();
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, edvitronState.schoolId, history]);

  return (
    <div className={styles.budgetOverview}>
      <div className={styles.budgetOverview_collection}>
        <div className={styles.icon_container}>
          <CircleDollarSign
            className={`${styles.icon} ${styles.icon_dollar}`}
          />
        </div>
        <div className={styles.text_container}>
          <h3>Collection till date</h3>
          <h2>
            {edvitronState.schoolDataLoading ? (
              <DotWave size={47} speed={1} color="black" />
            ) : (
              edvitronState.totalCollection
            )}
          </h2>
          <p>
            <span>&#8593; 10%</span> in last 30 days
          </p>
        </div>
      </div>
      <div className={styles.budgetOverview_collection}>
        <div
          className={`${styles.icon_container} ${styles.icon_container_wallet}`}
        >
          <Wallet2 className={`${styles.icon} ${styles.icon_wallet}`} />
        </div>
        <div className={styles.text_container}>
          <h3>Balance</h3>
          <h2>
            {edvitronState.schoolDataLoading ? (
              <DotWave size={47} speed={1} color="black" />
            ) : (
              edvitronState.balance
            )}
          </h2>
        </div>
      </div>
      <div className={styles.budgetOverview_collection}>
        <div
          className={`${styles.icon_container} ${styles.icon_container_barChart}`}
        >
          <BarChart2 className={`${styles.icon} ${styles.icon_bar}`} />
        </div>
        <div className={styles.text_container}>
          <h3>Defaulters</h3>
          <p>
            <h2 className={styles.defaulter_students}>
              {edvitronState.defaulterLoading ? (
                <RaceBy size={80} lineWeight={5} speed={1.4} color="black" />
              ) : (
                edvitronState.defaulter
              )}
            </h2>
            /
            {edvitronState.schoolDataLoading ? (
              <DotWave size={10} speed={1} color="black" />
            ) : (
              edvitronState.totalStudent
            )}{" "}
            Students
          </p>
          <p>
            <span>&darr; 11%</span> in last 30 days
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;
