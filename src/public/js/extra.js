document.addEventListener("htmx:beforeSwap", function (evt) {
    // Handle successful requests
    if (evt.detail.xhr.status === 200) {
      console.log("event", evt);
      evt.detail.shouldSwap = true;
      // remove response message after 2 seconds
      setTimeout(() => {
        document.getElementById("result").innerHTML = "";
      }, 2000);
      //handle other status code
    } else {
      alert(evt.detail.serverResponse);
    }
  });