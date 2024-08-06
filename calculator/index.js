function plus(a,b) {
    const input1 = document.getElementById("btn11").value;
    const input2 = document.getElementById("btn22").value;
    var a = parseInt(input1);
    var b = parseInt(input2);
    let result = a + b;
    document.getElementById("result111").value = result;
}
function minus(a,b) {
    return a - b;
}