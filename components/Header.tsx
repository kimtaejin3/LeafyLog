import logo from "../assets/LeafyLogTwo.png";
import profile from "../assets/profile.png";

export default function Header() {
  return (
    <div>
      <h1>
        {/* <img src={logo.src} alt="Logo" /> */}
        Leafy Log
      </h1>
      <button>
        <img
          style={{ borderRadius: "50%" }}
          width="30"
          src={profile.src}
          alt=""
        />
      </button>
    </div>
  );
}
