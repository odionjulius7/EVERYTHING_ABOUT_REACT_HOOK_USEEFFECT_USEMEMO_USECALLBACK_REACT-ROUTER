import React, { useState, useEffect } from "react";
import { data } from "../../../data";
import { Link, useParams } from "react-router-dom";
// the useParams hook is needed to identify that :id, :name passed
//  to this individual person page to deplay their details

const Person = () => {
  // NOTE: in a real world scenerio we will have to make an API call first to get
  // the data and check to see if any id in the data gotten matches the useParams :id passed to the page
  // if yes we return that in dividual person detail and display it value here
  // OR like this down here too
  const [name, setName] = useState("default name");
  const { id } = useParams(); // NOTE: we need destructure it this way to use that id passed to our path's attribute
  // the id of the useParams hook is alway string so make sure to check
  // and match them appropriately by converting to interger or string

  // console.log(useParams());
  useEffect(() => {
    const newPerson = data.find((person) => person.id === parseInt(id));
    setName(newPerson.name);
  }, []);
  return (
    <div>
      <h1>{name}</h1>
      <Link to="/people" className="btn">
        Back To People
      </Link>
    </div>
  );
};

export default Person;
