import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonLoader({ count, height }) {
  return (
    <Skeleton count={count} height={height} style={{ marginBottom: "2rem" }} />
  );
}

export default SkeletonLoader;
