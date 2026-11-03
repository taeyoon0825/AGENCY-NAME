import { useRef } from 'react';
import { services } from '../data/siteContent.js';
import { useActiveItem } from '../hooks/useActiveItem.js';

export default function Services() {
  const itemRefs = useRef([]);
  const activeIndex = useActiveItem(itemRefs);

  return (
    <section id="services" className="section services light-section">
      <div className="services__grid">
        <aside className="services__sticky" data-reveal>
          <p className="eyebrow">WHAT WE DO</p>
          <h2 className="section-title">
            협업의 시작부터
            <br />
            콘텐츠가 공개되는 순간까지.
          </h2>
          <p className="services__scope">
            세부 제작과 현장 운영 범위는 캠페인 목표와 조건에 따라 협의합니다.
          </p>
          <div className="service-progress" aria-label="서비스 진행 표시">
            {services.map((service, index) => (
              <span
                key={service.number}
                className={activeIndex === index ? 'is-active' : ''}
                aria-current={activeIndex === index ? 'step' : undefined}
              >
                {service.number}
              </span>
            ))}
          </div>
        </aside>

        <div className="service-list">
          {services.map((service, index) => (
            <article
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="service-item"
              key={service.number}
              data-index={index}
              data-reveal
            >
              <div className="service-item__media">
                <img
                  src={service.image}
                  alt={service.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                />
              </div>
              <div className="service-item__copy">
                <span className="service-item__number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
