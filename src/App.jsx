import { useState, useRef } from "react";
import { Search, Calendar, Users, MessageCircle, CreditCard, MapPin, Phone, Mail, Instagram, ChevronRight, ArrowLeft, Star, Clock, BookOpen, Heart, Send, Menu, X, ExternalLink, Shield, Info, Home, Plus, Check, AlertCircle, User, LogOut, ChevronDown, ChevronUp, Lock, Eye, EyeOff, FileText, Link2, Paperclip, RefreshCw } from "lucide-react";
import emailjs from '@emailjs/browser';

// ══════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID = "service_m1nqlpl";
const EMAILJS_TEMPLATE_ID = "template_cqo5qcg";
const EMAILJS_PUBLIC_KEY = "wY379dyi_pFHLJVl3";
// ══════════════════════════════════════════════════════════════


const C = { primary: "#1a3a5c", accent: "#2d7dd2", accentLight: "#e8f2fc", success: "#28a745", warm: "#f0883e", bg: "#f7f8fa", card: "#ffffff", text: "#1a1a2e", textSec: "#5a6377", border: "#e8eaef", danger: "#dc3545" };

const STUDY_GROUPS = [
  { id: 1, unit: "BIT210", title: "Web Development Study Group", members: 8, max: 12, campus: "Footscray Park", day: "Monday 2-4pm", desc: "Weekly HTML/CSS/JS practice sessions",
    chat: [{ id: 1, author: "Mei L.", text: "Hey everyone! Uploaded my CSS Grid notes. Check the resources tab.", time: "Mon 2:15 PM" }, { id: 2, author: "James K.", text: "Thanks Mei! Anyone else struggling with the flexbox assignment?", time: "Mon 2:22 PM" }, { id: 3, author: "Sarah M.", text: "Found a great YouTube tutorial on flexbox. Will share the link.", time: "Mon 2:30 PM" }, { id: 4, author: "Anonymous", text: "Can we go over responsive design next session?", time: "Mon 3:01 PM" }, { id: 5, author: "Mei L.", text: "Absolutely! Let's dedicate the first hour to it next Monday.", time: "Mon 3:10 PM" }],
    resources: [{ id: 1, title: "CSS Grid Complete Guide", type: "link", author: "Mei L.", time: "2 days ago", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }, { id: 2, title: "Week 5 Lecture Notes.pdf", type: "file", author: "Mei L.", time: "2 days ago", url: "https://www.w3.org/TR/css-grid-1/" }, { id: 3, title: "Flexbox Tutorial (YouTube)", type: "link", author: "Sarah M.", time: "1 day ago", url: "https://www.youtube.com/results?search_query=flexbox+tutorial" }] },
  { id: 2, unit: "BCO215", title: "Database Systems Revision", members: 5, max: 10, campus: "City Tower", day: "Wednesday 10am-12pm", desc: "SQL queries and ER diagrams review",
    chat: [{ id: 1, author: "David R.", text: "Anyone have practice questions for normalisation?", time: "Wed 10:05 AM" }, { id: 2, author: "Sarah M.", text: "I have a set from last year's exam. Uploading now.", time: "Wed 10:12 AM" }],
    resources: [{ id: 1, title: "Normalisation Practice Set", type: "file", author: "Sarah M.", time: "3 days ago", url: "https://www.w3schools.com/sql/sql_ref_sqlserver.asp" }, { id: 2, title: "SQL Cheat Sheet", type: "link", author: "David R.", time: "1 week ago", url: "https://www.sqltutorial.org/sql-cheat-sheet/" }] },
  { id: 3, unit: "BIT310", title: "Software Engineering Project Team", members: 6, max: 8, campus: "Footscray Park", day: "Thursday 1-3pm", desc: "Agile sprint planning and code reviews",
    chat: [{ id: 1, author: "Alex T.", text: "Sprint 3 starts tomorrow. Update your Jira tickets.", time: "Thu 1:00 PM" }, { id: 2, author: "Mei L.", text: "Done. PR for the login module is ready for review.", time: "Thu 1:15 PM" }],
    resources: [{ id: 1, title: "Sprint 3 Planning Doc", type: "file", author: "Alex T.", time: "1 day ago", url: "https://www.atlassian.com/agile/scrum/sprints" }, { id: 2, title: "GitHub Repo Link", type: "link", author: "Alex T.", time: "2 weeks ago", url: "https://github.com" }] },
  { id: 4, unit: "BAO220", title: "Accounting Principles Help", members: 4, max: 10, campus: "City Tower", day: "Tuesday 3-5pm", desc: "Problem-solving for assignments and exam prep",
    chat: [{ id: 1, author: "Priya S.", text: "Stuck on question 4 of the depreciation worksheet.", time: "Tue 3:10 PM" }, { id: 2, author: "Tom W.", text: "I can walk through it next session.", time: "Tue 3:25 PM" }],
    resources: [{ id: 1, title: "Depreciation Methods Summary", type: "file", author: "Tom W.", time: "3 days ago", url: "https://www.investopedia.com/terms/d/depreciation.asp" }] },
  { id: 5, unit: "BEO224", title: "Business Analytics Lab", members: 7, max: 10, campus: "Footscray Park", day: "Friday 11am-1pm", desc: "Excel, Tableau and data analysis practice",
    chat: [{ id: 1, author: "Lisa C.", text: "Tableau assignment due next Friday. Work on it Saturday?", time: "Fri 11:05 AM" }, { id: 2, author: "James K.", text: "I'm in. Library at 10am?", time: "Fri 11:12 AM" }],
    resources: [{ id: 1, title: "Tableau Getting Started Guide", type: "link", author: "Lisa C.", time: "1 week ago", url: "https://www.tableau.com/learn/training" }, { id: 2, title: "Sample Dataset - Sales.csv", type: "file", author: "Lisa C.", time: "5 days ago", url: "https://www.kaggle.com/datasets" }] },
];

const EVENTS = [
  { id: 1, title: "Orientation Week Welcome BBQ", date: "Sep 15, 2026", time: "12:00 PM", location: "Footscray Park Lawn", category: "Social", org: "Student Union", img: "\u{1F389}" },
  { id: 2, title: "Tech Career Fair 2026", date: "Sep 22, 2026", time: "10:00 AM", location: "City Tower Level 12", category: "Career", org: "Career Services", img: "\u{1F4BC}" },
  { id: 3, title: "Mental Health Awareness Workshop", date: "Sep 18, 2026", time: "2:00 PM", location: "Building K Room 302", category: "Wellbeing", org: "VU Counselling", img: "\u{1F9E0}" },
  { id: 4, title: "International Students Mixer", date: "Sep 20, 2026", time: "5:00 PM", location: "Footscray Park Cafe", category: "Social", org: "International Club", img: "\u{1F30F}" },
  { id: 5, title: "Hackathon: Build for Good", date: "Oct 1, 2026", time: "9:00 AM", location: "Innovation Hub", category: "Tech", org: "VU IT Society", img: "\u{1F4BB}" },
  { id: 6, title: "Resume Writing Workshop", date: "Sep 25, 2026", time: "1:00 PM", location: "City Tower Level 4", category: "Career", org: "Career Services", img: "\u{1F4DD}" },
];

