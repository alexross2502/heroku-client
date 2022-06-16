import React, { useEffect, useState } from "react";
import style from "./ModalAvailableMasters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { useTranslation } from "react-i18next";

const ModalAvailableMasters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.modalMasters.isActive);

  const windowClose = () => {
    dispatch(setModalMasters());
  };

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => windowClose()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
          <h1 className={style.modal_h1}>{t("available.header")}</h1>
          <span className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => windowClose()}
            ></img>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalAvailableMasters;
