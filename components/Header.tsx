import logo from "@/assets/LeafyLogTwo.png";
import profile from "@/assets/profile.png";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <HeaderTitle>
        <Link href="/">
          <img src={logo.src} alt="logo" />
        </Link>
      </HeaderTitle>
      <div>
        <Link href="/profile">
          <img
            style={{ width: "30px", borderRadius: "50%" }}
            src={profile.src}
            alt="profile"
          />
        </Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const HeaderTitle = styled.div`
  width: 100px;
`;