const INITIAL_POSTS = [
  { id: 1, author: "Anonymous", text: "Does anyone know where to find free textbook PDFs for BIT210?", time: "2 hours ago", tag: "Academic", replies: [{ id: 101, author: "Sarah M.", text: "Check the VU library online - they have e-copies!", time: "1 hour ago" }, { id: 102, author: "Anonymous", text: "Try the secondhand book exchange on campus.", time: "45 min ago" }, { id: 103, author: "James K.", text: "Lecturer uploads extra chapters on VU Collaborate.", time: "30 min ago" }] },
  { id: 2, author: "Sarah M.", text: "Looking for someone to practise presentation skills before our group assessment.", time: "4 hours ago", tag: "Academic", replies: [{ id: 201, author: "Anonymous", text: "I'd be keen! Which unit?", time: "3 hours ago" }, { id: 202, author: "Mei L.", text: "Count me in. We could book a room in Building P.", time: "2 hours ago" }, { id: 203, author: "Sarah M.", text: "It's for BCO215. Wednesday lunchtime?", time: "2 hours ago" }] },
  { id: 3, author: "Anonymous", text: "Feeling really overwhelmed with assignments this semester. Tips for managing workload?", time: "1 day ago", tag: "Wellbeing", replies: [{ id: 301, author: "James K.", text: "Break everything into small tasks. 25-minute focused blocks help.", time: "22 hours ago" }, { id: 302, author: "Anonymous", text: "VU has free counselling sessions - worth booking.", time: "20 hours ago" }, { id: 303, author: "Sarah M.", text: "Even a short walk between study sessions helps reset.", time: "18 hours ago" }] },
  { id: 4, author: "James K.", text: "Just moved to Melbourne. Best affordable eats near Footscray campus?", time: "1 day ago", tag: "General", replies: [{ id: 401, author: "Mei L.", text: "Little Saigon Market on Hopkins St - amazing Vietnamese under $12.", time: "23 hours ago" }, { id: 402, author: "Anonymous", text: "Mr Pho on Barkly St is a student favourite.", time: "22 hours ago" }] },
  { id: 5, author: "Anonymous", text: "Is the library open on weekends during exam period?", time: "3 hours ago", tag: "General", replies: [{ id: 501, author: "Sarah M.", text: "Footscray Park library: 9am-5pm Saturdays during exams.", time: "2 hours ago" }, { id: 502, author: "Anonymous", text: "City Tower open Saturdays too but gets packed.", time: "1 hour ago" }] },
];

const FACULTIES = ["Faculty of Business & Law", "Faculty of Health, Arts & Design", "Faculty of Science, Engineering & Technology", "Faculty of Education", "College of Sport & Exercise Science", "VU Polytechnic"];

