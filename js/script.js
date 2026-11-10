fetch("menu.json")
    .then(response => response.json())
    .then(menu => {

        const breakfastMenu = document.getElementById("breakfastMenu");
        const lunchMenu = document.getElementById("lunchMenu");
        const dinnerMenu = document.getElementById("dinnerMenu");

        menu.forEach(item => {

            const li = document.createElement("li");
            li.textContent = item.name;

            if (item.time === "Breakfast") {
                breakfastMenu.appendChild(li);
            }
            else if (item.time === "Lunch") {
                lunchMenu.appendChild(li);
            }
            else if (item.time === "Dinner") {
                dinnerMenu.appendChild(li);
            }

        });

    })
    .catch(error => console.error("Error loading menu:", error));