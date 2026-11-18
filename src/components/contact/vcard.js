import { SITE } from "../../data/site.js";

/**
 * Generates and triggers download of a standardized .vcf vCard file
 * with verified contact details for Thivanka Tharuka.
 */
export function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Priyantha;Gunamunige Thivanka Tharuka;;;
FN:Thivanka Tharuka
TITLE:${SITE.role}
ORG:${SITE.school}
EMAIL;type=INTERNET,pref:${SITE.email}
TEL;type=CELL,pref:${SITE.phone}
URL;type=WORK:${SITE.url}
URL;type=GITHUB:${SITE.github}
URL;type=LINKEDIN:${SITE.linkedin}
ADR;type=HOME:;;${SITE.address};;;Sri Lanka
NOTE:${SITE.role} · CS Undergraduate at NSBM Green University (2024-2028). Java, Spring Boot, React, TypeScript, Kotlin.
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Thivanka_Tharuka.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
