function fetchData() {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if(success ){
        resolve("DaTa FeTcHeD sUcCeSsFuLlY")
      } else {
        reject("Error fetching data")
      }
    }, 3000)
  })
}

fetchData()
  .then((data) => {
    console.log(data.toLowerCase());
    return data
  })
  .then((value) => console.log(value))
  .catch((error) => console.error(error))
