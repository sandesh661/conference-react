import { baseUrl } from "./userData";
export const loadProfilesInRange = (range) => {
    fetch(baseUrl + "v1/profile/nearby/?limit=20", {
      method: "POST",
      body: JSON.stringify({
        distance: range
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      }
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(resp => {
        setNearestProfiles(resp.results)
      })
      .catch(console.error);
}