import { Metadata } from "next";
import { LandingPage } from "./LandingPage";

export const metadata: Metadata = {
  title: 'Catunbond - Home page',
}

export default function Home() {
  return <LandingPage />
}
