function getResults() {
    console.log("Getting orders through client-side...");

    let userid = $("userid").val();
    console.log("User Number: " + userid);

    $.post("/orderDetail", function(data) {
        console.log("Back from the server with:");
        console.log(data);

})
}