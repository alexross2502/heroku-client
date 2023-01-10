import React, { useEffect, useState } from "react";
import style from "./ModalAvailableMasters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { useTranslation } from "react-i18next";
import Api from "../../AdminComponents/Components/api";
import { AvailableMastersForm } from "./AvailableMastersForm";

const ModalAvailableMasters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [mastersList, setMastersList] = useState([]);
  let masters = [];
  let arrayOfIndices = [];
  const mastersIndex = useSelector((state) => state.availableMasters.masters);
  useEffect(() => {
    let asyncFunc = async () => {
      masters = [...(await Api.getAll("masters"))];
      masters.forEach((item) => {
        arrayOfIndices.push(item.id);
      });
      let temporary = [];
      mastersIndex.flat().forEach((item) => {
        temporary.push(masters[arrayOfIndices.indexOf(item)]);
      });

      setMastersList(temporary);
    };
    asyncFunc();
  }, [mastersIndex]);
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.modalMasters.isActive);

  const windowClose = () => {
    dispatch(setModalMasters());
  };
  //
  const masterListItem = mastersList.map((item) => {
    return <AvailableMastersForm data={item} key={item.id} />;
  });

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => windowClose()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
          {mastersList.length !== 0 ? (
            <h1 className={style.modal_h1}>{t("available.header")}</h1>
          ) : (
            <h1 className={style.modal_h1}>{t("available.emptyHeader")}</h1>
          )}
          <span className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => windowClose()}
            ></img>
          </span>
          {masterListItem}
        </div>
      </div>
    </div>
  );
};

export default ModalAvailableMasters;
