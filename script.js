
document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // 1. 팀 대진표 생성
    // =================================

    const modes = [
        { id: "fiveList", count: 5 },
        { id: "fourList", count: 4 },
        { id: "twoList", count: 2 }
    ];

    modes.forEach(function (mode) {

        const list = document.getElementById(mode.id);

        for (let i = 0; i < mode.count; i++) {

            const row = document.createElement("div");
            row.className = "match-row";

            const left = document.createElement("input");
            left.type = "text";
            left.className = "player left";
            left.placeholder = "왼쪽 선수";

            const vs = document.createElement("span");
            vs.className = "vs";
            vs.textContent = "VS";

            const right = document.createElement("input");
            right.type = "text";
            right.className = "player right";
            right.placeholder = "오른쪽 선수";

            row.appendChild(left);
            row.appendChild(vs);
            row.appendChild(right);

            list.appendChild(row);
        }
    });


    // =================================
    // 2. 팀 랜덤 추첨
    // =================================

    const drawButtons = document.querySelectorAll(".draw-button[data-mode]");

    drawButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const mode = button.dataset.mode;

            const listId = {
                five: "fiveList",
                four: "fourList",
                two: "twoList"
            };

            const list = document.getElementById(listId[mode]);
            const rows = list.querySelectorAll(".match-row");

            // 모든 입력칸 검사
            for (const row of rows) {

                const left = row.querySelector(".player.left");
                const right = row.querySelector(".player.right");

                if (left.value.trim() === "" || right.value.trim() === "") {
                    alert("모든 선수 이름을 입력해주세요.");
                    return;
                }
            }

            // 각 줄끼리만 독립적으로 자리 변경
            rows.forEach(function (row) {

                const left = row.querySelector(".player.left");
                const right = row.querySelector(".player.right");

                // 50% 확률로 자리 변경
                if (Math.random() < 0.5) {

                    const temp = left.value;

                    left.value = right.value;
                    right.value = temp;
                }
            });

        });

    });


    // =================================
    // 3. 팀 대진표 초기화
    // =================================

    const clearButtons = document.querySelectorAll(".clear-button");

    clearButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const mode = button.dataset.mode;

            const listId = {
                five: "fiveList",
                four: "fourList",
                two: "twoList"
            };

            const list = document.getElementById(listId[mode]);

            list.querySelectorAll("input").forEach(function (input) {
                input.value = "";
            });

        });

    });


    // =================================
    // 4. 발로란트 맵 목록
    // =================================

    const valorantMaps = [
        "어비스",
        "어센트",
        "바인드",
        "브리즈",
        "코로드",
        "프랙처",
        "헤이븐",
        "아이스박스",
        "로터스",
        "펄",
        "스플릿",
        "서밋",
        "선셋"
    ];

    const mapList = document.getElementById("mapList");
    const mapResult = document.getElementById("mapResult");

    const selectAllBtn = document.getElementById("selectAllBtn");
    const deselectAllBtn = document.getElementById("deselectAllBtn");
    const mapDrawBtn = document.getElementById("mapDrawBtn");


    // =================================
    // 5. 맵 선택 버튼 만들기
    // =================================

    valorantMaps.forEach(function (map) {

        const label = document.createElement("label");
        label.className = "map-option selected";

        const name = document.createElement("span");
        name.textContent = map;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = map;
        checkbox.checked = true;

        checkbox.addEventListener("change", function () {

            label.classList.toggle("selected", checkbox.checked);

        });

        label.appendChild(name);
        label.appendChild(checkbox);

        mapList.appendChild(label);

    });


    // =================================
    // 6. 전체 맵 선택
    // =================================

    selectAllBtn.addEventListener("click", function () {

        mapList.querySelectorAll("input").forEach(function (checkbox) {

            checkbox.checked = true;
            checkbox.closest(".map-option").classList.add("selected");

        });

    });


    // =================================
    // 7. 전체 맵 해제
    // =================================

    deselectAllBtn.addEventListener("click", function () {

        mapList.querySelectorAll("input").forEach(function (checkbox) {

            checkbox.checked = false;
            checkbox.closest(".map-option").classList.remove("selected");

        });

    });


    // =================================
    // 8. 선택된 맵 중 랜덤 추첨
    // =================================

    mapDrawBtn.addEventListener("click", function () {

        const selectedMaps = Array.from(
            mapList.querySelectorAll("input:checked")
        ).map(function (checkbox) {
            return checkbox.value;
        });

        if (selectedMaps.length === 0) {

            alert("맵을 하나 이상 선택해주세요.");
            return;

        }

        const randomIndex = Math.floor(Math.random() * selectedMaps.length);

        const selectedMap = selectedMaps[randomIndex];

        mapResult.textContent = selectedMap;

    });

});
