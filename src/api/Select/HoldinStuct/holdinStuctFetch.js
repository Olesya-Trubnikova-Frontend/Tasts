import { HOST_ADDR } from "../../../utils/ApiHostAdres";

export const getAllUsers = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/admin/getAllUsers", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};