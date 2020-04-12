import MainStore from "src/stores/mainStore";

let _mainStore: MainStore;

const setMainStore = (mainStore: MainStore) => {
    _mainStore = mainStore;
}

const address = "https://api.magic.tf/"

const get: (
    endpoint: string
  ) => Promise<{ [key: string]: string | number }> = async (endpoint) => {
    try {
      const response = await fetch(address + endpoint, {
        method: "GET"
      });
      const responseJson = await response.json();
      return await responseJson;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  };

  const post: (
    endpoint: string,
    body: { [key: string]: string | number }
  ) => Promise<{ [key: string]: string }> = async (endpoint, body) => {
    try {
      const response = await fetch(address + endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (response.status >= 300) {
        console.error("Post response status", response.status)
        return { error: "Error " + response.status };
      } else {
        const responseJson = await response.json();
        return await responseJson;
      }
    } catch (e) {
      console.error(e);
      return { error: e, location: "ApiService.post exception" };
      
    }
  };

export default {
    setMainStore,
    get,
    post
}