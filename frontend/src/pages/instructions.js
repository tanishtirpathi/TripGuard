import React from "react";
function TouristSurvivalGuide() {
  return (

    <div className="survival-guide">
      <header className="guide-header">
        <h1>Tourist Safety & Survival Guide</h1>
        <p>What to do in emergency situations - Complete Guidelines</p>
      </header>

      <div className="situations-grid">
        
        {/* Medical Emergency */}
        <div className="situation-card medical">
          <div className="card-icon">🚑</div>
          <h2>Medical Emergency</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Stay calm, do not panic</li>
                <li>Dial the local emergency number (108/102)</li>
                <li>Find the nearest hospital or clinic</li>
                <li>Keep travel insurance documents ready</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not take unknown medicines</li>
                <li>Do not delay in case of serious symptoms</li>
                <li>Do not hide your medical history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Theft/Robbery */}
        <div className="situation-card theft">
          <div className="card-icon">🚨</div>
          <h2>Theft / Robbery</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Prioritize safety, do not resist</li>
                <li>Go to the police station and file an FIR</li>
                <li>Inform your bank/credit card company</li>
                <li>Contact your embassy (in case of passport theft)</li>
                <li>File a claim with your insurance company</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not display valuables openly</li>
                <li>Do not go alone to isolated areas</li>
                <li>Do not carry too much cash</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lost/Stranded */}
        <div className="situation-card lost">
          <div className="card-icon">🧭</div>
          <h2>Lost / Stranded</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Mark your current location using GPS</li>
                <li>Use offline maps</li>
                <li>Ask safe-looking locals for help</li>
                <li>Call the tourist helpline</li>
                <li>Inform your hotel/family</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not panic, keep clear thinking</li>
                <li>Do not take unknown shortcuts</li>
                <li>Do not waste your phone battery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Natural Disaster */}
        <div className="situation-card disaster">
          <div className="card-icon">🌪️</div>
          <h2>Natural Disaster</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Move to a safe area immediately</li>
                <li>Follow official emergency alerts</li>
                <li>Secure important documents</li>
                <li>Keep your emergency kit ready</li>
                <li>Follow evacuation orders</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not stay in dangerous areas</li>
                <li>Do not rely on social media rumors</li>
                <li>Do not go sightseeing out of curiosity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Food Poisoning */}
        <div className="situation-card food">
          <div className="card-icon">🤢</div>
          <h2>Food Poisoning</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Stay hydrated - take ORS, coconut water</li>
                <li>Take rest, avoid heavy activity</li>
                <li>Follow BRAT diet (Banana, Rice, Apple, Toast)</li>
                <li>See a doctor in case of severe symptoms</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not eat street food during recovery</li>
                <li>Avoid dairy products</li>
                <li>Avoid self-medication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scams/Fraud */}
        <div className="situation-card scam">
          <div className="card-icon">⚠️</div>
          <h2>Scams / Fraud</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Stop the transaction immediately</li>
                <li>Alert your bank/card company</li>
                <li>Collect screenshots/evidence</li>
                <li>File a police complaint</li>
                <li>Report on the cybercrime portal</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Avoid “too good to be true” offers</li>
                <li>Do not share personal info with strangers</li>
                <li>Do not make transactions on unsecured WiFi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transportation Issues */}
        <div className="situation-card transport">
          <div className="card-icon">🚌</div>
          <h2>Transportation Problems</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Check alternative transport options</li>
                <li>Claim travel insurance (if applicable)</li>
                <li>Arrange accommodation (if needed)</li>
                <li>Inform connecting transport services</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not use unlicensed transport</li>
                <li>Do not pay in advance to unknown operators</li>
                <li>Avoid solo travel on risky routes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Communication Problems */}
        <div className="situation-card communication">
          <div className="card-icon">📱</div>
          <h2>Communication Issues</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Download translation apps (offline capable)</li>
                <li>Keep important phrases written in the local language</li>
                <li>Save embassy contact details</li>
                <li>Buy a local SIM card</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Be culturally sensitive when using gestures</li>
                <li>Do not share sensitive info on public WiFi</li>
                <li>Avoid over-dependence on phones - keep a backup plan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Issues */}
        <div className="situation-card legal">
          <div className="card-icon">⚖️</div>
          <h2>Legal Problems</h2>
          <div className="steps">
            <div className="step immediate">
              <strong>Do Immediately:</strong>
              <ul>
                <li>Politely cooperate, do not argue</li>
                <li>Contact your embassy immediately</li>
                <li>Learn about local laws</li>
                <li>Arrange legal help/lawyer</li>
                <li>Document everything properly</li>
              </ul>
            </div>
            <div className="step avoid">
              <strong>Avoid:</strong>
              <ul>
                <li>Do not ignore local laws</li>
                <li>Do not offer bribes</li>
                <li>Avoid aggressive behavior</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="emergency-contacts">
        <h2>📞 Emergency Contacts (India)</h2>
        <div className="contacts-grid">
          <div className="contact-item">
            <strong>Police:</strong> 100
          </div>
          <div className="contact-item">
            <strong>Ambulance:</strong> 108
          </div>
          <div className="contact-item">
            <strong>Fire:</strong> 101
          </div>
          <div className="contact-item">
            <strong>Tourist Helpline:</strong> 1363
          </div>
          <div className="contact-item">
            <strong>Women Helpline:</strong> 181
          </div>
          <div className="contact-item">
            <strong>Disaster Management:</strong> 108
          </div>
        </div>
      </div>

      <div className="general-tips">
        <h2>🎯 General Safety Tips</h2>
        <div className="tips-grid">
          <div className="tip">Always inform family/friends about your travel plans</div>
          <div className="tip">Keep copies of important documents (physical + digital)</div>
          <div className="tip">Research local customs and laws beforehand</div>
          <div className="tip">Always buy travel insurance with comprehensive coverage</div>
          <div className="tip">Keep emergency cash in different places</div>
          <div className="tip">Save local emergency numbers in your phone</div>
        </div>
      </div>
    
  

      <style>{`
        .survival-guide {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }
        
        .guide-header {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 20px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .guide-header h1 {
          font-size: 2.5rem;
          margin: 0 0 10px;
          font-weight: 700;
        }
        
        .guide-header p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .situations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }
        
        .situation-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 5px solid;
        }
        
        .situation-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        
        .situation-card.medical { border-left-color: #e74c3c; }
        .situation-card.theft { border-left-color: #f39c12; }
        .situation-card.lost { border-left-color: #3498db; }
        .situation-card.disaster { border-left-color: #9b59b6; }
        .situation-card.food { border-left-color: #2ecc71; }
        .situation-card.scam { border-left-color: #e67e22; }
        .situation-card.transport { border-left-color: #1abc9c; }
        .situation-card.communication { border-left-color: #34495e; }
        .situation-card.legal { border-left-color: #8e44ad; }
        
        .card-icon {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 15px;
        }
        
        .situation-card h2 {
          color: #2c3e50;
          font-size: 1.4rem;
          margin: 0 0 20px;
          text-align: center;
          font-weight: 600;
        }
        
        .steps {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .step {
          padding: 15px;
          border-radius: 10px;
          font-size: 0.95rem;
        }
        
        .step.immediate {
          background: #d5f4e6;
          border-left: 4px solid #27ae60;
        }
        
        .step.avoid {
          background: #ffeaea;
          border-left: 4px solid #e74c3c;
        }
        
        .step strong {
          display: block;
          margin-bottom: 8px;
          font-size: 1rem;
        }
        
        .step ul {
          margin: 0;
          padding-left: 18px;
        }
        
        .step li {
          margin-bottom: 5px;
          line-height: 1.4;
        }
        
        .emergency-contacts {
          background: white;
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        
        .emergency-contacts h2 {
          color: #c0392b;
          font-size: 1.5rem;
          margin: 0 0 20px;
          text-align: center;
        }
        
        .contacts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .contact-item {
          background: #ff6b6b;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 10px;
          font-weight: 500;
          font-size: 1rem;
        }
        
        .general-tips {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        
        .general-tips h2 {
          color: #27ae60;
          font-size: 1.5rem;
          margin: 0 0 20px;
          text-align: center;
        }
        
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }
        
        .tip {
          background: #f0f9ff;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #3b82f6;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .guide-header h1 { font-size: 2rem; }
          .guide-header p { font-size: 1rem; }
          .situations-grid {
            grid-template-columns: 1fr;
          }
          .survival-guide { padding: 15px; }
        }
      `}</style>
    </div>
  );
}

export default TouristSurvivalGuide;
