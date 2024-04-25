import React, { useEffect, useState, useRef } from "react";
import styles from "./slideshow.module.css";

const Slideshow: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideTexts = [
    "Beëindig armoede overal en in al haar vormen",
    "Beëindig honger, bereik voedselzekerheid en verbeterde voeding en promoot duurzame landbouw",
    "Verzeker een goede gezondheid en promoot welzijn voor alle leeftijden",
    "Verzeker gelijke toegang tot kwaliteitsvol onderwijs en bevorder levenslang leren voor iedereen",
    "Bereik gendergelijkheid en empowerment voor alle vrouwen en meisjes",
    "Verzeker toegang tot duurzaam beheer van water en sanitatie voor iedereen",
    "Verzeker toegang tot betaalbare, betrouwbare, duurzame en moderne energie voor iedereen",
    "Bevorder aanhoudende, inclusieve en duurzame economische groei, volledige en productieve tewerkstelling en waardig werk voor iedereen",
    "Bouw veerkrachtige infrastructuur, bevorder inclusieve en duurzame industrialisering en stimuleer innovatie",
    "Dring ongelijkheid in en tussen landen terug",
    "Maak steden en menselijke nederzettingen inclusief, veilig, veerkrachtig en duurzaam",
    "Verzeker duurzame consumptie- en productiepatronen",
    "Neem dringend actie om klimaatverandering en haar impact te bestrijden",
    "Behoud en maak duurzaam gebruik van oceanen, zeeën en maritieme hulpbronnen",
    "Bescherm, herstel en bevorder het duurzaam gebruik van ecosystemen op het vasteland, beheer bossen en wouden duurzaam, bestrijd woestijnvorming, stop landdegradatie en draai het terug en roep het verlies aan biodiversiteit een halt toe",
    "Bevorder vreedzame en inclusieve samenlevingen met het oog op duurzame ontwikkeling, verzeker toegang tot justitie voor iedereen en bouw op alle niveaus doeltreffende, verantwoordelijke en toegankelijke instellingen uit",
    "Versterk de implementatiemiddelen en revitaliseer het wereldwijd partnerschap voor duurzame ontwikkeling",
  ];

  // Ref for the container to get the width
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
    const totalSlidesWidth = containerWidth * slideTexts.length;

    const carousel = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideTexts.length);
    }, 5000);

    return () => clearInterval(carousel);
  }, [slideTexts]);

  return (
    <div ref={containerRef} className={`${styles.sdg_slideshow} ${styles.max_width}`}>
      <div className={styles.slidesContainer}>
        <div className={styles.slideContainer}>
          {slideTexts.map((text, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                transform: `translateX(-${slideIndex * (containerRef.current?.getBoundingClientRect().width || 0) / 3}px)`,
                transition: "transform 1s ease-in-out",
              }}
            >
              <a
                href="https://www.sdgnederland.nl/de-17-sdgs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.imageContainer}>
                  <img
                    className={`${styles.mySlides}`}
                    src={`Images/SDG's/SDG_${index + 1}.png`}
                    alt={`Slide ${index + 1}`}
                  />
                  <div className={styles.slideText}>{text}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
