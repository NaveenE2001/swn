import React, { useState } from "react";
import Banner from "./Banner";
import Dashboard from "./Dashboard";

function App() {
  const [bannerData, setBannerData] = useState({
    visible: true,
    description: "",
    timer: 0,
    link: "",
  });

  return (
    <div className="App">
      <Banner
        visible={bannerData.visible}
        description={bannerData.description}
        timer={bannerData.timer}
        link={bannerData.link}
      />
      <Dashboard setBannerData={setBannerData} />
    </div>
  );
}

export default App;
