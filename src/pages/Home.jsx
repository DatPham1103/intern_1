import React from "react";
import { Typography } from "antd";
import background from "../assets/7697201.jpg";
import "../styles/Home.css";

function Home() {
    return (
        <div>
            <div className="Imgcontainer">
                <img src={background} alt="background" />
            </div>
            <div className="bodyContainer">
                <div className="content">
                    <Typography.Title style={{ fontSize: "110px" }}>
                        Welcome home bro
                    </Typography.Title>
                    <Typography.Paragraph>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis
                    </Typography.Paragraph>
                </div>
            </div>
        </div>
    );
}

export default Home;
