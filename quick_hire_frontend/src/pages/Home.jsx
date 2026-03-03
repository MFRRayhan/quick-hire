import React from "react";
import HeroArea from "../components/HeroArea";
import Brands from "../components/Brands";
import Category from "../components/Category";
import PostingJobs from "../components/PostingJobs";
import FeaturedJobs from "../components/FeaturedJobs";
import LatestJobs from "../components/LatestJobs";

export default function Home() {
  return (
    <div>
      <HeroArea></HeroArea>
      <Brands></Brands>
      <Category></Category>
      <PostingJobs />
      <FeaturedJobs></FeaturedJobs>
      <LatestJobs />
    </div>
  );
}
