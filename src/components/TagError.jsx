import React from "react";

function TagError({ error }) {
  return <>{error && <p className="text-red-500 text-xs">{error}</p>}</>;
}

export default TagError;
