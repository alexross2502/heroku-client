import React, { useEffect, useState } from "react";
import style from "./ModalOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Api from "../../AdminComponents/Components/api";
import { FormButton } from "../../AdminComponents/Components/FormButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalOrder = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.order.isActive);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  function onActiveClick() {
    dispatch(setModalOrder());
  }

  const [townsList, setTownsList] = useState([]);
  useEffect(async () => {
    let towns = [...(await Api.getAll("towns"))];
    setTownsList(towns);
  }, []);
  const townListItem = townsList.map((item) => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });

  let monthNumber = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParser = (date, time, size) => {
    let dateObj = {};
    let temporary = date.toString().split(" ");
    dateObj.date = `${temporary[2]}.${monthNumber.indexOf(temporary[1])}.${
      temporary[3]
    }`;

    dateObj.time = [
      +time.toString().slice(16, 18),
      +time.toString().slice(16, 18) + Number(size),
    ];

    return dateObj;
  };

  async function formSend(data) {
    let date = dateParser(selectedDate, selectedTime, data.size);

    let includingTowns = await Api.getAvailable(
      "reservation",
      townsList[townsList.findIndex((el) => el.name == data.town)].id
    );
    let includingReservation = includingTowns.filter(
      (el) => el.day == date.date
    );

    let includingMasters = await Api.getAvailable("masters", data.town);

    let finaleMasters = [];
    includingMasters.forEach((el) => {
      finaleMasters.push(el.id);
    });

    let timeStart = date.time[0];
    let timeEnd = date.time[1];
    function checkInterval(reservationStart, reservationEnd) {
      if (
        (reservationStart >= timeStart && reservationStart < timeEnd) ||
        (reservationEnd > timeStart && reservationEnd <= timeEnd)
      ) {
        return false;
      } else return true;
    }

    if (includingReservation.length !== 0) {
      includingReservation.forEach((el) => {
        el.hours = el.hours.split("-");
        if (!checkInterval(el.hours[0], el.hours.slice(-1))) {
          if (finaleMasters.indexOf(el.master_id) !== -1) {
            finaleMasters.splice(finaleMasters.indexOf(el.master_id), 1);
          }
        }
      });
    }
  }

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => onActiveClick()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
          <h1 className={style.modal_h1}>{t("order.header")}</h1>
          <span className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => onActiveClick()}
            ></img>
          </span>

          <form className={style.modal_form} onSubmit={handleSubmit(formSend)}>
            <p>{t("order.name")}</p>
            <input
              name="name"
              className={style.modal_input}
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
            <p>{t("order.email")}</p>
            <input
              name="email"
              className={style.modal_input}
              {...register("email", {
                required: `${t("adminPopup.emptyField")}`,
                pattern: {
                  value:
                    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                  message: `${t("adminPopup.vrongFormat")}`,
                },
              })}
            ></input>
            <p>{t("order.repearType")}</p>
            <select {...register("size")} className={style.select}>
              <option selected value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <p>{t("order.town")}</p>
            <select
              {...register("town", {
                required: `${t("adminPopup.emptyField")}`,
              })}
              className={style.select}
              required
            >
              <option disabled selected value="">
                Выберите город
              </option>
              {townListItem}
            </select>
            <p>{t("order.date")}</p>
            <DatePicker
              className={style.select}
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              filterDate={(date) => date.getDay() != 6 && date.getDay() != 0}
              onChange={(date) => setSelectedDate(date)}
            />
            <p>{t("order.time")}</p>
            <DatePicker
              className={style.select}
              selected={selectedTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              dateFormat="h:mm"
              onChange={(time) => setSelectedTime(time)}
            />

            <FormButton buttonType="saveButton" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
