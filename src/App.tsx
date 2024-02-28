import { useEffect } from "react";
import "./App.css";
import getLocalDate from "./utils/getLocalDate";
import { md5 } from 'js-md5';


function App() {
  const currentDate = getLocalDate();
  const xAuth = md5(import.meta.env.VITE_VALANTIS_API_KEY + "_" + currentDate);

  useEffect(() => {
    fetch("https://api.valantis.store:41000/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Auth": xAuth,
      },
      body: JSON.stringify({
        action: "get_ids",
        params: { offset: 10, limit: 10 },
      }),
    })
      .then((response) => response.json())
      .then((data) => data?.result.forEach((item: any) => console.log(item)
      ));
  }, []);

  return <div></div>;
}

export default App;
