import React from "react";
import style from "./AdminPage.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <button
      type="button"
      className={style.logoutButton}
      onClick={async () => {
        logout()
      }}
    >
      {t(`adminPage.logout`)}
    </button>
  );
};
