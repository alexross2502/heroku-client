import { nanoid } from "nanoid";
import Api from "../../AdminComponents/Components/api";
import { sendMail } from "./sendMail";

export async function mailConfirmation(masterData, orderData) {
  console.log(masterData, orderData);
  let hashKey = nanoid(20);
  Api.addConfirmation(
    hashKey,
    masterData.name,
    masterData.surname,
    orderData[0][1],
    masterData.townName,
    masterData.rating,
    orderData[0][3],
    orderData[0][4]
  );
  //sendMail();
}
//recipient, name, surname, rating
