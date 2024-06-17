const form = document.getElementById("form");
const input = document.getElementById("input");

const tbody = document.getElementById("tbody");
const limit = document.getElementById("limit");
const priority = document.getElementById("priority");

//ローカルストレージに保存したリストのデータ(text,completed))を受け取る
const todos = JSON.parse(localStorage.getItem("todos"));
console.log(todos);

//ローカルストレージにデータが保存されていた場合は最初にそれをリストに追加する
if(todos){
    todos.forEach(todo => {
        add(todo);
    })
}

//フォームタグに、フォームが追加されたらリストに追加するイベントを仕込む
form.addEventListener("submit", (event) => {
    event.preventDefault();
    add();
});


//作成したToDoをリストに追加する
function add(todo){
    //フォームに入力された値を取得
    let todoText = input.value;
    let todoLimit = limit.value;
    let todoPriority = priority.value;

    //todoがtrueになるのはローカルストレージに保存された値を追加する時だけ
    //その他の場合trueはundifinedになる
    if(todo){
        todoText = todo.todo;
        todoLimit = todo.limit;
        todoPriority = todo.priority;
    }

    //フォームに入力された値/ローカルストレージ がtrueの時だけ動く
    if(todoText){
        //期日,ToDo,優先度を入れるtr,tdタグを作る
        const tr = document.createElement("tr");
        const td_lim = document.createElement("td");
        const td_todo = document.createElement("td");
        const td_pri = document.createElement("td");

        td_lim.classList.add("limit");
        td_todo.classList.add("todo");
        td_pri.classList.add("priority");

        //作ったタグに文字を入れる
        td_lim.innerText = todoLimit;
        td_todo.innerText = todoText;
        td_pri.innerText = todoPriority;

        //作成したtrタグに右クリックで削除するイベントを仕込む
        tr.addEventListener("contextmenu", (event) => {
            event.preventDefault()
            tr.remove();
            saveData();
        });

        //ローカルストレージの値の再記述時は作成したリストタグにクラスを付与することがある
        //ローカルストレージに取り消し線は保存できないため、再記述時にcompletedを参照して取り消し線をつける
        if(todo && todo.completed){
            tr.classList.add("text-decoration-line-through");
        }

        //作成したリストタグにクリックしたら完了として取り消し線をつけるイベントを仕込む
        tr.addEventListener("click", () => {
            tr.classList.toggle("text-decoration-line-through");
            saveData();
        });

        //作って加工したタグを追加する
        tbody.appendChild(tr);
        tr.appendChild(td_lim);
        tr.appendChild(td_todo);
        tr.appendChild(td_pri);


        //フォームの初期化
        input.value = "";

        //逐一ローカルストレージに保存する
        saveData();
    }
}

//ToDoリストをローカルストレージに保存する
function saveData(){
    //保存先の配列
    let todos = [];

    //登録されたリストの数(行数)を取得
    const trs = document.querySelectorAll("tbody > tr");
    console.log(trs);

    //行数の分だけ、各行各列の要素を取得してオブジェクト化し、保存用の配列に格納する
    for(let i=0; i<trs.length; i++){
        let todo = {
            limit: document.getElementsByClassName("limit")[i].innerText,
            todo: document.getElementsByClassName("todo")[i].innerText,
            priority: document.getElementsByClassName("priority")[i].innerText,
            completed: trs[i].classList.contains("text-decoration-line-through")
        }
        todos.push(todo);
    }
    console.log(todos);

    //ローカルストレージには文字列しか入れられないので配列を文字列化して格納する
    //後で文字列から元に戻してまた配列として扱う
    localStorage.setItem("todos", JSON.stringify(todos));
}