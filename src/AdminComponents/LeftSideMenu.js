import React from "react";
import style from "./AdminPage.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LeftSideMenu = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={style.leftSide}>
      <p className={style.header}>{t("adminPage.header")}</p>
      <div className={style.switchButton} onClick={() => navigate("/clients")}>
        {t("adminPage.clients")}
      </div>
      <div className={style.switchButton} onClick={() => navigate("/masters")}>
        {t("adminPage.masters")}
      </div>
      <div className={style.switchButton} onClick={() => navigate("/towns")}>
        {t("adminPage.towns")}
      </div>
    </div>
  );
};
