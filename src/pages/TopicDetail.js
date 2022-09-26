import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const TopicDetail = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { tpicId } = useParams();

  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://sleepy-brushlands-75204.herokuapp.com/topicdetail/" + tpicId)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [tpicId]);
  console.log(tpicId);
  //hndleAddToDb
  const email = user?.email;
  const { about, picture } = data;
  const savingData = { email, about, picture };
  const hndleAddToDb = () => {
    if (!user) {
     alert('you must login first');
     return;
    }
    fetch("https://sleepy-brushlands-75204.herokuapp.com/addTopic", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(savingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate("/selectedTopic");
        }
      });
  };
  return (
    <div class="card mb-3" style={{ maxWidth: "540px" }}>
      <div class="row g-0">
        <div class="col-md-4">
          <img src={data?.picture} class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Title</h5>
            <p class="card-text">{data?.about}</p>

            <button onClick={hndleAddToDb} class="btn btn-primary">
              Select this topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
