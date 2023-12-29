import "./App.css";
import { useState } from "react";

function App() {
    const [img, setImg] = useState("");
    const sendFile = async (e) => {
        e.preventDefault();
        let file = e.target.parentElement.querySelector("input").files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImg(reader.result);
        };
    };
    console.log(img);
    return (
        <>
            <form action="">
                <label htmlFor="">Image File</label>
                <input type="file" />
                <button onClick={sendFile}>Send</button>
            </form>
        </>
    );
}

export default App;
