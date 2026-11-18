import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Linkedin, Github } from "../BrandIcons.jsx";
import { SITE } from "../../data/site.js";

const CHANNELS = [
  {
    key: "email",
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
    external: false,
    tooltip: "Send a direct email",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: SITE.whatsappDisplay,
    href: SITE.whatsappPrefillHref || SITE.whatsappHref,
    icon: MessageCircle,
    external: true,
    tooltip: "Chat directly on WhatsApp",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "Thivanka Tharuka",
    href: SITE.linkedin,
    icon: Linkedin,
    external: true,
    tooltip: "Connect on LinkedIn",
  },
  {
    key: "github",
    label: "GitHub",
    value: "@Thiva123-ab",
    href: SITE.github,
    icon: Github,
    external: true,
    tooltip: "Review code & repositories",
  },
];

export default function ContactChannelCards() {
  return (
    <div className="contact-channels-grid" role="list" aria-label="Direct Communication Channels">
      {CHANNELS.map((ch) => {
        const IconComponent = ch.icon;

        return (
          <a
            key={ch.key}
            href={ch.href}
            target={ch.external ? "_blank" : undefined}
            rel={ch.external ? "noopener noreferrer" : undefined}
            className="contact-channel-card"
            data-cursor="hover"
            title={ch.tooltip}
            role="listitem"
          >
            <div className="contact-channel-icon-wrap" aria-hidden="true">
              <IconComponent size={20} />
            </div>

            <div className="contact-channel-info">
              <span className="contact-channel-label">{ch.label}</span>
              <span className="contact-channel-value truncate">{ch.value}</span>
            </div>

            <span className="contact-channel-arrow" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          </a>
        );
      })}
    </div>
  );
}
