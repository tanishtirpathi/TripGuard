import React, { useState } from "react";
import api from "../utils/api";
import { useTranslation } from "react-i18next";
import "./SOS.css";

const helplines = [
  { key: "police", number: "100", descriptionKey: "police_desc" },
  { key: "ambulance", number: "102", descriptionKey: "ambulance_desc" },
  { key: "fire_brigade", number: "101", descriptionKey: "fire_brigade_desc" },
  { key: "women_helpline", number: "1091", descriptionKey: "women_helpline_desc" },
  { key: "disaster_mgmt", number: "108", descriptionKey: "disaster_mgmt_desc" },
];

const SOS = () => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false); 

  const handleSOS = () => {
    if (!window.confirm(t("sos_confirm"))) return;
    setSending(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => sendSOS({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => sendSOS({ lat: null, lng: null })
      );
    } else {
      sendSOS({ lat: null, lng: null });
    }
  };

  const sendSOS = async (location) => {
    try {
      await api.post("/api/sos", { message: t("sos_message"), location });
      alert(t("sos_success"));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || t("sos_fail"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sos-container">
      <h1>{t("sos_title")}</h1>
      <p className="description">{t("sos_desc")}</p>

      <div className="sos-button-container">
        <button className="sos-button" onClick={handleSOS} disabled={sending}>
          {sending ? t("sending") : t("send_sos")}
        </button>
      </div>

      <div className="helpline-section">
        <h2>{t("important_helplines")}</h2>
        <div className="helpline-cards">
          {helplines.map((line) => (
            <div key={line.key} className="helpline-card">
              <h3>{t(line.key)}</h3>
              <p>{t(line.descriptionKey)}</p>
              <p>
                {line.number}
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(line.number)}
                >
                  {t("copy")}
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOS;