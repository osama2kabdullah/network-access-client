import React, { useEffect, useState } from "react";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const SelectedTopic = () => {
  const [user] = useAuthState(auth);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    if (user?.email) {
      const loadUserSelectedData = async () => {
        const { data } = await axios.get(
          "https://sleepy-brushlands-75204.herokuapp.com/selectedtopics?email=" +
            user?.email,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setDatas(data);
      };
      loadUserSelectedData();
    }
  }, [user?.email]);
  
  //delete topic
  const deleteTopic = id => {
    const procced = window.confirm('deleting??')
    if(procced){
      fetch('https://sleepy-brushlands-75204.herokuapp.com/delete/'+id, {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
    //rm from ui
    const rest = datas.filter(data=>data?._id !== id);
    setDatas(rest);
    }
  }
  
  return (
    <div>
      <h2>selected topic {datas?.length}</h2>
      <div
        className="d-grid mx-5"
        style={{ gridTemplateColumns: "auto auto auto", gap: "5em" }}
      >
        {datas.map((data) => (
          <div class="card" style={{width: '18rem'}}>
            <img src={data?.picture} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button onClick={()=>deleteTopic(data?._id)} class="btn btn-primary">
                Delete trhis topic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTopic;
