const address = "https://api.magic.tf/";

const get: (
  endpoint: string
) => Promise<{ [key: string]: string | number }> = async (endpoint) => {
  try {
    const response = await fetch(address + endpoint, {
      method: "GET",
    });
    const responseJson = await response.json();
    return await responseJson;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};

const post: (
  endpoint: string,
  body: { [key: string]: any }
) => Promise<{ [key: string]: string }> = async (endpoint, body) => {
  try {
    const response = await fetch(address + endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status >= 300) {
      console.log("Post response status", response.status);
      return { error: "Error " + response.status };
    } else {
      const responseJson = await response.json();
      return await responseJson;
    }
  } catch (e) {
    console.log(e);
    return { error: e, location: "ApiService.post exception" };
  }
};

export default {
  get,
  post,
};
