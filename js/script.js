// This is for json file to populate the menu items in the review.html page and menu.html page.

fetch("menu.json")
    .then(response => response.json())
    .then(menu => {

        const breakfastMenu = document.getElementById("breakfastMenu");
        const lunchMenu = document.getElementById("lunchMenu");
        const dinnerMenu = document.getElementById("dinnerMenu");


        const breakfastSelect = document.getElementById("breakfast")
        const lunchSelect = document.getElementById("lunch")
        const dinnerSelect = document.getElementById("dinner")

        menu.forEach(item => {
        

            if (breakfastMenu && item.time === "Breakfast") {
                const li = document.createElement("li");
                li.textContent = item.name; 
                breakfastMenu.appendChild(li);
            }
            if (lunchMenu && item.time === "Lunch") {
                const li = document.createElement("li");
                li.textContent = item.name;
                lunchMenu.appendChild(li);
            }
            if (dinnerMenu && item.time === "Dinner") {
                const li = document.createElement("li");
                li.textContent = item.name;
                dinnerMenu.appendChild(li);
            }


            if (breakfastSelect && item.time === "Breakfast") {
                const option = document.createElement("option");
                option.value = item.name.toLowerCase().replace(/\s+/g, '-');
                option.textContent = item.name;
                breakfastSelect.appendChild(option);
            }
            if (lunchSelect && item.time === "Lunch") {
                const option = document.createElement("option");
                option.value = item.name.toLowerCase().replace(/\s+/g, '-');
                option.textContent = item.name;
                lunchSelect.appendChild(option);
            }
            if (dinnerSelect && item.time === "Dinner") {
                const option = document.createElement("option");
                option.value = item.name.toLowerCase().replace(/\s+/g, '-');
                option.textContent = item.name;
                dinnerSelect.appendChild(option);
            }
        });

    })
    .catch(error => console.error("Error loading menu:", error));

// This is so a user can submit a review and is required for one menu item but not all 3 times.
const reviewForm = document.getElementById("review-form");
if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
        const breakfast = document.getElementById("breakfast").value;
        const lunch = document.getElementById("lunch").value;
        const dinner = document.getElementById("dinner").value;
        if (!breakfast && !lunch && !dinner) {
            event.preventDefault();
            alert("Please select at least one favorite menu item to review.");
        }
    });
}

// This is for the menu.html page to submit a request for a new menu item and display it on the page.
const menuRequestForm = document.getElementById("menuRequestForm");
const requestInput = document.getElementById("request");
const requestList = document.getElementById("requestList");
const requestFeedback = document.getElementById("requestFeedback");
const requestCount = document.getElementById("requestCount");

if (menuRequestForm) {
    menuRequestForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const requestedItem = requestInput.value.trim();

        if (!requestedItem) {
            requestFeedback.textContent = "Please enter a menu item to request.";
            requestFeedback.className = "error";
            return;
        }

        requestFeedback.innerHTML = `Thank you for your request: <strong>${requestedItem}</strong>. We will consider adding it to our menu!`;
        requestFeedback.className = "success";

        const li = document.createElement("li");
        li.textContent = requestedItem + " ";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove");

        li.appendChild(removeButton);
        requestList.appendChild(li);

        requestCount.textContent = requestList.children.length;

        requestInput.value = "";
    });

    requestList.addEventListener("click", (event) => {
        const button = event.target.closest("button.remove");
        if (!button || !requestList.contains(button)) return;
        button.closest("li").remove();
        requestCount.textContent = requestList.children.length;
    });

    const ClearAllBtn = document.getElementById("clearAllBtn");
    if (ClearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
            requestList.replaceChildren();
            requestCount.textContent = "0";
            requestFeedback.textContent = "All requests have been cleared.";
            requestFeedback.className = "";
        });
    }
}
