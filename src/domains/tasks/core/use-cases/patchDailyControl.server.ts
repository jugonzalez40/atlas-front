"use server";

// import FormData from "form-data";

import { RequestService } from "@/services/RequestService";
import { IDailyControl } from "../../ui/wrappers/WDailyForm";

import axios from "axios";

export interface IDailyControlInput {
  dailyControl: IDailyControl;
  initialCounterFile?: File;
  finalCounterFile?: File;
}

export const patchDailyControl = async (formData: FormData) => {
  const extractDailyControl = {};

  // const image = formData.get("initialPhoto");
  // const blob = formData.get("data");

  // const newnew = new FormData();

  // newnew.append("initialPhoto", image.value as File, image?.name || "image");
  // newnew.append("data", blob as Blob, "data.json");

  // formData.

  // const _initialCounterFile = dailyControl.initialPhoto;

  // delete dailyControl.initialPhoto;

  // const formData = new FormData();
  // formData.append("data", JSON.stringify(dailyControl));

  // if (initialCounterFile) formData.append("initialPhoto", initialCounterFile);

  // if (finalCounterFile) formData.append("finalPhoto", finalCounterFile);
  // const yy = newnew.getHeaders();
  // console.log(yy);

  // // formData._boundry;

  // const result = await RequestService.fetch<IDailyControl>("/daily-controls", {
  //   method: "POST",
  //   headers: {
  //     ...yy,
  //   },
  //   body: newnew,
  // });

  // const result = await axios.post(
  //   "http://192.168.2.13:8080/daily-controls",
  //   formData
  // );

  const result = await RequestService.axios<IDailyControl>("/daily-controls", {
    method: "POST",
    data: formData,
  });

  return result;
};
