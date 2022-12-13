import { nanoid } from "nanoid";
import Api from "../../AdminComponents/Components/api";


export async function sendMail(masterData, orderData) {
  let hashKey = nanoid(20);

  //Создание резерва в таблице с неподтвержденными резервами
  Api.addConfirmation(
    hashKey,
    masterData.name,
    masterData.surname,
    masterData.id,
    orderData[0][1],
    masterData.townName,
    orderData[0][5],
    masterData.rating,
    orderData[0][3],
    orderData[0][4]
  );

  //Отправка письма на почту клиента
  let link = `https://mysqltest.herokuapp.com/api/confirmation/check/${hashKey}`;
  Api.sendMail(
    orderData[0][1],
    masterData.name,
    masterData.surname,
    masterData.rating,
    link
  );

  //Проверка и добавление нового клиента, если не существует
  Api.checkClient(orderData[0][0], orderData[0][1]);


 
}
