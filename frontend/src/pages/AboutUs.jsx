import React from "react";
import Deskription from "../components/About/Deskription.jsx";
import VisionMission from "../components/About/VisionMission.jsx";
import OurValues from "../components/About/OurValues.jsx";
import Founders from "../components/About/Founders.jsx";

const AboutUs = () => {
    return (
        <div>
            <Deskription />
            <div className="max-w-full mx-auto px-8 mt-8">
                <VisionMission />
            </div>
            <OurValues />
            <Founders />
        </div>
    );
}

export default AboutUs