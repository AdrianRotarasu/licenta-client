import React, { useState, useEffect } from 'react'
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from '../../firebase';
import { Link } from "react-router-dom";
import { message } from 'antd';
import Axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function CarPlate() {

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [imageResponse, setImageResponse] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const currentUser = useAuth();


  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'Sign out successfully',
        });
      })
      .catch((error) => console.log(error));
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  const handleRequest = async (event) => {
    event.preventDefault();
    setImageLoading(true)
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      console.log(formData)
      const response = await Axios.post('http://127.0.0.1:5000/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
      setImageResponse(response.data.toString());
      setImageLoading(false)
    } catch (error) {
      // Tratează erorile aici
      console.error(error);
    }

  };


  return (
    <>
      {contextHolder}
      {currentUser ? (
        <>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleRequest}>Trimite Request</button>
          <p>{`Signed In as ${currentUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>

          {imageLoading ? (
            <Spin indicator={antIcon} />
          ) : (
            imageResponse && (
              <img
                src={`http://127.0.0.1:5000/uploads/${imageResponse}`}
                alt="Modified Image"
              />
            )
          )}



        </>
      ) : (
        <>
          <p>Not logged in into an account</p>
          <div> need an account? click <Link to="/register">HERE</Link></div>
          <div> already have an account click <Link to="/login">HERE</Link></div>
        </>
      )}
    </>
  );

}

export default CarPlate;