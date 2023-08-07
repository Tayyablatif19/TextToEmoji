var clutter = "";

function encryption() {
    document.querySelector("#encrypt-btn").addEventListener("click", function() {
        clutter = "";

        var input = document.getElementById("txtmsg").value;
        console.log(input);

        var password = document.getElementById("password").value;
        console.log(password);

        const str = input.split("");
        console.log(str);

        str.forEach(element => {
            clutter += `&#128${element.charCodeAt().toString(16)}`; // Use the correct Unicode syntax for emojis
        });

        console.log(clutter);

        document.querySelector("#result").innerHTML = clutter;

        var dataarr = [];

        if (JSON.parse(localStorage.getItem('data1'))) {
            dataarr.push({ "pass": password, "input": input, "clutter": clutter });
        } else {
            dataarr = [{ "pass": password, "input": input, "clutter": clutter }];
        }

        localStorage.setItem('data1', JSON.stringify(dataarr));
    });
}

encryption();

function decryption() {
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
        var clutter2 = "";
        var input2 = document.querySelector("#emojimsg").value;

        var user = JSON.parse(localStorage.getItem('data1'));
        console.log(user);

        var str2 = input2.split(" ");
        str2.forEach(element => {
            clutter2 += `&#${element.codePointAt(0)}`;
        });
        console.log(clutter2);

        var found = user.find(i => i.clutter === clutter2); // Use Array.prototype.find() to find the correct entry

        if (found) {
            document.querySelector("#result").style.display = "block";
            document.querySelector("#result").style.color = "#eee";
            document.querySelector("#result").innerHTML = found.input;
        } else {
            document.querySelector("#result").style.display = "block";
            document.querySelector("#result").style.color = "red";
            document.querySelector("#result").innerHTML = "Decryption Failed";
        }
    });
}



decryption();

function btnClicking() {
    document.querySelector("#dec-btn").addEventListener("click", function() {
        document.querySelector("#decryption").style.display = "block";
        document.querySelector("#encryption").style.display = "none";
        document.querySelector("#dec-btn").style.backgroundColor = "#333";
        document.querySelector("#enc-btn").style.backgroundColor = "#222";
        document.querySelector("#main>h1 span img").style.transform = "rotate(180deg)";
        document.querySelector("#result").style.display = "none";
    });

    document.querySelector("#enc-btn").addEventListener("click", function() {
        document.querySelector("#encryption").style.display = "block";
        document.querySelector("#decryption").style.display = "none";
        document.querySelector("#dec-btn").style.backgroundColor = "#222";
        document.querySelector("#enc-btn").style.backgroundColor = "#333";
        document.querySelector("#main>h1 span img").style.transform = "rotate(0deg)";
        document.querySelector("#result").style.display = "none";
    });

    document.querySelector("#encrypt-btn").addEventListener("click", function() {
        document.querySelector("#result").style.display = "block";
    });

    document.querySelector("#decrypt-btn").addEventListener("click", function() {
        document.querySelector("#result").style.display = "block";
    });
}

btnClicking();
