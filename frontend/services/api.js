class Api {
  static baseURL = "http://localhost:3000/api/v1"
  static headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  static get(url){
    return fetch(baseURL + url)
      .then(response => response.json())
  }

  static post(url, body){
    return fetch(baseURL + url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
  }

  static patch(url, body){
    return fetch(baseURL + url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
  }
  
  static delete(url){
    return fetch(baseURL + url, {
      method: "DELETE",
      headers: this.headers
    })
      .then(response => response.json())
  }

}
