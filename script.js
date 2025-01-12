// Function to fetch and display prayer times
async function fetchPrayerTimes() {
    const latitude = 53.59779744613874;
    const longitude =  -1.269276054849512;
    const method = 4; // Umm al-Qura calculation method

    // Aladhan API endpoint
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    const jamaahTimes = {
        Fajr: "7:00",
        Dhuhr: "13:30",
        Asr: "",
        Maghrib: "5 min after Adhan",
        Isha: "19:00",
        Jummah: "13:00"
    };

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const timings = data.data.timings;
        const date = data.data.date.readable;

        // Setting Asr to match athan time
        jamaahTimes.Asr = timings.Asr;

        // Select the table body
        const tableBody = document.querySelector("#prayer-times tbody");
        tableBody.innerHTML = ""; // Clear any existing rows

        // Define the prayer names and corresponding times
        const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        
        prayers.forEach(prayer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${prayer}</td>
                <td>${timings[prayer]}</td>
                <td>${jamaahTimes[prayer]}</td>
            `;
            tableBody.appendChild(row);
        });

        //Jummah added for fridays
        const isFriday = new Date().getDay()==5;
        if(isFriday){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>Jummah</td>
                <td>${timings.Dhuhr}</td>
                <td>${jamaahTimes.Jummah}</td>
            `;
            tableBody.appendChild(row)        
        }

        // Update date
        document.getElementById("updated-date").innerText = `Updated for: ${date}`;
    } catch (error) {
        console.error("Error fetching prayer times:", error);
    }
}

// Call the function on page load
fetchPrayerTimes();
