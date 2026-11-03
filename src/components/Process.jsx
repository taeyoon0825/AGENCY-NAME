import { useRef } from 'react';
import { processSteps } from '../data/siteContent.js';
import { useActiveItem } from '../hooks/useActiveItem.js';

export default function Process() {
  const refs = useRef([]);
  const activeStep = useActiveItem(refs);

  return (
    <section id="process" className="section process light-section">
      <div className="process__grid">
        <div className="process__heading" data-reveal>
          <p className="eyebrow">HOW WE WORK</p>
          <h2 className="section-title">
            처음이라도,
            <br />
            과정은 명확하게.
          </h2>
        </div>
        <div className="process__list">
          {processSteps.map((step, index) => (
            <article
              ref={(node) => {
                refs.current[index] = node;
              }}
              className={`process-step ${activeStep === index ? 'is-active' : ''}`}
              key={step.number}
              data-step={index}
              data-reveal
            >
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
