import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import { ReservationForm } from "./ReservationForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [reservationList, setReservationList] = useState([]);

  useEffect(async () => {
    let reservation = [...(await Api.getAll("reservation"))];
    setReservationList(reservation);
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  const reservationListItem = reservationList.map((item) => {
    return <ReservationForm data={item} key={item.id} />;
  });

  return (
    <div className={style.container}>
      <LeftSideMenu />
      <div className={style.rightSide}>
        <p className={style.header}>{t("reservationPage.header")}</p>

        <div>
          <p className={style.subtitle}>{t("adminPage.list")}</p>
          <div className={style.listContainer}></div>
          {reservationListItem}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
