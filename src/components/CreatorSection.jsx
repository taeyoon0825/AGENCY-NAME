export default function CreatorSection({ onContactClick }) {
  return (
    <section className="creator-band">
      <div className="creator-band__inner">
        <div className="creator-band__copy" data-reveal>
          <p className="eyebrow">FOR CREATORS</p>
          <h2 className="section-title">
            당신의 콘텐츠와
            <br />
            어울리는 브랜드를 만나요.
          </h2>
          <p>
            자신만의 시선으로 콘텐츠를 만드는 크리에이터를 기다립니다. 활동 채널과 관심 분야를
            알려주시면 협업 검토 시 참고하겠습니다.
          </p>
          <button
            className="button button--dark"
            type="button"
            onClick={() => onContactClick('creator')}
          >
            크리에이터 협업 지원
          </button>
        </div>
        <div className="creator-visual" aria-hidden="true" data-reveal>
          <div className="mini-frame mini-frame--large">
            <span>CONTENT PLAN</span>
            <strong>Brand fit</strong>
            <small>channel / tone / schedule</small>
          </div>
          <div className="mini-frame mini-frame--small">
            <span>COLLAB</span>
            <strong>Creator note</strong>
            <small>category / platform</small>
          </div>
        </div>
      </div>
    </section>
  );
}
