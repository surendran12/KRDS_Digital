import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://krds-assignment.github.io/aoc/api-assets/data.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === data.features.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? data.features.length - 1 : prevSlide - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {data && (
        <>
          <img src={data.logo} alt="Logo" className="weblogo" />
          <div className="featureblockmain">
            {data.features.map((feature, index) => (
              <div className={`featureblock ${index === currentSlide ? 'active' : ''}`} key={index}>
                <div className="featureblockleft">
                  <img src={feature.logo} alt="Logo" />
                  <h3>{feature.title}</h3>
                  <div className="divider"></div>
                  <p>{feature.desc}</p>
                </div>
                <div className="featureblockright">
                  <img src={feature.image} alt="img" />
                </div>
              </div>
            ))}

            <div onClick={goToPrevSlide} className="arrows prevBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                <path d="M5.15326 11.6655C4.96186 11.6655 4.76996 11.5923 4.62346 11.4467L0.758756 7.59322C0.332956 7.16842 0.098157 6.60302 0.097657 6.00042C0.097157 5.39782 0.332056 4.83242 0.758756 4.40572L4.62396 0.553223C4.91696 0.261223 5.39206 0.261223 5.68446 0.555223C5.97696 0.848223 5.97596 1.32282 5.68246 1.61572L1.81776 5.46822C1.67566 5.60982 1.59756 5.79932 1.59756 6.00042C1.59756 6.20062 1.67566 6.38912 1.81776 6.53072L5.68296 10.3842C5.97596 10.6772 5.97686 11.1518 5.68446 11.4447C5.53796 11.5922 5.34556 11.6655 5.15326 11.6655Z" fill="#fff" />
              </svg>
            </div>
            <div onClick={goToNextSlide} className="arrows nextBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                <path d="M5.15326 11.6655C4.96186 11.6655 4.76996 11.5923 4.62346 11.4467L0.758756 7.59322C0.332956 7.16842 0.098157 6.60302 0.097657 6.00042C0.097157 5.39782 0.332056 4.83242 0.758756 4.40572L4.62396 0.553223C4.91696 0.261223 5.39206 0.261223 5.68446 0.555223C5.97696 0.848223 5.97596 1.32282 5.68246 1.61572L1.81776 5.46822C1.67566 5.60982 1.59756 5.79932 1.59756 6.00042C1.59756 6.20062 1.67566 6.38912 1.81776 6.53072L5.68296 10.3842C5.97596 10.6772 5.97686 11.1518 5.68446 11.4447C5.53796 11.5922 5.34556 11.6655 5.15326 11.6655Z" fill="#fff" />
              </svg>
            </div>

            <div className="dots">
              {data.features.map((_, index) => (
                <div key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)}></div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
