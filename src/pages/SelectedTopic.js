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
            user?.email, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        setDatas(data);
      };
      loadUserSelectedData();
    }
  }, [user?.email]);
  return (
    <div>
      <h2>selected topic {datas?.length}</h2>
      <div
        className="d-grid mx-5"
        style={{ gridTemplateColumns: "auto auto auto", gap: "5em" }}
      >
        {datas.map((data) => (
          <div class="card">
            <img src={data?.picture} class="card-img" alt="..." />
            <div class="card-img-overlay">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small>Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTopic;
