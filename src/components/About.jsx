import { principles } from '../data/siteContent.js';

export default function About() {
  return (
    <section id="about" className="section about light-section">
      <div className="section-grid">
        <div className="section-label" data-reveal>
          <p className="eyebrow">WHO WE ARE</p>
        </div>
        <div className="section-main">
          <h2
            className="section-title stagger-title"
            data-reveal
            aria-label="브랜드와 잘 맞는 사람, 사람을 움직이는 콘텐츠."
          >
            <span>브랜드와 잘 맞는 사람,</span>
            <span>사람을 움직이는 콘텐츠.</span>
          </h2>
          <div className="about__body" data-reveal>
            <p>우리는 브랜드의 고객층과 크리에이터의 콘텐츠를 함께 살펴봅니다.</p>
            <p>협업의 방향을 정하고, 제작과 게시 일정까지 이어지는 과정을 운영합니다.</p>
          </div>
          <div className="principles" data-reveal>
            {principles.map((item) => (
              <article className="principle" key={item.key}>
                <strong>{item.key}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
