import { HOST_ADDR } from "../../../utils/ApiHostAdres";

export const getTaskFile = async (token, fileNames, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getTaskFile", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileNames),
    });

    if (res.ok) {
      const reader = res.body.getReader();
      let chunks = [];
      let files = [];

      while (true) {
        const { done, value } = await reader.read();
        // console.log(done, value)
        if (done) {
          break;
        }

        // Обработка полученного куска данных
        chunks.push(value);
      }
      
      // Каждый файл обрабатываем отдельно
      for (let i = 0; i < chunks.length; i++) {
        let byteArray = new Uint8Array(chunks[i]);
        let data = new TextDecoder("utf-8").decode(byteArray);
        files.push(data);
      }

      console.log(files.length);
      
      onSuccess(null);
      return files;

    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error)
  }
}


// import { HOST_ADDR } from "../../../utils/ApiHostAdres";

// export const getTaskFile = async (token, fileNames, onSuccess) => {
//   try {
//     const res = await fetch(HOST_ADDR + "/tasks/getTaskFile", {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(fileNames),
//     });

//     if (res.ok) {
//       const reader = res.body.getReader();
//       const chunks = [];

//       while (true) {
//         const { done, value } = await reader.read();

//         if (done) {
//           break;
//         }

//         // Обработка полученного куска данных
//         chunks.push(value);
//       }

//       // Объединяем все куски данных в один массив байтов
//       const byteArray = new Uint8Array(chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));

//       // Конвертируем массив байтов в строку
//       const data = new TextDecoder("utf-8").decode(byteArray);

//       // console.log(data)

//       onSuccess(null);
//       return data;
//     } else {
//       throw new Error("Server response was not ok or content type is not JSON");
//     }
//   } catch (error) {
//     onSuccess(error)
//   }
// }


// import { HOST_ADDR } from "../../../utils/ApiHostAdres";

// export const getTaskFile = async (token, fileNames, onSuccess) => {
//   try {
//     const res = await fetch(HOST_ADDR + "/tasks/getTaskFile", {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(fileNames),
//     });

//     if (res.ok) {
//       const contentType = res.headers.get('Content-Type').split(',')
//       console.log('ContentType', contentType)
//       const data = await res
//       console.log(data)

//       onSuccess(null);
//       return data;
//     } else {
//       throw new Error("Server response was not ok or content type is not JSON");
//     }
//   } catch (error) {
//     onSuccess(error)
//   }
// }