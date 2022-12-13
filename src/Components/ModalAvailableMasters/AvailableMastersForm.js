import React from "react";
import style from "./ModalAvailableMasters.module.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { sendMail } from "./sendMail";
import { setModalMasters } from "../../redux/modalMastersReducer";

export function AvailableMastersForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.orderData.data);
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form>
      <div
        className={style.modal_item}
        onClick={() => {
          sendMail(props.data, userData);
          dispatch(setModalMasters());
        }}
      >
        <span>
          {t("masterOrder.name")} : {props.data.name}
        </span>
        <span>
          {t("masterOrder.surname")} : {props.data.surname}
        </span>
        <span>
          {t("masterOrder.rating")} : {props.data.rating}
        </span>
      </div>
    </form>
  );
}
