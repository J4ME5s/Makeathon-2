function yourFunction(callback) {
    // Your function logic here

    // Simulating asynchronous behavior with setTimeout
    setTimeout(function () {
        console.log("Function execution complete");
        callback(); // Call the callback when the function is done
    }, 2000); // 2000 milliseconds (2 seconds) delay for simulation
}