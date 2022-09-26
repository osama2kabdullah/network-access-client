import React, { useEffect, useState } from "react";

const Home = () => {
  const [vTopics, setVtopics] = useState([]);
  //availbale data
  const [page, setpage] = useState([]);
  useEffect(()=> {
    fetch('http://localhost:5000/dataQuantity')
    .then(res=>res.json())
    .then(data=>{
        setpage(data.result);
    })
  },[])
  //pagination
  const [currentpage, setCurrentpage] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/volenteerTopics?page=${currentpage}`)
      .then((res) => res.json())
      .then((data) => setVtopics(data));
  }, [currentpage]);

  return (
    <div>
      <h1>Home</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: '3em', margin: '4em'}}>
        {vTopics.map((data) => (
          <div class="card">
            <img src={data.picture} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', gap:'1em', fontSize:'1.1rem', margin:'2em 4em', border: '.5px solid'}}>
      {
        [...Array(Math.ceil(page/8)).keys()].map(key=><button onClick={()=>setCurrentpage(key)} style={ currentpage === key ? {backgroundColor: 'red',border: '.5px solid', padding:'0 15px'}: {border: '.5px solid', padding:'0 15px'}}>{key + 1}</button>)
      }
      </div>
    </div>
  );
};

export default Home;
