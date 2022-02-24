import React from "react";

export default function InfoCard({ label, value, icon }) {
  return (
    <article className="infoCard">
      <h2>{value}</h2>
      <p>{label}</p>
    </article>
  );
}
