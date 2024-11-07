import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "https://foody-zone-ed34.onrender.com";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterdata, setfilterdata] = useState(null);
  const [selectedbtn, setselectedbtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);
        setfilterdata(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fatch data");
      }
    };
    fetchFoodData();
  }, []);

  const serchFood = (e) => {
    const serchValue = e.target.value;
    if (serchValue === "") {
      setfilterdata(null);
    }
    const filter = data.filter((food) =>
      food.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilterdata(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setfilterdata(data);
      setselectedbtn("all");
      return;
    }
    const filter = data.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilterdata(filter);
    setselectedbtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  // const temp = [
  //   {
  //     "name": "Boilded Egg",
  //     "price": 10,
  //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //     "image": "/images/egg.png",
  //     "type": "breakfast"
  //   },
  // ]

  // console.log(data);

  // fetchFoodData() // use like this components are go to infinite loop so don't use like this use to useEffect

  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/images/logo.svg" alt="" />
          </div>
          <div className="search">
            <input
              onChange={serchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isselected={selectedbtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filterdata} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${(isselected) => (isselected ? "#f22f2f" : "#ff4363")};
  outline: 1px solid ${(isselected) => (isselected ? "white" : "#ff4363")};
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
