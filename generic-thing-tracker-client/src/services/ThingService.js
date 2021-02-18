import axios from "axios"

export default {
  async getThings() {
    let res = await axios.get("http://localhost:8000/things");
    return res.data;
  },
  async getThingSingle(thingId, accessToken) {
    let res = await axios.get("http://localhost:8000/things/" + thingId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  }
}