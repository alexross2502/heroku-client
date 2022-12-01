import React from "react";
import style from "./ModalAvailableMasters.module.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function AvailableMastersForm(props) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form>
      <div className={style.modal_item}>
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
