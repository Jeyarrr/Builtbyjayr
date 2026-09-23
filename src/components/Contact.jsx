import { useState } from "react";
import { Sparkles, ArrowUpRight, Send, Copy } from "lucide-react";
import { profile } from "../content";
import BrandIcon from "./BrandIcon";
import { Reveal, RevealText } from "../motion/MotionSystem";
export default function Contact() {
  const [status, setStatus] = useState("");
  const [inquiry, setInquiry] = useState("");
  async function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hi Jayr,\n\n${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`;
    if (profile.email) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let’s build something together")}&body=${encodeURIComponent(text)}`;
      setStatus(
        "Your email app will open with your inquiry. Send it from there.",
      );
    } else {
      setInquiry(text);
      try {
        await navigator.clipboard.writeText(text);
        setStatus(
          "Inquiry copied. Contact details are coming soon; nothing has been sent.",
        );
      } catch {
        setStatus(
          "Your inquiry is ready below. Copy it to save it; nothing has been sent.",
        );
      }
    }
  }
  return (
    <section id="contact" className="contact-section section-space">
      <div className="container">
        <Reveal>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="eyebrow">
                <span className="section-index">06</span> LET’S CONNECT
              </span>
              <RevealText>
                Have something
                <br />
                in <span className="serif-accent">mind?</span>
                <Sparkles className="contact-spark" />
              </RevealText>
              <p>
                Good things start with a conversation.
                <br />
                Tell me what you’re thinking. Let’s build it together.
              </p>
              {profile.email ? (
                <a className="email-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <ArrowUpRight size={20} />
                </a>
              ) : (
                <span className="contact-note">
                  Contact details coming soon.
                </span>
              )}
              <div className="socials">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    <BrandIcon name="GitHub" size={18} /> GitHub{" "}
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    <BrandIcon name="LinkedIn" size={18} /> LinkedIn{" "}
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-form" onSubmit={submit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="How should I call you?"
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      required
                      maxLength={254}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message">What are you thinking?</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder="A website, an idea, or just a hello…"
                      rows={4}
                      required
                      maxLength={5000}
                    />
                  </div>
                </div>
                <button className="primary-button contact-submit" type="submit">
                  {profile.email ? "Start a conversation" : "Copy your inquiry"}
                  {profile.email ? <Send size={17} /> : <Copy size={17} />}
                </button>
                <p className="form-note">
                  {profile.email
                    ? "Opens your email app. No data is stored on this website."
                    : "Email isn’t configured yet. You can draft and copy your message."}
                </p>
                <p
                  className="form-status"
                  role="status"
                  aria-label="Contact form status"
                >
                  {status}
                </p>
                {inquiry && (
                  <textarea
                    className="form-control"
                    aria-label="Your inquiry, ready to copy"
                    readOnly
                    value={inquiry}
                    rows={5}
                  />
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