const si = { width: "100%", padding: "12px 14px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 15, outline: "none", boxSizing: "border-box", background: "#fff", fontFamily: "inherit" };
const sbtn = { background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%", justifyContent: "center", fontFamily: "inherit" };
const scard = { background: C.card, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
const stag = (a) => ({ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: a ? C.accent : C.accentLight, color: a ? "#fff" : C.accent, fontFamily: "inherit" });
const sbadge = (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: c + "18", color: c });

// Password validation helper
const checkPassword = (pw) => ({
  minLen: pw.length >= 8,
  hasUpper: /[A-Z]/.test(pw),
  hasLower: /[a-z]/.test(pw),
  hasNumber: /[0-9]/.test(pw),
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
  get valid() { return this.minLen && this.hasUpper && this.hasLower && this.hasNumber && this.hasSpecial; }
});

export default function CampusConnectApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTab, setLoginTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [loginError, setLoginError] = useState("");
  // OTP states
  const [otpStep, setOtpStep] = useState("form"); // "form" | "otp"
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [pendingAuth, setPendingAuth] = useState({}); // stores name/email temporarily
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", faculty: "", studentId: "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [screen, setScreen] = useState("home");
  const [screenStack, setScreenStack] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("All");
  const [supportFilter, setSupportFilter] = useState("All");
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [isAnon, setIsAnon] = useState(true);
  const [postTag, setPostTag] = useState("General");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupTab, setGroupTab] = useState("chat");
  const [groupChats, setGroupChats] = useState({});
  const [groupChatInput, setGroupChatInput] = useState("");
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  // Disclaimer popup
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  // View other user profile
  const [viewingUser, setViewingUser] = useState(null);
  const cardFormRef = useRef(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2500); };
  const nav = (s) => { setScreenStack(prev => [...prev, screen]); setScreen(s); setMenuOpen(false); };
  const goBack = () => { const st = [...screenStack]; const prev = st.pop(); setScreenStack(st); setScreen(prev || "home"); setLeaveConfirm(false); };
  const formatCard = (v) => { const d = v.replace(/\D/g, "").slice(0, 16); return d.replace(/(.{4})/g, "$1 ").trim(); };
  const formatExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); if (d.length >= 3) return d.slice(0, 2) + "/" + d.slice(2); return d; };

  // Scroll fix for card input
  const handleCardFocus = (e) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const processCardPayment = () => {
    setCardError("");
    const num = cardNum.replace(/\s/g, "");
    if (num.length < 16) { setCardError("Enter a valid 16-digit card number."); return; }
    if (cardExp.length < 5) { setCardError("Enter a valid expiry (MM/YY)."); return; }
    const mm = parseInt(cardExp.split("/")[0]);
    if (mm < 1 || mm > 12) { setCardError("Invalid expiry month."); return; }
    if (cardCvc.length < 3) { setCardError("Enter a valid 3-digit CVC."); return; }
    if (!cardName.trim()) { setCardError("Enter the cardholder name."); return; }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowDisclaimer(true);
    }, 2000);
  };

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    setPaymentDone(true);
    setShowPayment(false);
    setPaymentMethod(null);
    showToast("Thank you for your interest!");
  };

  const getGroupChats = (gid) => { const g = STUDY_GROUPS.find(x => x.id === gid); return [...(g?.chat || []), ...(groupChats[gid] || [])]; };
  const sendGroupChat = (gid) => { if (!groupChatInput.trim()) return; setGroupChats(prev => ({ ...prev, [gid]: [...(prev[gid] || []), { id: Date.now(), author: profile.name || "You", text: groupChatInput, time: "Just now" }] })); setGroupChatInput(""); };
  const openGroupDetail = (gid) => { setSelectedGroupId(gid); setGroupTab("chat"); setLeaveConfirm(false); nav("groupDetail"); };
  const leaveGroup = (gid) => { setJoinedGroups(prev => prev.filter(id => id !== gid)); showToast("Left the group."); goBack(); };

  // Password requirement indicator component
  const PasswordReqs = ({ pw }) => {
    const c = checkPassword(pw);
    const items = [
      { ok: c.minLen, label: "At least 8 characters" },
      { ok: c.hasUpper, label: "One uppercase letter (A-Z)" },
      { ok: c.hasLower, label: "One lowercase letter (a-z)" },
      { ok: c.hasNumber, label: "One number (0-9)" },
      { ok: c.hasSpecial, label: "One special character (!@#$...)" },
    ];
    if (!pw) return null;
    return (
      <div style={{ background: "#f8f9fa", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 6 }}>Password must have:</div>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 0", fontSize: 12, color: it.ok ? C.success : C.textSec }}>
            {it.ok ? <Check size={13} /> : <div style={{ width: 13, height: 13, borderRadius: "50%", border: `1.5px solid ${C.border}` }} />}
            <span style={{ textDecoration: it.ok ? "none" : "none" }}>{it.label}</span>
          </div>
        ))}
      </div>
    );
  };

  // === USER PROFILE POPUP ===
  const UserProfilePopup = () => {
    if (!viewingUser) return null;
    const fakeFaculties = { "S": "Faculty of Science, Engineering & Technology", "M": "Faculty of Business & Law", "J": "Faculty of Business & Law", "D": "Faculty of Science, Engineering & Technology", "A": "Faculty of Science, Engineering & Technology", "L": "Faculty of Business & Law", "P": "Faculty of Business & Law", "T": "Faculty of Business & Law" };
    const initial = viewingUser[0] || "?";
    return (
      <div onClick={() => setViewingUser(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.accent + "20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 24, fontWeight: 800, color: C.accent }}>{initial}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{viewingUser}</div>
          <div style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>{fakeFaculties[initial] || "Faculty of Business & Law"}</div>
          <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>Victoria University</div>
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 12, fontSize: 13, color: C.textSec }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div><div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>3</div><div>Groups</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>12</div><div>Posts</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>8</div><div>Events</div></div>
            </div>
          </div>
          <button onClick={() => setViewingUser(null)} style={{ ...sbtn, marginTop: 16, borderRadius: 12 }}>Close</button>
        </div>
      </div>
    );
  };

  // === DISCLAIMER POPUP ===
  const DisclaimerPopup = () => (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", maxWidth: 360, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff3cd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <AlertCircle size={28} color="#856404" />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>Class Assignment Notice</div>
        <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, marginBottom: 6 }}>
          This payment feature is for <strong style={{ color: C.text }}>demonstration purposes only</strong> as part of a university class assignment.
        </p>
        <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, marginBottom: 20 }}>
          No real transaction has been processed. We are working on further updates to integrate live payment processing in future versions.
        </p>
        <button onClick={handleDisclaimerClose} style={{ ...sbtn, background: C.accent, borderRadius: 12 }}>
          <Check size={16} /> I Understand
        </button>
      </div>
    </div>
  );

  // === OTP FUNCTIONS ===
  const startOtpTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer(prev => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
    }, 1000);
  };

  const sendOtp = async (email, name) => {
    setLoginError("");
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpSending(true);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        to_name: name || "Student",
        otp_code: otp,
        app_name: "Campus Connect",
      }, EMAILJS_PUBLIC_KEY);

      setOtpStep("otp");
      setPendingAuth({ name, email });
      startOtpTimer();
    } catch (err) {
      console.error("EmailJS error:", err);
      setLoginError("Could not send OTP. Check your EmailJS config or try again.");
    }
    setOtpSending(false);
  };

  const verifyOtp = () => {
    setLoginError("");
    if (enteredOtp.trim() === generatedOtp) {
      setProfile(p => ({ ...p, name: pendingAuth.name || p.name, email: pendingAuth.email }));
      setIsLoggedIn(true);
      setOtpStep("form");
      setEnteredOtp("");
      setGeneratedOtp("");
    } else {
      setLoginError("Incorrect OTP. Please check the code sent to your email.");
    }
  };

  const resendOtp = async () => {
    if (otpTimer > 0) return;
    await sendOtp(pendingAuth.email, pendingAuth.name);
  };

  // === LOGIN ===
  if (!isLoggedIn) {
    const pwCheck = checkPassword(loginTab === "login" ? loginPass : signupPass);
    const handleLogin = async () => {
      setLoginError("");
      if (!loginEmail.includes("@")) { setLoginError("Enter a valid email address."); return; }
      if (!pwCheck.valid) { setLoginError("Password does not meet all requirements."); return; }
      await sendOtp(loginEmail, "");
    };
    const handleSignup = async () => {
      setLoginError("");
      if (!signupName.trim()) { setLoginError("Enter your full name."); return; }
      if (!signupEmail.includes("@")) { setLoginError("Enter a valid email address."); return; }
      if (!pwCheck.valid) { setLoginError("Password does not meet all requirements."); return; }
      await sendOtp(signupEmail, signupName);
    };
    return (
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
        <div style={{ background: `linear-gradient(160deg, ${C.primary}, #2563a8)`, padding: "50px 24px 40px", textAlign: "center", borderRadius: "0 0 30px 30px" }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Users size={36} color="#fff" /></div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Campus Connect</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Your campus, connected.</div>
        </div>
        <div style={{ padding: "24px 24px 40px" }}>
          {/* OTP VERIFICATION SCREEN */}
          {otpStep === "otp" ? (<>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Mail size={28} color={C.accent} /></div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 4 }}>Verify Your Email</div>
              <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.5 }}>We've sent a 6-digit code to<br/><strong style={{ color: C.text }}>{pendingAuth.email}</strong></p>
            </div>
            {loginError && <div style={{ background: "#fce4ec", color: C.danger, padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={16} />{loginError}</div>}
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Enter OTP Code</label>
            <input value={enteredOtp} onChange={e => setEnteredOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter 6-digit code" maxLength={6} inputMode="numeric" style={{ ...si, textAlign: "center", fontSize: 28, fontWeight: 700, letterSpacing: "8px", fontFamily: "monospace", marginBottom: 16, padding: "16px 14px" }} />
            <button onClick={verifyOtp} style={{ ...sbtn, marginBottom: 12 }}>
              <Check size={16} /> Verify & Continue
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => { setOtpStep("form"); setLoginError(""); setEnteredOtp(""); }} style={{ background: "none", border: "none", color: C.accent, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={resendOtp} disabled={otpTimer > 0} style={{ background: "none", border: "none", color: otpTimer > 0 ? C.textSec : C.accent, fontSize: 14, fontWeight: 600, cursor: otpTimer > 0 ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                <RefreshCw size={14} /> {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend Code"}
              </button>
            </div>
          </>) : (<>
          {/* NORMAL LOGIN/SIGNUP FORM */}
          <div style={{ display: "flex", background: C.accentLight, borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["login", "signup"].map(t => (<button key={t} onClick={() => { setLoginTab(t); setLoginError(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: loginTab === t ? "#fff" : "transparent", color: loginTab === t ? C.primary : C.textSec, boxShadow: loginTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>{t === "login" ? "Log In" : "Sign Up"}</button>))}
          </div>
          {loginError && <div style={{ background: "#fce4ec", color: C.danger, padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={16} />{loginError}</div>}
          {loginTab === "login" ? (<>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Email Address</label>
            <div style={{ position: "relative", marginBottom: 14 }}><Mail size={18} style={{ position: "absolute", left: 12, top: 13, color: C.textSec }} /><input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="you@student.vu.edu.au" style={{ ...si, paddingLeft: 38 }} /></div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 10 }}><Lock size={18} style={{ position: "absolute", left: 12, top: 13, color: C.textSec }} /><input value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Enter password" type={showPass ? "text" : "password"} style={{ ...si, paddingLeft: 38, paddingRight: 42 }} /><button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: C.textSec }}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            <PasswordReqs pw={loginPass} />
            <button onClick={handleLogin} disabled={otpSending} style={{ ...sbtn, background: otpSending ? C.textSec : C.accent, cursor: otpSending ? "wait" : "pointer" }}>{otpSending ? "Sending OTP..." : <><Mail size={16} /> Log In & Verify Email</>}</button>
          </>) : (<>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Full Name</label>
            <div style={{ position: "relative", marginBottom: 14 }}><User size={18} style={{ position: "absolute", left: 12, top: 13, color: C.textSec }} /><input value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="Your full name" style={{ ...si, paddingLeft: 38 }} /></div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Email Address</label>
            <div style={{ position: "relative", marginBottom: 14 }}><Mail size={18} style={{ position: "absolute", left: 12, top: 13, color: C.textSec }} /><input value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="you@student.vu.edu.au" style={{ ...si, paddingLeft: 38 }} /></div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 10 }}><Lock size={18} style={{ position: "absolute", left: 12, top: 13, color: C.textSec }} /><input value={signupPass} onChange={e => setSignupPass(e.target.value)} placeholder="Create a strong password" type={showPass ? "text" : "password"} style={{ ...si, paddingLeft: 38, paddingRight: 42 }} /><button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: C.textSec }}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            <PasswordReqs pw={signupPass} />
            <button onClick={handleSignup} disabled={otpSending} style={{ ...sbtn, background: otpSending ? C.textSec : C.accent, cursor: otpSending ? "wait" : "pointer" }}>{otpSending ? "Sending OTP..." : <><Mail size={16} /> Sign Up & Verify Email</>}</button>
          </>)}
          <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: C.textSec }}>By continuing, you agree to our Terms of Service and Privacy Policy.</div>
          </>)}
        </div>
      </div>
    );
  }

  // === HELPERS ===
  const joinGroup = (id) => { if (!joinedGroups.includes(id)) { setJoinedGroups([...joinedGroups, id]); showToast("Joined!"); }};
  const rsvpEvent = (id) => { if (rsvpEvents.includes(id)) { setRsvpEvents(rsvpEvents.filter(x => x !== id)); showToast("RSVP cancelled."); } else { setRsvpEvents([...rsvpEvents, id]); showToast("RSVP confirmed!"); } };
  const submitPost = () => { if (!newPost.trim()) return; setPosts([{ id: Date.now(), author: isAnon ? "Anonymous" : (profile.name || "You"), text: newPost, time: "Just now", tag: postTag, replies: [] }, ...posts]); setNewPost(""); showToast("Posted!"); };
  const submitReply = (pid) => { const t = replyText[pid]; if (!t?.trim()) return; setPosts(posts.map(p => p.id === pid ? { ...p, replies: [...p.replies, { id: Date.now(), author: profile.name || "You", text: t, time: "Just now" }] } : p)); setReplyText({ ...replyText, [pid]: "" }); showToast("Reply posted!"); };

  const fGroups = STUDY_GROUPS.filter(g => g.unit.toLowerCase().includes(searchQuery.toLowerCase()) || g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const fEvents = eventFilter === "All" ? EVENTS : EVENTS.filter(e => e.category === eventFilter);
  const fPosts = supportFilter === "All" ? posts : posts.filter(p => p.tag === supportFilter);

  const Header = ({ title, back }) => (<div style={{ background: C.primary, color: "#fff", padding: "14px 20px", paddingTop: "max(14px, env(safe-area-inset-top, 14px))", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}><div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>{back && <button onClick={goBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, display: "flex", flexShrink: 0 }}><ArrowLeft size={22} /></button>}<span style={{ fontSize: 18, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span></div><button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, display: "flex", flexShrink: 0 }}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>);
  const BottomNav = () => (<div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#fff", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0", paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))", zIndex: 100 }}>{[{ icon: <Home size={22} />, label: "Home", s: "home" }, { icon: <BookOpen size={22} />, label: "Study", s: "groups" }, { icon: <Calendar size={22} />, label: "Events", s: "events" }, { icon: <Heart size={22} />, label: "Support", s: "support" }, { icon: <Star size={22} />, label: "Connect+", s: "subscribe" }].map(i => (<button key={i.s} onClick={() => { setScreenStack([]); setScreen(i.s); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", color: screen === i.s ? C.accent : C.textSec, fontSize: 11, fontWeight: screen === i.s ? 700 : 500, border: "none", background: "none", padding: "4px 8px", fontFamily: "inherit" }}>{i.icon}<span>{i.label}</span></button>))}</div>);

  const SideMenu = () => (<><div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 140 }} /><div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 290, maxWidth: "78vw", background: C.primary, zIndex: 150, overflowY: "auto", boxShadow: "-4px 0 24px rgba(0,0,0,0.3)" }}><button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "#fff", cursor: "pointer", zIndex: 10 }}><X size={22} /></button><div style={{ background: "rgba(255,255,255,0.08)", padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}><div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={24} color="#fff" /></div><div><div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{profile.name || "Set up profile"}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{profile.email}</div></div></div><button onClick={() => nav("profile")} style={{ width: "100%", padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><User size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Edit Profile</button></div><div style={{ padding: "12px 16px" }}>{[{ l: "Home", i: <Home size={18} />, s: "home" }, { l: "Study Groups", i: <BookOpen size={18} />, s: "groups" }, { l: "Events", i: <Calendar size={18} />, s: "events" }, { l: "Peer Support", i: <Heart size={18} />, s: "support" }, { l: "Campus Connect+", i: <Star size={18} />, s: "subscribe" }, { l: "Contact Us", i: <Phone size={18} />, s: "contact" }, { l: "About & Services", i: <Info size={18} />, s: "about" }].map(x => (<button key={x.s} onClick={() => nav(x.s)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 10px", background: screen === x.s ? "rgba(255,255,255,0.12)" : "none", border: "none", color: "#fff", fontSize: 15, fontWeight: screen === x.s ? 700 : 400, cursor: "pointer", borderRadius: 8, textAlign: "left", fontFamily: "inherit" }}>{x.i}{x.l}</button>))}</div><div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}><button onClick={() => { setIsLoggedIn(false); setMenuOpen(false); setScreen("home"); setScreenStack([]); }} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 10px", background: "none", border: "none", color: "#ff6b6b", fontSize: 15, fontWeight: 600, cursor: "pointer", borderRadius: 8, fontFamily: "inherit" }}><LogOut size={18} />Log Out</button></div></div></>);

  const ProfileScreen = () => (<><Header title="My Profile" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={{ textAlign: "center", marginBottom: 24 }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: C.accent + "20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}><User size={36} color={C.accent} /></div><div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{profile.name || "Student"}</div><div style={{ fontSize: 13, color: C.textSec }}>{profile.faculty || "No faculty selected"}</div></div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16 }}>Personal Details</div><label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Full Name</label><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Enter your full name" style={{ ...si, marginBottom: 14 }} /><label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Email</label><input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="you@student.vu.edu.au" style={{ ...si, marginBottom: 14 }} /><label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Phone Number</label><input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+61 4XX XXX XXX" style={{ ...si, marginBottom: 14 }} /><label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Student ID</label><input value={profile.studentId} onChange={e => setProfile({ ...profile, studentId: e.target.value })} placeholder="e.g. s8112534" style={{ ...si, marginBottom: 14 }} /><label style={{ fontSize: 13, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Faculty</label><select value={profile.faculty} onChange={e => setProfile({ ...profile, faculty: e.target.value })} style={{ ...si, marginBottom: 20, appearance: "auto" }}><option value="">Select your faculty</option>{FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}</select><button onClick={() => { setProfileSaved(true); showToast("Profile saved!"); setTimeout(() => setProfileSaved(false), 2000); }} style={{ ...sbtn, background: profileSaved ? C.success : C.accent }}>{profileSaved ? <><Check size={16} /> Saved</> : "Save Profile"}</button></div></div></>);

  const HomeScreen = () => (<><Header title="Campus Connect" /><div style={{ padding: "16px 20px", paddingBottom: 90 }}>{profile.name && <div style={{ fontSize: 15, color: C.textSec, marginBottom: 12 }}>Welcome back, <strong style={{ color: C.text }}>{profile.name.split(" ")[0]}</strong></div>}<div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius: 18, padding: "28px 22px", marginBottom: 20, color: "#fff" }}><div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>Your campus,<br/>connected.</div><p style={{ fontSize: 14, opacity: 0.85, marginBottom: 16, lineHeight: 1.5 }}>Find study groups, discover events, and access peer support.</p><button onClick={() => nav("groups")} style={{ ...sbtn, background: "#fff", color: C.primary, width: "auto", padding: "10px 22px" }}>Get Started <ChevronRight size={16} /></button></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>{[{ n: "120+", l: "Students" }, { n: "15", l: "Study Groups" }, { n: "24", l: "Events" }].map(s => (<div key={s.l} style={{ background: C.card, borderRadius: 12, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.border}` }}><div style={{ fontSize: 22, fontWeight: 800, color: C.accent }}>{s.n}</div><div style={{ fontSize: 12, color: C.textSec }}>{s.l}</div></div>))}</div><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Core Features</div>{[{ icon: <BookOpen size={24} />, title: "Study Group Finder", desc: "Search and join groups by unit code", s: "groups", color: "#2d7dd2" }, { icon: <Calendar size={24} />, title: "Campus Events", desc: "Discover workshops, socials, and career fairs", s: "events", color: "#f0883e" }, { icon: <Heart size={24} />, title: "Peer Support Board", desc: "Ask questions and get help from fellow students", s: "support", color: "#28a745" }].map(f => (<button key={f.s} onClick={() => nav(f.s)} style={{ ...scard, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left" }}><div style={{ background: f.color + "15", borderRadius: 12, padding: 12, color: f.color, display: "flex" }}>{f.icon}</div><div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{f.title}</div><div style={{ fontSize: 13, color: C.textSec }}>{f.desc}</div></div><ChevronRight size={18} color={C.textSec} /></button>))}<div style={{ ...scard, background: "linear-gradient(135deg, #fef3e2, #fde8d0)", borderColor: "#f0883e30", marginTop: 8 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Star size={18} color="#f0883e" fill="#f0883e" /><span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Campus Connect+</span></div><p style={{ fontSize: 13, color: C.textSec, marginBottom: 12 }}>Priority matching, event reminders, ad-free for $3.99/month.</p><button onClick={() => nav("subscribe")} style={{ background: "#f0883e", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Learn More</button></div><div style={{ display: "flex", gap: 8, marginTop: 16 }}><button onClick={() => nav("contact")} style={{ flex: 1, background: "transparent", color: C.accent, border: `2px solid ${C.accent}`, borderRadius: 10, padding: "10px 8px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}><Phone size={14} /> Contact</button><button onClick={() => nav("about")} style={{ flex: 1, background: "transparent", color: C.accent, border: `2px solid ${C.accent}`, borderRadius: 10, padding: "10px 8px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}><Info size={14} /> About</button></div></div></>);

  const GroupsScreen = () => (<><Header title="Study Groups" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={{ position: "relative", marginBottom: 16 }}><Search size={18} style={{ position: "absolute", left: 14, top: 13, color: C.textSec }} /><input placeholder="Search by unit code or topic..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ ...si, paddingLeft: 40 }} /></div>{joinedGroups.length > 0 && (<><div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>My Groups</div>{STUDY_GROUPS.filter(g => joinedGroups.includes(g.id)).map(g => (<button key={"my"+g.id} onClick={() => openGroupDetail(g.id)} style={{ ...scard, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", width: "100%", textAlign: "left", borderColor: C.accent+"40" }}><div style={{ background: C.accent+"15", borderRadius: 10, padding: 10, color: C.accent, display: "flex" }}><MessageCircle size={20} /></div><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{g.unit} - {g.title}</div><div style={{ fontSize: 12, color: C.textSec }}>{g.day} - {g.campus}</div></div><ChevronRight size={16} color={C.textSec} /></button>))}<div style={{ height: 1, background: C.border, margin: "12px 0" }} /></>)}<div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>All Groups <span style={{ fontWeight: 400, color: C.textSec }}>({fGroups.length})</span></div>{fGroups.map(g => (<div key={g.id} style={scard}><span style={sbadge(C.accent)}>{g.unit}</span><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 6 }}>{g.title}</div><p style={{ fontSize: 13, color: C.textSec, margin: "4px 0 10px" }}>{g.desc}</p><div style={{ display: "flex", gap: 12, fontSize: 12, color: C.textSec, marginBottom: 10, flexWrap: "wrap" }}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={13} />{g.members}/{g.max}</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={13} />{g.day}</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} />{g.campus}</span></div><div style={{ display: "flex", gap: 8 }}>{joinedGroups.includes(g.id) ? (<><button onClick={() => openGroupDetail(g.id)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={14} /> Open</button><span style={{ background: C.success, color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Check size={14} /> Joined</span></>) : (<button onClick={() => joinGroup(g.id)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Plus size={14} /> Join Group</button>)}</div></div>))}</div></>);

  const GroupDetailScreen = () => { const g = STUDY_GROUPS.find(x => x.id === selectedGroupId); if (!g) return null; const chats = getGroupChats(g.id); return (<><Header title={g.unit + " Group"} back /><div style={{ padding: 0, paddingBottom: 90 }}><div style={{ background: `linear-gradient(135deg, ${C.primary}, #2563a8)`, padding: "18px 20px", color: "#fff" }}><div style={{ fontSize: 17, fontWeight: 700 }}>{g.title}</div><div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{g.desc}</div><div style={{ display: "flex", gap: 14, fontSize: 12, marginTop: 10, opacity: 0.75 }}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={13} /> {g.members}</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={13} /> {g.day}</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} /> {g.campus}</span></div></div><div style={{ display: "flex", borderBottom: `2px solid ${C.border}`, background: "#fff" }}>{[{ k: "chat", l: "Chat", i: <MessageCircle size={15} /> }, { k: "resources", l: "Resources", i: <FileText size={15} /> }, { k: "info", l: "Settings", i: <Info size={15} /> }].map(t => (<button key={t.k} onClick={() => setGroupTab(t.k)} style={{ flex: 1, padding: "12px 0", border: "none", borderBottom: groupTab === t.k ? `2px solid ${C.accent}` : "2px solid transparent", background: "none", fontSize: 13, fontWeight: groupTab === t.k ? 700 : 500, color: groupTab === t.k ? C.accent : C.textSec, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>{t.i}{t.l}</button>))}</div><div style={{ padding: "16px 20px" }}>{groupTab === "chat" && (<><div style={{ marginBottom: 12 }}>{chats.map(m => { const isMe = m.author === (profile.name || "You"); return (<div key={m.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, marginBottom: 10 }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: isMe ? C.accent + "20" : C.textSec + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: isMe ? C.accent : C.textSec, flexShrink: 0 }}>{m.author[0]}</div><div style={{ maxWidth: "75%" }}><div style={{ fontSize: 11, fontWeight: 600, color: C.textSec, marginBottom: 2, textAlign: isMe ? "right" : "left" }}>{isMe ? m.author : <button onClick={() => setViewingUser(m.author)} style={{ background: "none", border: "none", color: C.accent, fontWeight: 600, fontSize: 11, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{m.author}</button>}</div><div style={{ background: isMe ? C.accent : "#f0f2f5", color: isMe ? "#fff" : C.text, padding: "10px 14px", borderRadius: 14, borderTopLeftRadius: isMe ? 14 : 4, borderTopRightRadius: isMe ? 4 : 14, fontSize: 14, lineHeight: 1.45 }}>{m.text}</div><div style={{ fontSize: 10, color: C.textSec, marginTop: 2, textAlign: isMe ? "right" : "left" }}>{m.time}</div></div></div>); })}</div><div style={{ display: "flex", gap: 8 }}><input value={groupChatInput} onChange={e => setGroupChatInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") sendGroupChat(g.id); }} placeholder="Type a message..." style={{ ...si, padding: "10px 14px", fontSize: 14 }} /><button onClick={() => sendGroupChat(g.id)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", cursor: "pointer", display: "flex", flexShrink: 0 }}><Send size={18} /></button></div></>)}{groupTab === "resources" && (<><div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Shared Resources</div>{g.resources.map(r => (<a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" style={{ ...scard, display: "flex", alignItems: "center", gap: 12, textDecoration: "none", cursor: "pointer" }}><div style={{ background: r.type === "file" ? "#e8f5e9" : C.accentLight, borderRadius: 10, padding: 10, display: "flex" }}>{r.type === "file" ? <FileText size={20} color={C.success} /> : <Link2 size={20} color={C.accent} />}</div><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{r.title}</div><div style={{ fontSize: 12, color: C.textSec }}>Shared by {r.author} - {r.time}</div></div><ExternalLink size={14} color={C.textSec} /></a>))}<button onClick={() => showToast("File picker would open here")} style={{ ...sbtn, background: C.accent, marginTop: 8 }}><Paperclip size={16} /> Share a Resource</button></>)}{groupTab === "info" && (<><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Group Details</div><div style={{ fontSize: 14, color: C.text, lineHeight: 2 }}><strong>Unit Code:</strong> {g.unit}<br/><strong>Group Name:</strong> {g.title}<br/><strong>Schedule:</strong> {g.day}<br/><strong>Campus:</strong> {g.campus}<br/><strong>Members:</strong> {g.members}/{g.max}</div></div>{!leaveConfirm ? (<button onClick={() => setLeaveConfirm(true)} style={{ ...sbtn, background: "transparent", color: C.danger, border: `2px solid ${C.danger}` }}><LogOut size={16} /> Leave Group</button>) : (<div style={{ ...scard, borderColor: C.danger + "40", background: "#fff5f5" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.danger, marginBottom: 6 }}>Leave this group?</div><p style={{ fontSize: 13, color: C.textSec, marginBottom: 14 }}>You will lose access to chat and resources. You can rejoin anytime.</p><div style={{ display: "flex", gap: 8 }}><button onClick={() => leaveGroup(g.id)} style={{ ...sbtn, background: C.danger, flex: 1 }}>Yes, Leave</button><button onClick={() => setLeaveConfirm(false)} style={{ ...sbtn, background: "transparent", color: C.textSec, border: `1.5px solid ${C.border}`, flex: 1 }}>Cancel</button></div></div>)}</>)}</div></div></>); };

  const EventsScreen = () => (<><Header title="Campus Events" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>{["All", "Social", "Career", "Wellbeing", "Tech"].map(f => <button key={f} onClick={() => setEventFilter(f)} style={stag(eventFilter === f)}>{f}</button>)}</div>{fEvents.map(e => (<div key={e.id} style={scard}><div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}><div style={{ fontSize: 36, lineHeight: 1 }}>{e.img}</div><div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{e.title}</div><div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}><div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}><Calendar size={12} />{e.date} at {e.time}</div><div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}><MapPin size={12} />{e.location}</div><div style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={12} />{e.org}</div></div><div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}><span style={sbadge(C.warm)}>{e.category}</span><button onClick={() => rsvpEvent(e.id)} style={{ background: rsvpEvents.includes(e.id) ? C.success : C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: rsvpEvents.includes(e.id) ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>{rsvpEvents.includes(e.id) ? <><Check size={12} /> RSVP'd (tap to cancel)</> : "RSVP - Reserve a spot"}</button></div></div></div></div>))}</div></>);

  const SupportScreen = () => (<><Header title="Peer Support" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={{ ...scard, borderColor: C.accent + "40" }}><textarea placeholder="Ask a question or share something..." value={newPost} onChange={e => setNewPost(e.target.value)} rows={3} style={{ ...si, resize: "none", marginBottom: 10 }} /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}><div style={{ display: "flex", gap: 6, alignItems: "center" }}><button onClick={() => setIsAnon(!isAnon)} style={{ ...stag(isAnon), fontSize: 12, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>{isAnon ? <><Shield size={12} /> Anonymous</> : <><User size={12} /> Named</>}</button><select value={postTag} onChange={e => setPostTag(e.target.value)} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 12, fontFamily: "inherit" }}><option>General</option><option>Academic</option><option>Wellbeing</option></select></div><button onClick={submitPost} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Send size={14} /> Post</button></div></div><div style={{ display: "flex", gap: 6, margin: "12px 0" }}>{["All", "Academic", "Wellbeing", "General"].map(f => <button key={f} onClick={() => setSupportFilter(f)} style={stag(supportFilter === f)}>{f}</button>)}</div>{fPosts.map(p => { const isExp = expandedPost === p.id; const vis = isExp ? p.replies : p.replies.slice(0, 2); return (<div key={p.id} style={scard}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: p.author === "Anonymous" ? C.textSec + "20" : C.accent + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: p.author === "Anonymous" ? C.textSec : C.accent }}>{p.author === "Anonymous" ? <Shield size={14} /> : p.author[0]}</div><span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{p.author}</span><span style={sbadge(p.tag === "Academic" ? C.accent : p.tag === "Wellbeing" ? C.success : C.textSec)}>{p.tag}</span></div><span style={{ fontSize: 11, color: C.textSec }}>{p.time}</span></div><p style={{ fontSize: 14, color: C.text, lineHeight: 1.5, margin: "8px 0 12px" }}>{p.text}</p>{p.replies.length > 0 && (<div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10 }}><button onClick={() => setExpandedPost(isExp ? null : p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.accent, display: "flex", alignItems: "center", gap: 4, padding: 0, marginBottom: 8, fontFamily: "inherit" }}><MessageCircle size={14} /> {p.replies.length} {p.replies.length === 1 ? "reply" : "replies"} {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>{vis.map(r => (<div key={r.id} style={{ display: "flex", gap: 8, padding: "8px 0 8px 8px", borderLeft: `2px solid ${C.accentLight}`, marginLeft: 4, marginBottom: 4 }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: r.author === "Anonymous" ? C.textSec + "15" : C.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: r.author === "Anonymous" ? C.textSec : C.accent, flexShrink: 0 }}>{r.author === "Anonymous" ? <Shield size={11} /> : r.author[0]}</div><div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.author}</span><span style={{ fontSize: 10, color: C.textSec }}>{r.time}</span></div><p style={{ fontSize: 13, color: C.text, lineHeight: 1.4, margin: "2px 0 0" }}>{r.text}</p></div></div>))}{!isExp && p.replies.length > 2 && (<button onClick={() => setExpandedPost(p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: C.accent, fontWeight: 600, padding: "4px 0", fontFamily: "inherit" }}>View {p.replies.length - 2} more...</button>)}</div>)}<div style={{ display: "flex", gap: 8, marginTop: 10 }}><input value={replyText[p.id] || ""} onChange={e => setReplyText({ ...replyText, [p.id]: e.target.value })} placeholder="Write a reply..." style={{ ...si, padding: "8px 12px", fontSize: 13 }} /><button onClick={() => submitReply(p.id)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", flexShrink: 0 }}><Send size={14} /></button></div></div>); })}</div></>);

  const SubscribeScreen = () => (<><Header title="Campus Connect+" back /><div style={{ padding: "16px 20px", paddingBottom: 120 }}><div style={{ background: `linear-gradient(135deg, ${C.primary}, #2563a8)`, borderRadius: 18, padding: "28px 22px", color: "#fff", marginBottom: 20, textAlign: "center" }}><Star size={36} color="#f0883e" fill="#f0883e" style={{ marginBottom: 10 }} /><div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Campus Connect+</div><div style={{ fontSize: 14, opacity: 0.8, marginBottom: 16 }}>Upgrade your campus experience</div><div style={{ fontSize: 36, fontWeight: 800 }}>$3.99<span style={{ fontSize: 16, fontWeight: 400 }}>/month</span></div></div><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>What you get</div>{["Priority study group matching", "Event reminders and calendar sync", "Ad-free experience", "Exclusive Connect+ events access", "Profile badge and priority support"].map((f, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}><Check size={18} color={C.success} /><span style={{ fontSize: 14, color: C.text }}>{f}</span></div>))}{!paymentDone ? (<div style={{ marginTop: 20 }}>{!showPayment ? (<button onClick={() => setShowPayment(true)} style={{ ...sbtn, background: "#f0883e" }}><CreditCard size={18} /> Subscribe Now</button>) : !paymentMethod ? (<div style={scard}><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>Choose Payment Method</div><button onClick={() => setPaymentMethod("card")} style={{ ...sbtn, background: "#333", marginBottom: 10 }}><CreditCard size={16} /> Pay with Card</button><button onClick={() => setPaymentMethod("paypal")} style={{ ...sbtn, background: "#0070ba", marginBottom: 10 }}>Pay with PayPal</button><button onClick={() => { setShowPayment(false); setPaymentMethod(null); }} style={{ width: "100%", background: "transparent", color: C.textSec, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button></div>) : paymentMethod === "card" ? (<div ref={cardFormRef} style={scard}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Card Details</div><div style={{ display: "flex", gap: 4 }}>{["Visa", "MC", "Amex"].map(c => <span key={c} style={{ fontSize: 10, fontWeight: 700, background: C.accentLight, color: C.accent, padding: "2px 6px", borderRadius: 4 }}>{c}</span>)}</div></div>{cardError && <div style={{ background: "#fce4ec", color: C.danger, padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><AlertCircle size={14} />{cardError}</div>}<label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Cardholder Name</label><input value={cardName} onChange={e => setCardName(e.target.value)} onFocus={handleCardFocus} placeholder="Name on card" style={{ ...si, marginBottom: 12 }} /><label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Card Number</label><div style={{ position: "relative", marginBottom: 12 }}><CreditCard size={16} style={{ position: "absolute", left: 12, top: 14, color: C.textSec }} /><input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} onFocus={handleCardFocus} placeholder="1234 5678 9012 3456" maxLength={19} inputMode="numeric" style={{ ...si, paddingLeft: 36, letterSpacing: "1.5px", fontFamily: "monospace" }} /></div><div style={{ display: "flex", gap: 12, marginBottom: 16 }}><div style={{ flex: 1 }}><label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>Expiry</label><input value={cardExp} onChange={e => setCardExp(formatExp(e.target.value))} onFocus={handleCardFocus} placeholder="MM/YY" maxLength={5} inputMode="numeric" style={{ ...si, fontFamily: "monospace" }} /></div><div style={{ flex: 1 }}><label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: "block", marginBottom: 4 }}>CVC</label><div style={{ position: "relative" }}><input value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} onFocus={handleCardFocus} placeholder="123" maxLength={3} type="password" inputMode="numeric" style={{ ...si, fontFamily: "monospace" }} /><Lock size={14} style={{ position: "absolute", right: 12, top: 14, color: C.textSec }} /></div></div></div><div style={{ background: C.accentLight, borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 14, color: C.text }}>Total</span><span style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>$3.99 AUD</span></div><button onClick={processCardPayment} disabled={processing} style={{ ...sbtn, background: processing ? C.textSec : C.success, cursor: processing ? "wait" : "pointer" }}>{processing ? "Processing..." : <><Lock size={14} /> Pay $3.99</>}</button><button onClick={() => { setPaymentMethod(null); setCardError(""); }} style={{ width: "100%", background: "transparent", color: C.textSec, border: "none", padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, fontFamily: "inherit" }}>Back</button><div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginTop: 10 }}><Lock size={12} color={C.textSec} /><span style={{ fontSize: 11, color: C.textSec }}>Secured with 256-bit SSL encryption</span></div></div>) : (<div style={scard}><div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>PayPal Checkout</div><p style={{ fontSize: 13, color: C.textSec, marginBottom: 16 }}>You will be redirected to PayPal to complete payment of $3.99 AUD.</p><button onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); showToast("PayPal integration available soon!"); setPaymentMethod(null); }, 1500); }} disabled={processing} style={{ ...sbtn, background: processing ? C.textSec : "#0070ba", cursor: processing ? "wait" : "pointer" }}>{processing ? "Connecting to PayPal..." : "Continue to PayPal"}</button><button onClick={() => setPaymentMethod(null)} style={{ width: "100%", background: "transparent", color: C.textSec, border: "none", padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, fontFamily: "inherit" }}>Back</button></div></div>)}</div>) : (<div style={{ ...scard, background: "#e8f5e9", borderColor: C.success + "40", textAlign: "center", marginTop: 20, padding: "24px 18px" }}><Check size={36} color={C.success} /><div style={{ fontSize: 18, fontWeight: 700, color: C.success, marginTop: 8 }}>You're subscribed!</div><div style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>Welcome to Campus Connect+</div></div>)}<div style={{ fontSize: 11, color: C.textSec, textAlign: "center", marginTop: 16 }}>Cancel anytime. No lock-in contracts.</div></div></>);

  const ContactScreen = () => (<><Header title="Contact Us" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Get in Touch</div><input placeholder="Your Name" style={{ ...si, marginBottom: 10 }} /><input placeholder="Your Email" style={{ ...si, marginBottom: 10 }} /><textarea placeholder="Your Message" rows={4} style={{ ...si, resize: "none", marginBottom: 10 }} /><button onClick={() => showToast("Message sent!")} style={sbtn}><Send size={16} /> Send Message</button></div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Contact Details</div>{[{ i: <Mail size={16} />, t: "hello@campusconnect.com.au" }, { i: <Phone size={16} />, t: "+61 3 9919 6100" }, { i: <MapPin size={16} />, t: "Victoria University, Footscray Park, Ballarat Rd, VIC 3011" }].map((c, j) => (<div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", fontSize: 14, color: C.text }}><span style={{ color: C.accent, marginTop: 2 }}>{c.i}</span><span>{c.t}</span></div>))}</div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Follow Us</div><div style={{ display: "flex", gap: 10 }}>{[{ n: "Instagram", c: "#E1306C", i: <Instagram size={20} /> }, { n: "TikTok", c: "#000", i: <ExternalLink size={20} /> }, { n: "LinkedIn", c: "#0077B5", i: <ExternalLink size={20} /> }].map(s => (<button key={s.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 8px", borderRadius: 12, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontFamily: "inherit" }}><span style={{ color: s.c }}>{s.i}</span><span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{s.n}</span></button>))}</div></div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Our Location</div><div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8!2d144.8976!3d-37.7983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d1cc5a935b1%3A0xc04f2e7e82060e25!2sVictoria%20University%20Footscray%20Park%20Campus!5e0!3m2!1sen!2sau!4v1" width="100%" height="200" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="VU Map" /></div></div></div></>);

  const AboutScreen = () => (<><Header title="About & Services" back /><div style={{ padding: "16px 20px", paddingBottom: 90 }}><div style={{ ...scard, textAlign: "center", borderColor: C.accent + "30" }}><div style={{ fontSize: 24, fontWeight: 800, color: C.primary, marginBottom: 4 }}>Campus Connect</div><div style={{ fontSize: 13, color: C.textSec }}>By students, for students.</div></div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>Business Information</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.8 }}><strong>ABN:</strong> 12 345 678 901 (Temporary)<br /><strong>ACN:</strong> 123 456 789 (Temporary)<br /><strong>Structure:</strong> Partnership<br /><strong>Location:</strong> Melbourne, VIC, Australia</div></div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Our Services</div>{[{ i: <BookOpen size={18} />, t: "Study Group Finder", d: "Search and join study groups by unit code" }, { i: <Calendar size={18} />, t: "Campus Events Feed", d: "Discover and RSVP to events" }, { i: <Heart size={18} />, t: "Peer Support Board", d: "Ask questions and get help" }, { i: <Star size={18} />, t: "Campus Connect+ (Premium)", d: "Priority matching, ad-free for $3.99/mo" }, { i: <Users size={18} />, t: "Club Promotion", d: "Free event listing for clubs" }].map((s, j) => (<div key={j} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: j < 4 ? `1px solid ${C.border}` : "none" }}><div style={{ color: C.accent, marginTop: 2 }}>{s.i}</div><div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{s.t}</div><div style={{ fontSize: 13, color: C.textSec }}>{s.d}</div></div></div>))}</div><div style={scard}><div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Our Team</div>{[{ n: "Babar Ijaz", r: "Co-founder - Product & Technology" }, { n: "Bishal Dhakal", r: "Co-founder - Marketing & Operations" }].map((t, j) => (<div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}><div style={{ width: 40, height: 40, borderRadius: "50%", background: C.accent + "20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.accent, fontSize: 16 }}>{t.n[0]}</div><div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.n}</div><div style={{ fontSize: 12, color: C.textSec }}>{t.r}</div></div></div>))}</div><div style={{ ...scard, background: "#fff3cd", borderColor: "#ffc10730" }}><div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}><AlertCircle size={20} color="#856404" style={{ marginTop: 2, flexShrink: 0 }} /><div style={{ fontSize: 13, color: "#856404", lineHeight: 1.5 }}><strong>Disclaimer:</strong> This app is for a class assignment and not for commercial purposes.</div></div></div></div></>);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflow: "hidden", borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
      {toast && <div style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", background: C.success, color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>{toast}</div>}
      {showDisclaimer && DisclaimerPopup()}
      {viewingUser && UserProfilePopup()}
      {menuOpen && SideMenu()}
      {screen === "home" && HomeScreen()}
      {screen === "groups" && GroupsScreen()}
      {screen === "groupDetail" && GroupDetailScreen()}
      {screen === "events" && EventsScreen()}
      {screen === "support" && SupportScreen()}
      {screen === "subscribe" && SubscribeScreen()}
      {screen === "contact" && ContactScreen()}
      {screen === "about" && AboutScreen()}
      {screen === "profile" && ProfileScreen()}
      {BottomNav()}
    </div>
  );
}
